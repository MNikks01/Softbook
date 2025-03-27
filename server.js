
// import statements
import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./src/config/db.js"
import userRoutes from './src/routes/user.routes.js'

// initialization and configuration
dotenv.config()
const app = express()

// database connection
connectDB();

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/v1/user', userRoutes)


// start the server
const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})