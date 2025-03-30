
import express from "express";
import {
    createuser, deleteuser, getallusers, getuser, updateuser, logoutuser
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/create", createuser);
router.get("/getall", getallusers);
router.get("/get/:id", getuser);
router.delete("/delete/:id", deleteuser);
router.put("/update/:id", updateuser);
router.get("/logout", logoutuser);

export default router;

