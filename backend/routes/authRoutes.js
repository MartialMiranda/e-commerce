const express = require('express');
const authController = require('../controllers/authController');
const validateUser = require('../utils/validateUser');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/profile', validateUser, authController.profile);

module.exports = router;
