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
const chatRouter = require('./routes/chat');
const messageRouter = require('./routes/message');

// Constants
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

// Database connection
connectToDb(MONGODB_URI);

const corsOptions = {
  origin: [process.env.CLIENT_URL],
  credentials: true,
  exposedHeaders: ['set-cookie'],
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

// Error handlers
app.use(notFoundErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
