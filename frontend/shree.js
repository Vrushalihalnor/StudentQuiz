document.addEventListener("DOMContentLoaded", async function () {
    const quizContainer = document.getElementById("quiz");
    const resultContainer = document.getElementById("result");

    let questions = []; // Store questions globally

    // Fetch questions from API
    async function fetchQuestions() {
        quizContainer.innerHTML = "<p>Loading quiz...</p>"; // Show loading message
        try {
            const response = await fetch("http://localhost:3000/questions/Hindi,Puzzel");
            if (!response.ok) throw new Error("Failed to fetch questions");
            
            const data = await response.json();
            console.log("Fetched Questions:", data);
            questions = data;
            displayQuestions();
        } catch (error) {
            console.error("Error fetching questions:", error);
            quizContainer.innerHTML = "<p>Error loading quiz. Please try again later.</p>";
        }
    }

    // Display questions dynamically
    function displayQuestions() {
        quizContainer.innerHTML = ""; // Clear previous content
        questions.forEach((q, index) => {
            const questionElement = document.createElement("div");
            questionElement.classList.add("question-block");

            let optionsHTML = "";
            if (q.options.length > 0) {
                optionsHTML = q.options.map(option => `
                    <label>
                        <input type="radio" name="question${index}" value="${option}"> ${option}
                    </label><br>
                `).join("");
            } else {
                optionsHTML = `
                    <label>
                        Your Answer: <input type="text" name="question${index}" class="text-answer">
                    </label>
                `;
            }

            questionElement.innerHTML = `
                <p class="question">${index + 1}. ${q.question}</p>
                <div class="options">${optionsHTML}</div>
            `;
            quizContainer.appendChild(questionElement);
        });
    }

    // Function to check answers and submit them to the backend
    window.checkAnswers = async function () {
        if (questions.length === 0) {
            alert("No questions loaded!");
            return;
        }

        let correctCount = 0;
        let totalQuestions = questions.length;
        let answersToSubmit = [];

        questions.forEach((q, index) => {
            let userAnswer = "";
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            const textInput = document.querySelector(`input[name="question${index}"]`);

            if (selectedOption) {
                userAnswer = selectedOption.value;
            } else if (textInput) {
                userAnswer = textInput.value.trim();
            }

            if (userAnswer) {
                const isCorrect = userAnswer.toLowerCase() === q.answer.toLowerCase();
                answersToSubmit.push({
                    subject: q.subject,
                    question: q.question,
                    userAnswer: userAnswer,
                    isCorrect: isCorrect
                });
                if (isCorrect) correctCount++;
            }
        });

        const percentage = (correctCount / totalQuestions) * 100;
        resultContainer.innerHTML = `<p>You scored ${correctCount} out of ${totalQuestions} (${percentage.toFixed(2)}%)</p>`;

        // If no answers were submitted, stop execution
        if (answersToSubmit.length === 0) {
            alert("Please answer at least one question before submitting.");
            return;
        }

        // Send answers to the backend
        try {
            const response = await fetch("http://localhost:3000/answers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers: answersToSubmit }) // Corrected format
            });

            if (!response.ok) throw new Error("Failed to submit answers");

            const result = await response.json();
            console.log("Server Response:", result);
            alert("Answers submitted successfully!");
        } catch (error) {
            console.error("Error submitting answers:", error);
            alert("Error submitting answers. Please try again.");
        }
    };

    fetchQuestions();
});
