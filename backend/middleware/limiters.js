const { createLimiter } = require('./rateLimiter');

const loginLimiter = createLimiter({limit : 5, windowMs : 60 * 1000});
const eventLimiter = createLimiter({limit : 10, windowMs : 60 * 1000});

module.exports = { loginLimiter, eventLimiter };