import User from '../model/user'
import { RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'
import jwt  from 'jsonwebtoken'
import fetch from 'node-fetch'

export const Hello: RequestHandler = async (req, res, next) => {


    res.status(201).json({message: 'Hello world'})
}

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
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' })
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
                            const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET!, { expiresIn: '7d' })
                            const { _id, email, name, role } = user
                            res.cookie('token', token, { expiresIn: '1d' })
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
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' })
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
                    const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET!, { expiresIn: '7d' })
                    const { _id, email, name, role } = user
                    res.cookie('token', token, { expiresIn: '1d' })
                    return res.json({ token, user: { _id, email, name, role } })
                })
            }
        })
    )})

export const userInfo: RequestHandler = asyncHandler ( async (req: any, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})