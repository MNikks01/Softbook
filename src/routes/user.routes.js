
import express from "express";

const router = express.Router();

router.get("/create", (req, res) => {
    // business logic of creating a user account
});

router.get("/getall", (req, res) => {
    // business logic of getting all users
});

router.get("/get/:id", (req, res) => {
    // business logic of getting a single user
});

router.delete("/delete/:id", (req, res) => {
    // business logic of deleting a user
});

router.put("/update/:id", (req, res) => {
    // business logic of updating a user
});

export default router;