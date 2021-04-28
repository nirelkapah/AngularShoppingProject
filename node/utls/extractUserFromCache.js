let serverCache = require('../models/serverCache');

const extractUserFromCache = (req) => {
    let authorizationString = req.headers['authorization'];
    let token = authorizationString.substring('Bearer '.length);
    let userCacheData = serverCache.get(token);

    return userCacheData;
}

module.exports = extractUserFromCache;