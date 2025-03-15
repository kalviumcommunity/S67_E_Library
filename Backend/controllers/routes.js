// const express = require('express');
// const router = express.Router();

// // In-memory mock data (generic items)
// let items = [
//   { id: 1, name: 'Item 1', description: 'This is item 1' },
//   { id: 2, name: 'Item 2', description: 'This is item 2' }
// ];

// // Create a new item
// router.post('/items', (req, res) => {
//   const { name, description } = req.body;

//   const newItem = {
//     id: items.length + 1,  // Incremental ID
//     name,
//     description,
//   };

//   items.push(newItem);

//   res.status(201).json({
//     message: 'Item created successfully',
//     item: newItem,
//   });
// });

// // Get all items
// router.get('/items', (req, res) => {
//   res.status(200).json(items);
// });

// // Get a specific item by ID
// router.get('/items/:id', (req, res) => {
//   const { id } = req.params;
//   const item = items.find(i => i.id === parseInt(id));

//   if (item) {
//     res.status(200).json(item);
//   } else {
//     res.status(404).json({ message: 'Item not found' });
//   }
// });

// // Update an item by ID
// router.put('/items/:id', (req, res) => {
//   const { id } = req.params;
//   const { name, description } = req.body;

//   let item = items.find(i => i.id === parseInt(id));

//   if (item) {
//     item.name = name || item.name;
//     item.description = description || item.description;

//     res.status(200).json({
//       message: 'Item updated successfully',
//       item,
//     });
//   } else {
//     res.status(404).json({ message: 'Item not found' });
//   }
// });

// // Delete an item by ID
// router.delete('/items/:id', (req, res) => {
//   const { id } = req.params;
//   const index = items.findIndex(i => i.id === parseInt(id));

//   if (index !== -1) {
//     const deletedItem = items.splice(index, 1);
//     res.status(200).json({
//       message: 'Item deleted successfully',
//       item: deletedItem[0],
//     });
//   } else {
//     res.status(404).json({ message: 'Item not found' });
//   }
// });

// module.exports = router;




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
