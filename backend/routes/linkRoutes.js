const express = require('express')
const router = express.Router()

const LinkController = require("../controllers/linkController")
const userController = require( "../controllers/userController" );


router.post('/fetchpreview', LinkController.fetchLink);
router.post('/save', LinkController.saveLink);
router.get('/get-link-key', LinkController.linkKey);



module.exports = router;