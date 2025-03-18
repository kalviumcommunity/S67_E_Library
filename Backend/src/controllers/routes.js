const express = require("express");
const router = express.Router();
const BookModel = require("../model/BookSchema");
const auth = require("../middleware/auth");


router.post("/add", auth, async (req, res) => {
  try {
    const { title, author, genre, coverImage } = req.body;

    // Validation: Check for missing fields
    if (!title || !author || !genre || !coverImage) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check if the book already exists
    const existingBook = await BookModel.findOne({ title, author });
    if (existingBook) {
      return res.status(400).json({ message: "Book already exists" });
    }

    // Create and save the new book
    const newBook = new BookModel(req.body);
    await newBook.save();
    
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Failed to add book", error });
  }
});


router.get("/all", async (req, res) => {
  try {
    const books = await BookModel.find();  // Fetch all books
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Failed to fetch books", error });
  }
});


router.get("/all/:id", auth, async (req, res) => {
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


router.put("/change/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, coverImage } = req.body;

    if (!title || !author || !genre || !coverImage) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const updatedBook = await BookModel.findByIdAndUpdate(
      id,
      { title, author, genre, coverImage },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Failed to update book", error });
  }
});


router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await BookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Failed to delete book", error });
  }
});

module.exports = router;
