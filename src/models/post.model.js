
import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    postCaption: {
        type: String,
        trim: true
    },
    postImage: {
        type: String,
        required: true
    },
    postVideo: {
        type: String,
    },
})

const Post = mongoose.model('Post', postSchema)
export default Post

