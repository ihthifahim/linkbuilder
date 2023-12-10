const express = require('express');
const router = express.Router();

const linkRoutes = require('./linkRoutes');
const userRoutes = require('./userRoutes');

router.use('/link', linkRoutes);
router.use('/user', userRoutes);

module.exports = router;