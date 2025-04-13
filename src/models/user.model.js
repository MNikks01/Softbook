
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String, // data type of the value
        required: true, // value is compulsory/required
        unique: true, // value should be unique / no two users can have the same email
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    isVerified: {
        type: Boolean,
        default: false // default value of the field
    },
    mobile: {
        type: Number,
        required: true,
    },
    gender: {
        required: true,
        type: String,
        enum: ['male', 'female', 'other'] // accepts only these values
    },
    bio: {
        type: String,
        maxlength: 200,
        trim: true
    },
    avatar: String,
    DOB: Date,
    hashedPwd: String
}, { timestamps: true })

const User = mongoose.model('User', userSchema)  // User is the name of the collection
export default User

