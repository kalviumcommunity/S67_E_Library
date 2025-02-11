const express = require('express');
const { connectDB } = require('./db');

const app = express();

require('dotenv').config();
const port = process.env.PORT || 5000; // Ensure the environment variable is correctly referenced
const url = process.env.db_url;

app.listen(port, async () => {
  try {
    await connectDB(url);
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error(error);
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});