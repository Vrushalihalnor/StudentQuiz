const express = require("express");
const router = express.Router();
const { fetchQuestions } = require("../controllers/fetchquetions");
const { storeAnswer } = require("../controllers/storeAnswer");

// Route to fetch questions dynamically
router.get("/:subjects", fetchQuestions);

module.exports = router;
