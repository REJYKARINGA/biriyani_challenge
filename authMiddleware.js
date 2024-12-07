// authMiddleware.js

function checkAuthentication(req, res, next) {
    // Here we simulate an authentication token check.
    // In a real app, you would check headers or cookies for a JWT token.

    const token = req.headers['authorization'];

    if (!token || token !== 'valid-token') {  // Simulating token validation
        return res.status(403).json({ message: 'Unauthorized' });
    }

    // If the token is valid, proceed to the next middleware/route handler
    next();
}

module.exports = checkAuthentication;
