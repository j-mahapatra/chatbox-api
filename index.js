const express = require('express');
require('dotenv').config();
const { connectToDb } = require('./config/database');
const {
  notFoundErrorHandler,
  errorHandler,
} = require('./middlewares/errorMiddleware');

// Constants
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

// Database connection
connectToDb(MONGODB_URI);

// Error handlers
app.use(notFoundErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
