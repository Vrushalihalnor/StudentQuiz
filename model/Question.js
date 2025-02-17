// const mongoose = require("mongoose");
// const questionSchema = new mongoose.Schema({
//     question: { type: String, required: true },
//     options: { type: [String], required: true },
//     answer: { type: String, required: true }
// }, { collection: "English" }); // ✅ Ensure it fetches from the "Algebra" collection
// module.exports = mongoose.model("English", questionSchema);
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: String, required: true }
});

function getQuestionModel(subject) {
    if (!subject || typeof subject !== "string") {
        console.error("Invalid subject passed to getQuestionModel:", subject);
        throw new Error("Invalid subject name provided.");
    }
    
    return mongoose.model(subject, questionSchema, subject);
}

module.exports = getQuestionModel;



// const mongoose = require("mongoose");

// const questionSchema = new mongoose.Schema({
//     question: { type: String, required: true },
//     options: { type: [String], required: true },
//     answer: { type: String, required: true }
// });

// const getQuestionModel = (subject) => {
//     return mongoose.model(subject, questionSchema, subject);
// };

// module.exports = getQuestionModel;

