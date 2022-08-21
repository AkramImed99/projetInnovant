const express = require('express');
const router = express.Router();
const user = require('./user');
const keyword = require('./keyword');
const result = require('./result');

router.use('/user', user);
router.use('/keyword', keyword);
router.use('/result', result);

module.exports = router;