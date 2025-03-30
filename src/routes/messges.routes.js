
import express from "express";
import {
    sendMessage, getAllMessages, getMessage, deleteMessage, unsendMessage, readMessage
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/create", sendMessage);
router.get("/getall", getAllMessages);
router.get("/get/:id", getMessage);
router.delete("/delete/:id", deleteMessage);
router.put("/update/:id", unsendMessage);
router.put("/read/:id", readMessage);

export default router;