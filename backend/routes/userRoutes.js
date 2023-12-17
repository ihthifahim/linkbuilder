const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const multer = require('multer');
//Import Controllers
const userController = require('../controllers/userController')

const saveImageMiddleware = require('../helpers/userAvatar');

const router = express.Router();


router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.get('/get-user',authMiddleware ,userController.getUser);
router.post('/update-user',authMiddleware ,userController.updateUser);

// router.post('/save-image',authMiddleware , upload ,userController.saveImage);


module.exports = router;