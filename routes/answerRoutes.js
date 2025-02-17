const express = require("express");
const router = express.Router();
const { storeAnswer } = require("../controllers/storeAnswer");

// Route to store answers
router.post("/", storeAnswer);

module.exports = router;
