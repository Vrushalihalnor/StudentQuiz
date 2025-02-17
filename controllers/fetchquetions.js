const getQuestionModel = require("../model/Question");

const fetchQuestions = async (req, res) => {
    const { subjects } = req.params;
    const subjectList = subjects.split(","); // Convert "Math,Science" to ["Math", "Science"]

    console.log("Fetching questions for subjects:", subjectList);

    try {
        let allQuestions = [];

        for (const subject of subjectList) {
            const QuestionModel = getQuestionModel(subject);
            console.log(`Using model for collection: ${subject}`);

            const questions = await QuestionModel.find({});
            allQuestions.push(...questions);
        }

        res.json(allQuestions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ error: "Error fetching questions" });
    }
};

module.exports = { fetchQuestions };
