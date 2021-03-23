import { RequestHandler } from 'express'

const notFound: RequestHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler: RequestHandler = (err, res) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err
    })
}

export { notFound, errorHandler }