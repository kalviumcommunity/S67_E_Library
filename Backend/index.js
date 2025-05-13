const express = require('express');
const cors = require('cors');
const connectDB = require('./src/database/db');
const bookRouter = require('./src/controllers/bookRouter');
const authRouter = require('./src/controllers/authRouter');


const app = express();

require('dotenv').config();
const port = process.env.PORT || 5000;  
const db_url = process.env.db_url;  


app.use(cors());
app.use(express.json());


app.listen(port, async () => {
  try {
    await connectDB(db_url);  
    console.log(`Connected to the database and server is running on port ${port}`);
  } catch (error) {
    console.error('Database connection failed:', error);
  }
});


app.use('/auth', authRouter);
app.use('/books', bookRouter);  


app.get('/', (req, res) => {
  res.send('Hello World!');
});
