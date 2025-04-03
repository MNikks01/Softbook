
import express from "express";
import {
    createuser, deleteuser, getallusers, getuser, updateuser, logoutuser
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/create", upload.single('avatar'), createuser);
router.get("/getall", getallusers);
router.get("/get/:id", getuser);
router.delete("/delete/:id", deleteuser);
router.put("/update/:id", updateuser);
router.get("/logout", logoutuser);

export default router;

