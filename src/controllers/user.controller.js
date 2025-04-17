import fs from "fs";
import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import { hashPassword, verifyPwd } from "../utils/hashPwd.js";
import { generateToken } from "../utils/jwt.js";

// DONE and Tested
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

// DONE and tested
const getallusers = async (req, res) => {
    try {
        const users = await User.find({}).select('-hashedPwd -__v -password')
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
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

// DONE and tested
const getuser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id).select('-hashedPwd -__v -password')
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
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

// DONE and tested
const deleteuser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findByIdAndDelete(id)
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
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

// DONE and tested
const verifyUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if (!user)
            res.status(400)
                .json({
                    success: false,
                    message: "user not found"
                })

        const updatedUser = await User.findByIdAndUpdate(id, { isVerified: true })
        // const updatedUser = await User.updateOne({ _id: id }, { isVerified: true })

        res.status(200)
            .json({
                success: true,
                message: "user verified successfully",
                updatedUser: updatedUser
            })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

// DONE and tested
const updateuser = async (req, res) => {
    const { id } = req.params
    const { name, mobile, bio, DOB } = req.body
    // const { path } = req.file
    // const { avatar } = req.file

    if (!name && !mobile && !bio && !DOB)
        return res.status(400)
            .json({
                success: false,
                message: "no fields to update"
            })

    try {
        const user = await User.findById(id)
        if (!user)
            res.status(400)
                .json({
                    success: false,
                    message: "user not found"
                })


        let imageURL = ""
        if (req.file) {
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
        user.avatar = imageURL || user.avatar

        await user.save()

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
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

// DONE and tested
const logoutuser = (req, res) => {

    res
        .cookie('token', "")
        .status(200)
        .json({
            success: true,
            message: "user logged out successfully"
        })

}

// DONE and tested
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
        const user = await User.findOne({ email: email })
            .select('-__v -password')
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

        const token = await generateToken(email, user.hashedPwd)
        if (!token)
            res.status(400)
                .json({
                    success: false,
                    message: "token generation failed"
                })
        console.log('token ->', token)

        // 4. send response to client
        res.status(200)
            .cookie('token', token, {
                httpOnly: true,
                secure: true,
            })
            .json({
                success: true,
                message: "user logged in successfully",
                user: user
            })
    } catch (error) {
        res.status(400)
            .json({
                success: false,
                message: 'Something went wrong'
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
    loginuser,
    verifyUser
};