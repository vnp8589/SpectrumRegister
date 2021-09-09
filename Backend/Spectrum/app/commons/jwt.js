const expressJwt = require('express-jwt');
const config = require('../../config.json');
const { getUserById } = require('../api/auth/services')

module.exports = () => {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/auth/signup',
            '/auth/login', 
            '/dashboard/register'
        ]
    });
}
async function isRevoked(req, payload, done) {
    const user = await getUserById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};