
import { v2 as cloudinary } from 'cloudinary'

import dotenv from 'dotenv'
dotenv.config()

// configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

const uploadOnCloudinary = async (localImagePath) => {
    console.log(localImagePath)
    try {
        const response = await cloudinary.uploader.upload(localImagePath, { type: 'upload' })
        return response.url
    } catch (error) {
        return error
    }
}

export default uploadOnCloudinary