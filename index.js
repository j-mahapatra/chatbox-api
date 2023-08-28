const express = require('express');
require('dotenv').config();
const { connectToDb } = require('./config/database');

// Constants
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

// Database connection
connectToDb(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
