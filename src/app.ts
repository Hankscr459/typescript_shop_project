import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { json } from 'body-parser'
import connectDB from './config/db'
import morgan from 'morgan'
import cors from 'cors'
import colors from 'colors'

import { errorHandler, notFound } from './middleware/errorMiddleware'

import userRoutes from './routes/userRoutes' 

dotenv.config()

connectDB()

const app = express()

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(json())
app.use(cors());

app.use('/api/users', userRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message })
})

app.use(notFound)

app.use(errorHandler)

const POST = process.env.Port || 5000

app.listen(POST, () => {console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)})