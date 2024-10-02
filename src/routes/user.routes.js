const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin, isUser } = require('../middleware/auth');
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/admin', [verifyToken, isAdmin], (req, res) => {
  res.status(200).send('Admin Content');
});

router.get('/user', [verifyToken, isUser], (req, res) => {
  res.status(200).send('User Content');
});

module.exports = router;