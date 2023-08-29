const express = require('express');
const { checkAuth } = require('../middlewares/authMiddleware');
const {
  createChat,
  getAllChats,
  getChatById,
  deleteChatById,
} = require('../controllers/chat');

const router = express.Router();

router.post('/create', checkAuth, createChat);
router.get('/all', checkAuth, getAllChats);
router
  .route('/:id')
  .get(checkAuth, getChatById)
  .delete(checkAuth, deleteChatById);

module.exports = router;
