const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');
const formidableMiddleware = require('express-formidable');

router.get('/profile', auth(), authController.getProfileInfo);
router.put('/profile', auth(), formidableMiddleware(), authController.editProfileInfo);

module.exports = router