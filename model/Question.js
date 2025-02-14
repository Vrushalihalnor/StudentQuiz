const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: String, required: true }
}, { collection: "Algebra" }); // ✅ Ensure it fetches from the "Algebra" collection

module.exports = mongoose.model("Algebra", questionSchema);
