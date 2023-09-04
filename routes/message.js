const express = require('express');
const { checkAuth } = require('../middlewares/authMiddleware');
const { createMessage, getMessageById } = require('../controllers/message');

const router = express.Router();

router.put('/create', checkAuth, createMessage);
router.get('/:id', checkAuth, getMessageById);

module.exports = router;
