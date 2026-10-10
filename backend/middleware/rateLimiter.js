const createLimiter = ({ limit, windowMs}) => {
    const requests = new Map();

    return (key) => {
        const now = Date.now();
        const entry = requests.get(key);

        if(!entry || now >= entry.resetTime){
            requests.set(key, {
                count : 1,
                resetTime : now + windowMs
            });

            return{ allowed : true };
        }

        if(entry.count >= limit){
            const retryAfterSeconds = Math.ceil((entry.resetTime - now)/1000);

            return { allowed : false, retryAfterSeconds };
        }

        entry.count++;

        return { allowed : true };
    };
};

const rateLimitMiddleware = (limiter, getKey) => {
    return (req, res, next) => {
        const key = getKey(req);

        const result = limiter(key);

        if(!result.allowed){
            res.set("Retry-After", result.retryAfterSeconds);

            return res.status(429).json({
                message : "Too many requests"
            });
        }

        next();
    }
}

module.exports = { createLimiter, rateLimitMiddleware };