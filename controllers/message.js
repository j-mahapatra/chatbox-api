const asyncHandler = require('express-async-handler');
const Message = require('../models/message');

const createMessage = asyncHandler(async (req, res) => {
  const message = new Message({
    sender: req.user._id,
    content: req.body.content,
    chat: req.body.chat,
  });

  await message.save();

  return res.status(201).json({ message: 'Message created successfully.' });
});

const getMessageById = asyncHandler(async (req, res) => {
  const message = await Message.findOne({ _id: req.params.id })
    .populate('sender', '-password')
    .populate({
      path: 'chat',
      populate: { path: 'members admin', select: '-password' },
    });

  if (!message) {
    res.status(404);
    throw new Error('Invalid message ID.');
  }

  if (!message.sender.equals(req.user._id)) {
    res.status(403);
    throw new Error('Unauthorized access.');
  }

  res.status(200).json(message);
});

const getMessageByChat = asyncHandler(async (req, res) => {
  const message = await Message.find({ chat: req.params.id })
    .populate('sender', '-password -__v')
    .populate({
      path: 'chat',
      populate: { path: 'members admin', select: '-password -__v' },
    });

  if (!message) {
    res.status(404);
    throw new Error('Invalid chat ID.');
  }

  res.status(200).json(message);
});

module.exports = { createMessage, getMessageById, getMessageByChat };
