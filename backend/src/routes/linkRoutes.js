const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Link Routes')
})



module.exports = router;