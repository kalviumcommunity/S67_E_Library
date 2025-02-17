const express = require('express');
const router = express.Router();

// In-memory mock data (generic items)
let items = [
  { id: 1, name: 'Item 1', description: 'This is item 1' },
  { id: 2, name: 'Item 2', description: 'This is item 2' }
];

// Create a new item
router.post('/items', (req, res) => {
  const { name, description } = req.body;

  const newItem = {
    id: items.length + 1,  // Incremental ID
    name,
    description,
  };

  items.push(newItem);

  res.status(201).json({
    message: 'Item created successfully',
    item: newItem,
  });
});

// Get all items
router.get('/items', (req, res) => {
  res.status(200).json(items);
});

// Get a specific item by ID
router.get('/items/:id', (req, res) => {
  const { id } = req.params;
  const item = items.find(i => i.id === parseInt(id));

  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Update an item by ID
router.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  let item = items.find(i => i.id === parseInt(id));

  if (item) {
    item.name = name || item.name;
    item.description = description || item.description;

    res.status(200).json({
      message: 'Item updated successfully',
      item,
    });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Delete an item by ID
router.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(i => i.id === parseInt(id));

  if (index !== -1) {
    const deletedItem = items.splice(index, 1);
    res.status(200).json({
      message: 'Item deleted successfully',
      item: deletedItem[0],
    });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

module.exports = router;
