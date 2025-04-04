const express = require('express');
const router = express.Router();
const { SignIn, SignUp } = require('../controllers/auth');

router.post('/sign-up', SignUp);
router.post('/sign-in', SignIn);

module.exports = router;
