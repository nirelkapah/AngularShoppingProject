const expressJwt = require('express-jwt');
const config = require('../config.json')
let { secret } = config;


function authenticateJwtRequestToken() {
    // Load secret into 
    return expressJwt({ 
        secret,
        algorithms: ['HS256'],
    }).unless({
        path: [
            // public routes that don't require authentication
            '/users/',
            '/users/authenticate',
            '/users/register',
            '/users/checkUserExist',
            '/products/countProducts',
            '/reservations/',
            // '/public',
        ]
    });
}

module.exports = authenticateJwtRequestToken;

