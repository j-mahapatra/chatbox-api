const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const { generateToken } = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Checking for duplicate entries
  const isUsernameDuplicate = await User.exists({ username });
  const isEmailDuplicate = await User.exists({ email });

  if (isUsernameDuplicate || isEmailDuplicate) {
    res.status(400);
    throw new Error('User is already registered.');
  }

  // Create user
  const user = await User.create({
    username,
    email,
    password,
  });

  if (!user) {
    throw new Error('User sign up failed.');
  }

  return res.status(201).json({
    message: 'User signed up successfully.',
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    res.status(400);
    throw new Error('Incorrect email or password.');
  }

  const token = await generateToken(user._id);

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
  });

  return res.status(200).json({
    message: 'Logged in successfully.',
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', null, {
    httpOnly: true,
    maxAge: 0,
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({ message: 'User logged out succesfully.' });
});

const getUserDetails = asyncHandler(async (req, res) => {
  return res.status(200).json(req.user);
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const {
    username: newUsername,
    password: newPassword,
    profilePicture: newProfilePicture,
  } = req.body;

  if (!newUsername && !newPassword && !newProfilePicture) {
    res.status(400);
    return res.json({
      message: 'Invalid Request.',
    });
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User doesn't exist.");
  }
  user.username = newUsername || user.username;
  user.password = newPassword || user.password;
  user.profilePicture = newProfilePicture || user.profilePicture;
  await user.save();

  return res.status(201).json({
    message: 'Details updated successfully.',
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updateUserDetails,
};