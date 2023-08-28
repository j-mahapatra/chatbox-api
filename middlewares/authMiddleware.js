const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const checkAuth = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401);
    throw new Error('User is not authenticated.');
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ _id: userId }).select('-password');
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Invalid authentication token.');
  }
});

module.exports = { checkAuth };
