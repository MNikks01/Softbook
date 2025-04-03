
import User from "../models/user.model.js";
import hashPassword from "../utils/hashPwd.js";

const createuser = async (req, res) => {

    const { name, email, password, mobile, gender } = req.body

    if (!(name && email && password && gender))
        return res.status(400)
            .json({
                success: false,
                message: "all fields are required"
            })

    if (password.length < 8)
        return res.status(400)
            .json({
                success: false,
                message: "password must be at least 8 characters long"
            })

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
        return res.status(400)
            .json({
                success: false,
                message: "invalid email id"
            })

    try {
        const existingUser = await User.findOne({ email: email })

        if (existingUser)
            res.status(400)
                .json({
                    success: false,
                    message: "user with this email already exists"
                })

        const hashedPwd = await hashPassword(password)

        console.log(hashedPwd);

        // const user = new User({
        //     name: name,
        //     email: email,
        //     password: hashedPwd,
        //     mobile: mobile,
        //     gender: gender
        // })

        // user.save()

        // res.status(200)
        //     .json({
        //         success: true,
        //         message: "user created successfully",
        //         user: user
        //     })
    } catch (error) {
        res.status(400)
            .json({
                success: false,
                message: error
            })
    }
}

const getallusers = (req, res) => {
    // business logic for getting all users
    res.send('list of all users retrieved successfully');
}

const getuser = (req, res) => {
    // business logic for getting a single user
    res.send('one user retrieved successfully');
}

const deleteuser = (req, res) => {
    // business logic for deleting a user
    res.send('user deleted successfully');
}

const updateuser = (req, res) => {
    // business logic for updating a user
    res.send('user updated successfully');
}

const logoutuser = (req, res) => {
    // business logic for logging out a user
    res.send('user logged out successfully');
}

export {
    createuser,
    getallusers,
    getuser,
    deleteuser,
    updateuser,
    logoutuser
};