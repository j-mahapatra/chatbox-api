const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updateUserDetails,
} = require('../controllers/user');
const { checkAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router
  .route('/details')
  .get(checkAuth, getUserDetails)
  .put(checkAuth, updateUserDetails);

module.exports = router;
