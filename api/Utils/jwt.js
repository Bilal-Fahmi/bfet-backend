const jwt = require('jsonwebtoken')


exports.generateToken = async (payload) => {
    const SECRET_KEY = process.env.JWT_KEY
    return jwt.sign(payload, SECRET_KEY)
}

exports.verifyToken = async (token) => {
    const SECRET_KEY = process.env.JWT_KEY
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        return decoded
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new jwt.JsonWebTokenError('invalid access token')
        } else {
            throw error
        }
    }
}

