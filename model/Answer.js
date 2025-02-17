const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    subject: String,
    question: String,
    userAnswer: String,
    isCorrect: Boolean,
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Answer", AnswerSchema);
