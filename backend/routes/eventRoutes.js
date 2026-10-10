const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { saveEvent, getEvent } = require('../controllers/eventControllers');

const { rateLimitMiddleware } = require('../middleware/rateLimiter');
const { eventLimiter } = require('../middleware/limiters');

const { stats } = require('../utils/cache');
const { getDbQueryCount } = require('../utils/endpointUtils');

const router = express.Router();

router.post('/', authMiddleware, rateLimitMiddleware(eventLimiter, req => req.ip + ":" + req.user.userId), saveEvent);
router.get('/', authMiddleware, getEvent);
router.get('/debug/cache', authMiddleware, (req, res) => {
    return res.json({
        cache : stats(),
        dbQueries: getDbQueryCount()
    });
});

module.exports = router;