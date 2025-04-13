
import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
    {
        postCaption: {
            type: String,
            trim: true
        },
        postImage: {
            type: String,
            required: true
        },
        postBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model('Post', postSchema)
export default Post

