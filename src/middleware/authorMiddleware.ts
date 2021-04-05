import jwt, { decode } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { RequestHandler } from 'express'
import User from '../model/user'


const protect: RequestHandler = asyncHandler ( async (req: any, res, next) => {
    let token
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)

            req.user = await User.findById(decoded.id).select('-password')
            console.log(decoded.id)
            
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const admin : RequestHandler = (req: any, res, next) => {
    if(req.user && req.user.role == 'admin') {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}


export { protect, admin }