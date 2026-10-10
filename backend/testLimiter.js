const { createLimiter } = require('./middleware/rateLimiter');

const limiter = createLimiter({
    limit: 3,
    windowMs: 10000
});

for (let i = 1; i <= 6; i++) {
    const result = limiter("user123");

    console.log(`Request ${i}:`, result);
}