import ENV from '../config.js'
import jwt from 'jsonwebtoken'

// auth middleware
export default async function Auth(req, res, next) {
    try {
        // access authorize header to validate token request
        const token = req.headers.authorization.split(" ")[1];

        // Retrieve the user details or the logged in user
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET)
        
        req.user = decodedToken;
        next()
        // res.json(decodedToken);
    } catch (error) {
        res.status(401).json({ error: "Authentication Failed" })
    }
}


// Creating localVariables to get access to the OTP
export function localVaribles(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next()
}