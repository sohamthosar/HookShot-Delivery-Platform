const express = require('express');
const { signup, login, refresh, logout } = require('../controllers/authControllers');

const { rateLimitMiddleware } = require('../middleware/rateLimiter');
const { loginLimiter } = require('../middleware/limiters');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', rateLimitMiddleware(loginLimiter, req => req.ip + " " + req.body.email), login);
router.post('/refresh', refresh);
router.post('/logout', logout);

module.exports = router;