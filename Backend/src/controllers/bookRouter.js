const express = require("express");
const bookRouter = express.Router();
const BookModel = require("../model/BookSchema");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/roleCheck");
const { isOwner } = require("../utils/ownership");


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
    res.status(500).json({ message: "Failed to add book" });
  }
});


bookRouter.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const books = await BookModel.find({ isDeleted: { $ne: true } }).skip((page - 1) * limit).limit(parseInt(limit));
    const totalBooks = await BookModel.countDocuments({ isDeleted: { $ne: true } });

    res.status(200).json({
      page: parseInt(page),
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
      books
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Failed to fetch books"});
  }
});


bookRouter.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findOne({ _id: id, isDeleted: { $ne: true } }).populate('createdBy', 'username email');;

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Failed to fetch book" });
  }
});


bookRouter.put("/:id", auth, checkRole('author'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, coverImage } = req.body;

    const book = await BookModel.findById(id);
    if(!book){
      return res.status(404).json({ message: "Book not found" });
    }
    
    if (!isOwner(book.createdBy, req.user._id)) {
      return res
        .status(403)
        .json({ message: "You are not allowed to modify this book" });
    }
    
    book.title = title;
    book.author = author;
    book.genre = genre;
    book.coverImage = coverImage;

    await book.save();
    const updatedBook = await BookModel.findById(id).populate('createdBy', 'username email');

    res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Failed to update book"});
  }
});


bookRouter.delete("/:id", auth, checkRole('author'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const book = await BookModel.findById(id);
    if(!book){
      return res.status(404).json({ message: "Book not found" });
    }
    
    if (!isOwner(book.createdBy, req.user._id)) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this book" });
    }

    book.isDeleted = true;
    await book.save();

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Failed to delete book"});
  }
});

module.exports = bookRouter;
