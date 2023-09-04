const express = require('express');
const { checkAuth } = require('../middlewares/authMiddleware');
const {
  createMessage,
  getMessageById,
  getMessageByChat,
} = require('../controllers/message');

const router = express.Router();

router.put('/create', checkAuth, createMessage);
router.get('/id/:id', checkAuth, getMessageById);
router.get('/chat/:id', checkAuth, getMessageByChat);

module.exports = router;
