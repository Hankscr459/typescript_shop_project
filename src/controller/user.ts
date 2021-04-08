import User from '../model/user'
import { RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'
import jwt  from 'jsonwebtoken'
import fetch from 'node-fetch'
import generateToken from '../utils/generateToken'

export const Hello: RequestHandler = async (req, res, next) => {


    res.status(201).json({message: 'Hello world'})
}

export const signup: RequestHandler = asyncHandler ( async (req, res) => {
    // console.log("req.body", req.body);
    const user = await new User(req.body);
    await user.save((err: string, user: any) => {
        if (err) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        })
    })
})

export const signin: RequestHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            bonusPoint: user.bonusPoint,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

export const facebookLogin: RequestHandler = asyncHandler ( async (req, res: any) => {
    console.log('FACEBOOK LOGIN REQ BODY', req.body)
    const { userID, accessToken } = req.body

    const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
    
    return (
        await fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                const { email, name } = response
                User.findOne({ email }).exec((err: string, user: any) => {
                    if (user) {
                        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '30d' })
                        const {_id, email, name, role } = user
                        return res.json({
                            token,
                            user: {_id, email, name, role }
                        })
                    } else {
                        let password = email + process.env.JWT_SECRET
                        user = new User({ name, email, password})
                        user.save((err: string, data: any) => {
                            if (err) {
                                console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err)
                                return res.status(400).json({
                                    error: 'User signup failed with facebook'
                                })
                            }
                            const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET!, { expiresIn: '30d' })
                            const { _id, email, name, role } = user
                            res.cookie('token', token, { expiresIn: '30d' })
                            return res.json({ token, user: { _id, email, name, role } })
                        })
                    }
                })
            })
            .catch(error => {
                res.json({
                    error: 'Facebook login failed. Try later'
                })
            })
    )
})


export const lineLogin: RequestHandler = asyncHandler ( async (req, res: any) => {
    console.log('LINE LOGIN REQ BODY', req.body)
    const { email, name } = req.body

    
    return (
        User.findOne({ email }).exec((err: string, user: any) => {
            if (user) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '30d' })
                const {_id, email, name, role } = user
                return res.json({
                    token,
                    user: {_id, email, name, role }
                })
            } else {
                let password = email + process.env.JWT_SECRET
                user = new User({ name, email, password})
                user.save((err: string, data: any) => {
                    if (err) {
                        console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err)
                        return res.status(400).json({
                            error: 'User signup failed with facebook'
                        })
                    }
                    const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET!, { expiresIn: '30d' })
                    const { _id, email, name, role } = user
                    res.cookie('token', token, { expiresIn: '30d' })
                    return res.json({ token, user: { _id, email, name, role } })
                })
            }
        })
    )})

export const userInfo: RequestHandler = asyncHandler ( async (req: any, res) => {
    console.log('user_id',req.user._id)
    const user = await User.findById(req.user._id)

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            bonusPoint: user.bonusPoint
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})