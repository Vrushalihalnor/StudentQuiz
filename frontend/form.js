let quizData = []; // Global variable to store quiz data

async function fetchQuizData() {
    try {
        const response = await fetch("http://localhost:3000/api/questions");
        quizData = await response.json(); // Store fetched data in global variable
        displayQuiz(quizData);
    } catch (error) {
        console.error("Error fetching quiz data:", error);
    }
}

function displayQuiz(quizData) {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";

    quizData.forEach((item, index) => {
        let questionHTML = `
            <div class="question">${index + 1}. ${item.question}</div>
            <div class="options" id="options${index}">
        `;

        item.options.forEach(option => {
            questionHTML += `
                <label>
                    <input type="radio" name="question${index}" value="${option}" onclick="highlightAnswer(${index}, '${option}', '${item.answer}')">
                    ${option}
                </label><br>
            `;
        });

        questionHTML += `</div>`;
        quizContainer.insertAdjacentHTML('beforeend', questionHTML);
    });
}

function highlightAnswer(index, selectedOption, correctAnswer) {
    const optionsDiv = document.getElementById(`options${index}`);
    optionsDiv.querySelectorAll("label").forEach(label => {
        label.classList.remove("correct", "wrong");
        if (label.innerText.trim() === selectedOption) {
            label.classList.add(selectedOption === correctAnswer ? "correct" : "wrong");
        }
    });
}

function checkAnswers() {
    let correctCount = 0;
    let wrongCount = 0;

    quizData.forEach((item, index) => {
        const selectedOption = document.querySelector(`input[name='question${index}']:checked`);
        if (selectedOption) {
            if (selectedOption.value === item.answer) {
                correctCount++;
            } else {
                wrongCount++;
            }
        }
    });

    const totalQuestions = quizData.length;
    const percentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

    document.getElementById("result").innerHTML = `
        <p>Correct Answers: ${correctCount}</p>
        <p>Wrong Answers: ${wrongCount}</p>
        <p>Percentage: ${percentage.toFixed(2)}%</p>
    `;
}

// Fetch quiz data when page loads
fetchQuizData();
