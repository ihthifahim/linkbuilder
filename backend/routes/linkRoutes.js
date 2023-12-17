const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')

const LinkController = require("../controllers/linkController")
const userController = require( "../controllers/userController" );



router.post('/fetch-preview' , LinkController.fetchLink);
router.post('/save', authMiddleware , LinkController.saveLink);
router.get('/get-link-key' , LinkController.linkKey);
router.get('/get-all-links' ,authMiddleware, LinkController.getAllLinks);

router.get('/get-link', authMiddleware, LinkController.getLink);



module.exports = router;