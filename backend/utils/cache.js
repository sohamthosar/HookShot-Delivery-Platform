const cache = new Map();

let hits = 0;
let misses = 0;

const get = (key) => {
    const entry = cache.get(key);

    if(!entry){
        misses++;
        return null;
    }

    if(Date.now() >= entry.expiresAt){
        cache.delete(key);
        misses++;
        return null;
    }

    hits++;
    return entry.value;
};

const set = (key, value, ttlMs) => {
    cache.set(key, {
        value,
        expiresAt : Date.now() + ttlMs
    });
};

const del = (key) => {
    cache.delete(key);
};

const stats = () => {
    return {
        hits,
        misses
    };
};

module.exports = { get, set, del, stats };