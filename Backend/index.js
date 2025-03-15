const express = require('express');
const connectDB  = require('./db');  // Import connectDB function for MongoDB connection

const cors = require('cors');
const router = require('./controllers/routes');


const app = express();

require('dotenv').config();
const port = process.env.PORT || 5000;  // Ensure the environment variable for port is correctly referenced
const url = process.env.db_url;  // MongoDB URL from environment variables

// Middleware to parse incoming JSON requests

app.use(cors());
app.use(express.json());

// Establish database connection
app.listen(port, async () => {
  try {
    await connectDB(url);  // Connect to the database using the provided URL
    console.log(`Connected to the database and server is running on port ${port}`);
  } catch (error) {
    console.error('Database connection failed:', error);
  }
});

// Define CRUD routes
app.use('/api', router);  // Use the routes defined in routes.js (prefixed with '/api')

// Root endpoint (just a simple test endpoint)
app.get('/', (req, res) => {
  res.send('Hello World!');
});
