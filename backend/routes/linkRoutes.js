const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')

const LinkController = require("../controllers/linkController")
const userController = require( "../controllers/userController" );



router.post('/fetch-preview' , LinkController.fetchLink);
router.post('/save-link', LinkController.saveLinkHome);
router.get('/get-link-key' , LinkController.linkKey);


router.post('/save', authMiddleware , LinkController.saveLink);
router.get('/get-all-links' ,authMiddleware, LinkController.getAllLinks);
router.get('/get-link', authMiddleware, LinkController.getLink);
router.get('/delete-link/:linkkey', authMiddleware, LinkController.deleteLink);

//Analytics
router.get('/analytics/:linkkey/:range', LinkController.getAnalytics);



module.exports = router;