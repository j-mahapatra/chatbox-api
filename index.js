const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connectToDb } = require('./config/database');
const {
  notFoundErrorHandler,
  errorHandler,
} = require('./middlewares/errorMiddleware');
const http = require('http');

const userRouter = require('./routes/user');
const chatRouter = require('./routes/chat');
const messageRouter = require('./routes/message');

// Constants
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

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

// Socket IO Connection
io.on('connection', (socket) => {});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
