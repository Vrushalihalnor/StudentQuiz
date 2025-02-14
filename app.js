require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbconfig");
const quizRoutes = require("./routes/quizRoutes");

const app = express();
app.use(express.json()); 
app.use(cors());

// Connect to MongoDB
connectDB();

// Use API routes
app.use("/api", quizRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API running on http://localhost:${PORT}`);
});
