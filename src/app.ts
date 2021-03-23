import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { json } from 'body-parser'
import connectDB from './config/db'
import colors from 'colors'

import userRoutes from './routes/userRoutes' 


dotenv.config()

connectDB()

const app = express()

app.use(json())

app.use('/api/users', userRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message })
})

const POST = process.env.Port || 5000

app.listen(POST, () => {console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)})