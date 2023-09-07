const asyncHandler = require('express-async-handler');
const Chat = require('../models/chat');

const createChat = asyncHandler(async (req, res) => {
  let { name, members } = req.body;

  if (!name || !members) {
    res.status(400);
    throw new Error('Invalid request.');
  }

  // Populate members array with logged in user
  members = [req.user._id, ...members];

  const chat = new Chat({
    name,
    members,
    admin: req.user._id,
  });
  await chat.save();

  return res.status(201).json({
    message: 'Chat created successfully.',
  });
});

const getAllChats = asyncHandler(async (req, res) => {
  const user = req.user;
  const chats = await Chat.find({
    $or: [{ admin: user._id }, { members: { $elemMatch: { $eq: user._id } } }],
  }).populate('members admin', '-password');

  return res.status(200).json({ chats });
});

const getChatById = asyncHandler(async (req, res) => {
  const chat = await Chat.findOne({ _id: req.params.id }).populate(
    'members admin',
    '-password'
  );

  if (!chat) {
    res.status(404);
    throw new Error('Chat was not found');
  }

  return res.status(200).json(chat);
});

const deleteChatById = asyncHandler(async (req, res) => {
  const chat = await Chat.findOne({ _id: req.params.id });
  if (!chat) {
    res.status(404);
    throw new Error('Chat was not found');
  }
  if (!chat.admin.equals(req.user._id)) {
    res.status(403);
    throw new Error('Unauthorized access.');
  }
  const deletedChat = await Chat.deleteOne({ _id: req.params.id });
  if (deletedChat.deletedCount) {
    return res.status(200).json({
      message: 'Chat deleted successfully.',
    });
  }
  throw new Error('Failed to delete chat.');
});

module.exports = { getAllChats, getChatById, createChat, deleteChatById };
