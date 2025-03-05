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




const express = require('express');
const router = express.Router();

// In-memory mock data (sample books)
let books = [
  { 
    id: 1, 
    title: 'The Great Gatsby', 
    author: 'F. Scott Fitzgerald', 
    genre: 'Fiction', 
    coverImage: 'https://via.placeholder.com/150'
  },
  { 
    id: 2, 
    title: '1984', 
    author: 'George Orwell', 
    genre: 'Dystopian', 
    coverImage: 'https://via.placeholder.com/150'
  }
];

// Create a new book
router.post('/add', (req, res) => {
  const { title, author, genre, coverImage } = req.body;

  // Validate input (simple check)
  if (!title || !author || !genre || !coverImage) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newBook = {
    id: books.length + 1,  // Incremental ID
    title,
    author,
    genre,
    coverImage
  };

  books.push(newBook);

  res.status(201).json({
    message: 'Book created successfully',
    book: newBook,
  });
});

// Get all books
router.get('/all', (req, res) => {
  res.status(200).json(books);
});

// Get a specific book by ID
router.get('/all/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find(b => b.id === parseInt(id));

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Update a book by ID
router.put('/change/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, genre, coverImage } = req.body;

  let book = books.find(b => b.id === parseInt(id));

  if (book) {
    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.coverImage = coverImage || book.coverImage;

    res.status(200).json({
      message: 'Book updated successfully',
      book,
    });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Delete a book by ID
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex(b => b.id === parseInt(id));

  if (index !== -1) {
    const deletedBook = books.splice(index, 1);
    res.status(200).json({
      message: 'Book deleted successfully',
      book: deletedBook[0],
    });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

module.exports = router;
