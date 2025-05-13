const express = require("express");
const bookRouter = express.Router();
const BookModel = require("../model/BookSchema");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/roleCheck");


bookRouter.post("/", auth, checkRole('author'), async (req, res) => {
  try {
    const { title, author, genre, coverImage } = req.body;

    // Validation: Check for missing fields
    if (!title || !author || !genre) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check if the book already exists
        const { page = 1, limit = 10 } = req.query;
    const existingBook = await BookModel.findOne({ title, author }).skip((page - 1) * limit).limit(parseInt(limit));
    if (existingBook) {
      return res.status(400).json({ message: "Book already exists" });
    }

    // Create and save the new book
    const newBook = await BookModel.create({ 
      title, 
      author, 
      genre, 
      coverImage,
      createdBy: req.user._id
    });
    
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Failed to add book", error });
  }
});


bookRouter.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const books = await BookModel.find().skip((page - 1) * limit).limit(parseInt(limit));
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Failed to fetch books", error });
  }
});


bookRouter.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Failed to fetch book", error });
  }
});


bookRouter.put("/:id", auth, checkRole('author'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, coverImage } = req.body;

    const { page = 1, limit = 10 } = req.query;
    const book = await BookModel.findById(id).populate('createdBy', 'username email').skip((page - 1) * limit).limit(parseInt(limit));
    if(!book){
      return res.status(404).json({ message: "Book not found" });
    }
    
    if (book.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not allowed to modify this book" });
    }
    
    book.title = title;
    book.author = author;
    book.genre = genre;
    book.coverImage = coverImage;

    const updatedBook = await book.save();

    res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Failed to update book", error });
  }
});


bookRouter.delete("/:id", auth, checkRole('author'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const { page = 1, limit = 10 } = req.query;
    const book = await BookModel.findById(id).populate('createdBy', 'username email').skip((page - 1) * limit).limit(parseInt(limit));
    if(!book){
      return res.status(404).json({ message: "Book not found" });
    }
    
    if (book.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not allowed to delete this book" });
    }
    
    const deletedBook = await book.deleteOne();

    res.status(200).json({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Failed to delete book", error });
  }
});

module.exports = bookRouter;
