const express = require('express');
const router = express.Router();
const user = require('./user');
const keyword = require('./keyword');

router.use('/user', user);
router.use('/keyword', keyword);

module.exports = router;