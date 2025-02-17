// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/dbconfig");
// const quizRoutes = require("./routes/quizRoutes");
// const app = express();
// app.use(express.json()); 
// app.use(cors());
// // Connect to MongoDB
// connectDB();
// // Use API routes
// app.use("/api", quizRoutes);
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`🚀 API running on http://localhost:${PORT}`);
// });









// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const connectDB = require("./config/dbconfig"); // Import the MongoDB connection
// const getQuestionModel = require("./model/Question"); // Import the dynamic model function
// const cors = require('cors');
// const app = express();
// app.use(express.json());
// app.use(cors()); // Enable CORS for all requests
// // Connect to MongoDB
// connectDB();

// // Route to fetch questions dynamically
// app.get("/questions/:subjects", async (req, res) => {
//     const { subjects } = req.params;
//     const subjectList = subjects.split(","); // Convert "Math,Science" to ["Math", "Science"]

//     console.log("Fetching questions for subjects:", subjectList);

//     try {
//         let allQuestions = [];

//         for (const subject of subjectList) {
//             const QuestionModel = getQuestionModel(subject);
//             console.log(`Using model for collection: ${subject}`);

//             const questions = await QuestionModel.find({});
//             // console.log(`Questions found for ${subject}:`, questions);

//             allQuestions.push(...questions);
//         }

//         res.json(allQuestions);
//     } catch (error) {
//         console.error("Error fetching questions:", error);
//         res.status(500).json({ error: "Error fetching questions" });
//     }
// });


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// const express = require("express");
// const router = express.Router();
// const getQuestionModel = require("./model/Question");

// Fetch quiz questions by subject
// router.get("/quiz/:subject", async (req, res) => {
//     try {
//         const { subject } = req.params;
//         const QuestionModel = getQuestionModel(subject); // Get the model dynamically
//         const questions = await QuestionModel.find();
//         res.json(questions);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch questions" });
//     }
// });

// // Add a new question to a specific subject
// router.post("/quiz/:subject", async (req, res) => {
//     try {
//         const { subject } = req.params;
//         const QuestionModel = getQuestionModel(subject); // Get the model dynamically
//         const newQuestion = new QuestionModel(req.body);
//         await newQuestion.save();
//         res.json({ message: "Question added successfully" });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to add question" });
//     }
// });

// module.exports = router;





require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/dbconfig"); 
const cors = require("cors");

const questionRoutes = require("./routes/quizRoutes");
const answerRoutes = require("./routes/answerRoutes"); // Correctly import answer routes

const app = express();
app.use(express.json());
app.use(cors()); 

connectDB(); // Connect to MongoDB

// Correct route usage
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes); // Corrected route for storing answers

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
