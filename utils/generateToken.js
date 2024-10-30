const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    console.log('JWT_KEY:', process.env.JWT_KEY);
    const secretKey = process.env.JWT_KEY;
    if (!secretKey) {
        throw new Error('JWT Secret Key is not defined. Set the JWT_KEY environment variable.');
    }

    return jwt.sign(
        { email: user.email, id: user._id },
        secretKey,
        { expiresIn: '1h', algorithm: 'HS512' }
    );
};

module.exports.generateToken = generateToken;
