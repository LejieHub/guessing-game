let score = 0;
let questionIndex = 0;
let attempts = 0;  // Use a single attempts variable to track the number of attempts

let scoreElement = document.querySelector('.score');
let nextButton = document.getElementById('next'); // Reference to the Next button
let questions = document.querySelectorAll(".question");

// Initialize quiz
loadQuestion();

// Function to handle user's answer
function check(event) {
    attempts++;  // Increase the number of attempts for the current question
    let button = event.target;

    // Get the current question element
    let explanationElement = questions[questionIndex].querySelector('.explanation'); // Select explanation within the current question
    let hintImage2 = questions[questionIndex].querySelector('.hint-image-2'); // Select second hint within the current question

    // Check button class using exact string matching
    if (button.className === "correct") {
        button.style.background = "green";
        hintImage2.style.display = "block";  // Show second hint
        explanationElement.style.display = "block"; // Show explanation

        if (attempts === 1 || attempts === 2) {
            score++;
            scoreElement.textContent = score;
        }

        disableButtons();  // Disable further clicks
        nextButton.disabled = false;  // Enable Next button
    } else if (button.className === "incorrect") {
        button.style.background = "red";
        if (attempts === 1) {
            hintImage2.style.display = "block";  // Show second hint after first wrong attempt
        } else if (attempts >= 2) { // Max attempts reached
            explanationElement.style.display = "block";  // Show explanation
            showAllButtonColors();  // Show all button colors (correct/incorrect)
            disableButtons();  // Disable further clicks
            nextButton.disabled = false;  // Enable Next button
        }
    }
}

// Function to show all button colors
function showAllButtonColors() {
    const buttons = questions[questionIndex].querySelectorAll("button");
    for (let button of buttons) {
        // Check button class using exact string matching
        if (button.className === "correct") {
            button.style.background = "green";  // Correct answers are green
        } else if (button.className === "incorrect") {
            button.style.background = "red";  // Incorrect answers are red
        }
    }
}

// Disable all buttons after answer
function disableButtons() {
    const buttons = questions[questionIndex].querySelectorAll("button");
    for (let button of buttons) {
        button.disabled = true;
    }
}

// Restart quiz
function restartQuiz() {
    score = 0;
    scoreElement.textContent = score;
    attempts = 0;  // Reset attempts on restart

    // Hide summary page and show the first question
    document.getElementById('summarypage').style.display = 'none';

    // Reset question states and show the first question
    questionIndex = 0;
    loadQuestion();
}

// Show the summary after quiz completion
function showSummary() {
    for (let question of questions) {
        question.style.display = 'none';
    }
    document.getElementById('summarypage').style.display = "block";
    nextButton.style.display = "none";  // Hide the Next button on the summary page
}

// Navigate to the next question
function nextQuestion() {
    if (questionIndex < questions.length - 1) {
        questionIndex++;
        attempts = 0;  // Reset attempts for the new question
        loadQuestion();
    } else {
        showSummary(); // If it's the last question, show summary
    }
}

// Load the question based on the current index
function loadQuestion() {
    nextButton.style.display = "block";

    // Hide all questions first
    for (let question of questions) {
        question.style.display = 'none';
    }

    // Show the current question
    questions[questionIndex].style.display = 'block';
    const buttons = questions[questionIndex].querySelectorAll("button");

    for (let button of buttons) {
        button.disabled = false; // Enable all buttons for the current question
        button.style.background = "lightgray";  // Reset button color

        // Add event listener to each button
        button.onclick = check;  // Call check function when the button is clicked
    }

    // Display hint and explanation if question is answered
    const currentHintImage2 = questions[questionIndex].querySelector('.hint-image-2');
    const currentExplanation = questions[questionIndex].querySelector('.explanation');
    currentHintImage2.style.display = "none";
    currentExplanation.style.display = "none";

    // Disable Next button until the question is answered or attempts are used up
    nextButton.disabled = true;
}
