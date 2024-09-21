let score = 0;
let questionIndex = 0;
let attempts = 0; 

let scoreElement = document.querySelector('.score');
let nextButton = document.getElementById('next');
let questions = document.querySelectorAll(".question");

// Initialize quiz
loadQuestion();

function showEvolutionImages(steps) {
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.display = 'block'; // Show the image
        }, index * 1000); // Delay for each image
    });
}

function check(event) {
    attempts++;  
    let button = event.target;

    let explanationElement = questions[questionIndex].querySelector('.explanation');
    let hintImage2 = questions[questionIndex].querySelector('.hint-image-2');
    let evolutionContainer = questions[questionIndex].querySelector('.image-container');
    let evolutionSteps = evolutionContainer.querySelectorAll('.evolution-step');

    if (attempts === 1) {
        evolutionContainer.style.display = 'flex'; // Show evolution images on first attempt
        showEvolutionImages(evolutionSteps);
    }

    if (button.className === "correct") {
        button.style.background = "green";
        if (attempts === 1 || attempts === 2) {
            score++;
            scoreElement.textContent = score;
        }
        hintImage2.style.display = "block";  
        explanationElement.style.display = "block"; // Always show explanation if correct
        disableButtons(); 
        nextButton.style.display = 'block'; // Show the Next button
        nextButton.disabled = false; 
    } else if (button.className === "incorrect") {
        button.style.background = "red";
        if (attempts === 2) {
            hintImage2.style.display = "block";  
            explanationElement.style.display = "block"; // Show explanation on second attempt if incorrect
            disableButtons(); 
            nextButton.style.display = 'block'; // Show the Next button
            nextButton.disabled = false; 
        }
    }
}


function disableButtons() {
    const buttons = questions[questionIndex].querySelectorAll("button");
    for (let button of buttons) {
        button.disabled = true;
    }
}

function restartQuiz() {
    score = 0;
    scoreElement.textContent = score;
    attempts = 0;  

    document.getElementById('summarypage').style.display = 'none';
    questionIndex = 0;
    loadQuestion();

    // Reset hint image and explanation display
    const currentQuestion = questions[questionIndex];
    const hintImage2 = currentQuestion.querySelector('.hint-image-2');
    const explanationElement = currentQuestion.querySelector('.explanation');
    hintImage2.style.display = 'none';  // Hide hint image 2
    explanationElement.style.display = 'none';  // Hide explanation
}

function showSummary() {
    for (let question of questions) {
        question.style.display = 'none';
    }
    document.getElementById('summarypage').style.display = "block";
    nextButton.style.display = "none"; 
}

function nextQuestion() {
    if (questionIndex < questions.length - 1) {
        questionIndex++;
        attempts = 0; 
        loadQuestion();
    } else {
        showSummary(); 
    }
}

function loadQuestion() {
    nextButton.style.display = "none"; // Hide the Next button initially

    for (let question of questions) {
        question.style.display = 'none';
        let evolutionContainer = question.querySelector('.image-container');
        evolutionContainer.style.display = 'none'; 
        const evolutionSteps = evolutionContainer.querySelectorAll('.evolution-step');
        evolutionSteps.forEach(step => {
            step.style.display = 'none'; 
        });
    }

    questions[questionIndex].style.display = 'block';
    const buttons = questions[questionIndex].querySelectorAll("button");

    for (let button of buttons) {
        button.disabled = false; 
        button.style.background = "lightgray";  

        button.onclick = check;  
    }

    // Reset hint image and explanation display for the current question
    const currentQuestion = questions[questionIndex];
    const hintImage2 = currentQuestion.querySelector('.hint-image-2');
    const explanationElement = currentQuestion.querySelector('.explanation');
    hintImage2.style.display = 'none';  
    explanationElement.style.display = 'none';

    nextButton.disabled = true; // Disable Next button initially
}
