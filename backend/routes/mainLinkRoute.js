const express = require('express')
const router = express.Router()

const linkHeaderMiddleware = require('../middleware/linkHeaderMiddleware')

const mainLinkController = require("../controllers/mainLinkController")


router.get('/testheader', mainLinkController.testHeader);
router.get('/:linkkey', linkHeaderMiddleware , mainLinkController.redirection);




module.exports = router;