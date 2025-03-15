const express = require("express");
const router = express.Router();
const BookModel = require("../model/BookSchema"); // Import your MongoDB model

// ✅ Create a new book
router.post("/add", async (req, res) => {
  try {
    const { title, author } = req.body;

    // Check if the book already exists in MongoDB
    const existingBook = await BookModel.findOne({ title, author });

    if (existingBook) {
      return res.status(400).json({ message: "Book already exists" });
    }

    const newBook = new BookModel(req.body);
    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Failed to add book", error });
  }
});

// ✅ Get all books from MongoDB
router.get("/all", async (req, res) => {
  try {
    const books = await BookModel.find(); // Fetch books from MongoDB
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Failed to fetch books", error });
  }
});

// ✅ Get a specific book by ID
router.get("/all/:id", async (req, res) => {
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

// ✅ Update a book by ID
router.put("/change/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, coverImage } = req.body;

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

// ✅ Delete a book by ID
router.delete("/delete/:id", async (req, res) => {
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
