
// import statements
import express from 'express'
import dotenv from 'dotenv'
import multer from 'multer'
// import bodyParser from 'body-parser'
import connectDB from "./src/config/db.js"
import userRoutes from './src/routes/user.routes.js'
import postRoutes from './src/routes/post.routes.js'
import messageRoutes from './src/routes/messges.routes.js'

// initialization and configuration
dotenv.config()
const app = express()
const upload = multer();

// database connection
connectDB();

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/message', messageRoutes)

// start the server
const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})