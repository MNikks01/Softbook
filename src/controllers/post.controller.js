import Post from "../models/post.model.js"

const createPost = async (req, res) => {
    const { postCaption } = req.body
    if (!postCaption && !postImage)
        res.status(400).json({
            success: false,
            message: "please provide postCaption or postImage"
        })
    try {
        let postImage = ""
        if (req.file) {
            // upload image on cloudinary
            let imagePath = req.file.path
            postImage = await uploadOnCloudinary(imagePath)
            if (!postImage)
                return res.status(400).json({
                    success: false,
                    message: "failed to upload image on cloudinary"
                })
        }

        const post = await Post.create({
            postCaption: postCaption.trim(),
            postImage,
            postBy: req.user._id
        })

        res.status(200).json({
            success: true,
            message: "post created successfully",
            post: post
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }

}

const getPost = (req, res) => {
    const { id } = req.params
    try {
        const post = Post.findById(id)
        if (!post)
            res.status(400).json({
                success: false,
                message: "post not found"
            })
        res.status(200).json({
            success: true,
            message: "post retrieved successfully",
            post: post
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

const getAllPosts = async (req, res) => {

    const user = req.user._id
    const { page = 1 } = req.query

    const skip = (page - 1) * 10
    const limit = 10

    try {
        const posts = await Post
            .find({ postBy: user })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        if (!posts)
            res.status(400).json({
                success: false,
                message: "no posts found"
            })

        res.status(200).json({
            success: true,
            message: "posts retrieved successfully",
            posts: posts
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

const updatePost = (req, res) => {
    // business logic for updating a post
}

const deletePost = (req, res) => {
    const { id } = req.params
    try {
        const post = Post.findByIdAndDelete(id)
        if (!post)
            res.status(400).json({
                success: false,
                message: "post not found"
            })
        res.status(200).json({
            success: true,
            message: "post deleted successfully",
            post: post
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

export { createPost, getPost, getAllPosts, updatePost, deletePost }