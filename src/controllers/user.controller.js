import fs from "fs";
import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import { hashPassword, verifyPwd } from "../config/bcrypt.js";

// DONE
const createuser = async (req, res) => {
    // 1. check for input (name, email, password, mobile, gender)
    // 2. check for password length
    // 3. check for valid email format
    // 4. encrypt password
    // 5. check if user already exists
    // 6. upload avatar on cloudinary
    // 7. create user
    // 8. send response to client

    const { name, email, password, mobile, gender } = req.body

    const mobileNumber = Number(mobile)

    // check for input (name, email, password, mobile, gender)
    if (!(name && email && password && gender && mobileNumber))
        return res.status(400)
            .json({
                success: false,
                message: "all fields are required"
            })

    // check for password length
    if (password.length < 8)
        return res.status(400)
            .json({
                success: false,
                message: "password must be at least 8 characters long"
            })

    // check for valid email format
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
        return res.status(400)
            .json({
                success: false,
                message: "invalid email id"
            })

    // encrypt password
    const hashedPwd = await hashPassword(password)

    try {
        // check if user already exists
        const existingUser = await User.findOne({ email: email })
        if (existingUser)
            res.status(400)
                .json({
                    success: false,
                    message: "user with this email already exists"
                })

        // upload image on cloudinary
        let imagePath = req.file.path
        const imageURL = await uploadOnCloudinary(imagePath)
        if (!imageURL)
            return res.status(400)
                .json({
                    success: false,
                    message: "image upload failed"
                })

        // delete local image from server
        fs.unlink(imagePath, (err) => {
            if (err)
                return res.status(400)
                    .json({
                        success: false,
                        message: "Something went wrong"
                    })
        })

        // create user
        const user = new User({
            name: name,
            email: email,
            password: password,
            hashedPwd: hashedPwd,
            mobile: mobileNumber,
            gender: gender,
            avatar: imageURL
        })
        user.save()

        // send response with user details to client
        res.status(200)
            .json({
                success: true,
                message: "user created successfully",
                user: user
            })
    } catch (error) {
        res.status(400)
            .json({
                success: false,
                message: error
            })
    }
}

// DONE
const getallusers = (req, res) => {
    try {
        const users = User.find()
        if (!users)
            res.status(400)
                .json({
                    success: false,
                    message: "no users found"
                })

        res.status(200)
            .json({
                success: true,
                message: "users retrieved successfully",
                users: users
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

// DONE
const getuser = (req, res) => {
    const { id } = req.params
    try {
        const user = User.findById(id)
        // const user = User.findOne({ _id: id })
        if (!user)
            res.status(400)
                .json({
                    success: false,
                    message: "user not found"
                })

        res.status(200)
            .json({
                success: true,
                message: "user retrieved successfully",
                user: user
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

// DONE
const deleteuser = (req, res) => {
    const { id } = req.params
    try {
        const user = User.findByIdAndDelete(id)
        // const user = User.deleteOne({ _id: id })
        if (!user)
            res.status(400)
                .json({
                    success: false,
                    message: "user not found"
                })

        res.status(200)
            .json({
                success: true,
                message: "user deleted successfully",
                user: user
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

const verifyUser = (req, res) => {
    // business logic for verifying a user
    res.send('user verified successfully');
}

const updateuser = async (req, res) => {
    const { id } = req.params
    const { name, mobile, bio, DOB } = req.body
    const { path } = req.file
    // const { avatar } = req.file

    if (!name && !mobile && !bio && !DOB)
        return res.status(400)
            .json({
                success: false,
                message: "no fields to update"
            })

    try {
        const user = User.findById(id)
        if (!user)
            res.status(400)
                .json({
                    success: false,
                    message: "user not found"
                })

        let imageURL = ""
        if (path) {
            // upload image on cloudinary
            let imagePath = req.file.path
            imageURL = await uploadOnCloudinary(imagePath)
            if (!imageURL)
                return res.status(400)
                    .json({
                        success: false,
                        message: "image upload failed"
                    })

            // delete local image from server
            fs.unlink(imagePath, (err) => {
                if (err)
                    return res.status(400)
                        .json({
                            success: false,
                            message: "Something went wrong"

                        })
            })
        }

        // -> use this when changes are conditonal
        // -> database calls : 2
        // -> triggers middleware
        user.name = name || user.name
        user.mobile = mobile || user.mobile
        user.bio = bio || user.bio
        user.DOB = DOB || user.DOB
        user.avatar = req.file.path || user.avatar
        user.save()

        // -> use this when changes are not conditonal
        // -> database calls : 1
        // -> no middlewares
        // const updatedUser = await User.findByIdAndUpdate(id, {
        //     name: name || user.name,
        //     mobile: mobile || user.mobile,
        //     bio: bio || user.bio,
        //     DOB: DOB || user.DOB,
        //     avatar: imageURL || user.avatar
        // })
        // if (!updatedUser)
        //     res.status(400).json({
        //         success: false,
        //         message: "user not updated"
        //     })

        res.status(200)
            .json({
                success: true,
                message: "user updated successfully",
                user: user
            })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

const logoutuser = (req, res) => {
    // business logic for logging out a user
    res.send('user logged out successfully');
}

const loginuser = async (req, res) => {
    // 1. access token using JWT
    // 2. refresh token using JWT

    const { email, password } = req.body

    // 1. check for input (email, password)
    if (!email || !password)
        res.status(400)
            .json({
                success: false,
                message: "all fields are required"
            })

    try {
        // 2. check if user exists
        const user = await User.findOne({ email: 'nikhil@gmail.com' })
        if (!user)
            res.status(400)
                .json({
                    success: false,
                    message: "user does not exist"
                })

        // 3. check if password is correct
        const IsPwdCorrect = await verifyPwd(password, user.hashedPwd)
        if (!IsPwdCorrect)
            res.status(400)
                .json({
                    success: false,
                    message: "incorrect password"
                })

        // 4. send response to client
        res.status(200)
            .json({
                success: true,
                message: "user logged in successfully",
                user: user
            })
    } catch (error) {
        res.status(400)
            .json({
                success: false,
                message: error.message
            })
    }
}

export {
    createuser,
    getallusers,
    getuser,
    deleteuser,
    updateuser,
    logoutuser,
    loginuser
};