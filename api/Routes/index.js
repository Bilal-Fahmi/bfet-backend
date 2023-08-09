const express = require('express')
const router = express.Router();

const {login, signup, verifyLink} = require('../Controller/Auth');

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-link',verifyLink)


module.exports = router