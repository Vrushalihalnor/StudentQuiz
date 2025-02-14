const express = require("express");
const Question = require("../model/Question"); // Ensure the model is correct

const router = express.Router();

// GET API to fetch all quiz questions
router.get("/questions", async (req, res) => {
    try {
        const questions = await Question.find(); // ✅ Fetching from "Algebra" collection
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch questions" });
    }
});

module.exports = router;
