import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateToken = (email, pwd) => {
    try {
        const token = jwt.sign(
            {
                email: email,
                pwd: pwd
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )
        return token
    } catch (error) {
        return null
    }
}

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log('decoded ->', decoded)
        return decoded
    } catch (error) {
        return false
    }
}

export { generateToken, verifyToken }
