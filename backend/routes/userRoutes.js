const express = require('express')

//Import Controllers
const userController = require('../controllers/userController')

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;