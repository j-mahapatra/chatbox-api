const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connectToDb } = require('./config/database');
const {
  notFoundErrorHandler,
  errorHandler,
} = require('./middlewares/errorMiddleware');

const userRouter = require('./routes/user');

// Constants
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

// Database connection
connectToDb(MONGODB_URI);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRouter);

// Error handlers
app.use(notFoundErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
