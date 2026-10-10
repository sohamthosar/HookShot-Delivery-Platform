const Endpoint = require('../models/Endpoint');
const cache = require('../utils/cache');

let dbQueryCount = 0;

const getActiveEndpoints = async (userId) => {
    const cacheKey = "endpoints:" + userId;

    const cachedEndpoints = cache.get(cacheKey);

    if(cachedEndpoints){
        return cachedEndpoints;
    }

    dbQueryCount++;

    const endpoints = await Endpoint.find({
        userId : userId,
        active : true
    });

    cache.set(
        cacheKey,
        endpoints,
        5 * 60 * 1000 
    );

    return endpoints;
}

const getDbQueryCount = () => {
    return dbQueryCount;
}

module.exports = { getActiveEndpoints, getDbQueryCount };