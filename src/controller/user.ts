import { RequestHandler } from 'express'


export const Hello: RequestHandler = async (req, res, next) => {


    res.status(201).json({message: 'Hello world'})
}