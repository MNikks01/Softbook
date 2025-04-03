import express from "express";
import {
    createPost, deletePost, getAllPosts,
    getPost, updatePost
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/get/:id", getPost);
router.get("/getall", getAllPosts);
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

export default router;
