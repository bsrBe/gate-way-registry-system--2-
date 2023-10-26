import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../model/userSchema.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.userId).select('-password')

            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized,invalid token")
        }

    } else {
        res.status(401)
        throw new Error("Not authorized,no token")
    }
})

async function getUsers(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Cannot find User' });
        }

        res.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { protect, getUsers }