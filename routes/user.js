const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updateUserDetails,
  getAllUsers,
} = require('../controllers/user');
const { checkAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.put('/signup', registerUser);
router.post('/login', loginUser);
router.get('/logout', checkAuth, logoutUser);
router
  .route('/details')
  .get(checkAuth, getUserDetails)
  .put(checkAuth, updateUserDetails);
router.get('/all', checkAuth, getAllUsers);

module.exports = router;
