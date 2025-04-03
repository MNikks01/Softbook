
import { Schema, model } from 'mongoose'

const likeSchema = new Schema({
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
})

const Like = model('Like', likeSchema)
export default Like