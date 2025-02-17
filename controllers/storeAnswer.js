const Answer = require("../model/Answer");

const storeAnswer = async (req, res) => {
    try {
        // Make sure 'answers' is passed in the request body
        const { answers } = req.body;

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ error: "Invalid request format" });
        }

        // Store each answer in the database
        const storedAnswers = [];

        for (const answer of answers) {
            const { subject, question, userAnswer, isCorrect } = answer;

            // Create a new answer object and save it to MongoDB
            const newAnswer = new Answer({ subject, question, userAnswer, isCorrect });
            const savedAnswer = await newAnswer.save();

            storedAnswers.push(savedAnswer);
        }

        res.status(201).json({
            message: "Answers submitted successfully!",
            storedAnswers
        });
    } catch (error) {
        console.error("Error storing answer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { storeAnswer };
