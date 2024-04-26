
let questions = [];
let currentQuestionIndex = 0;
let score = 0; //initialise empty array for storing questions, set starting question index, initialise score to 0

fetch('https://opentdb.com/api.php?amount=10&category=22')//fetches 10 questions from API


    .then(response => response.json())
    .then(data => {
        questions = data.results;
        displayQuestion();
    })
    
    
function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.textContent; //converts HTML entities to text. e.g. &quot; becomes "
}

function displayQuestion() {
    // Clears the document and displays the next question
    document.body.innerHTML = '';


    let p = document.createElement('p');
    p.innerText = decodeHTMLEntities(questions[currentQuestionIndex].question);
    p.className = 'question'; // Add class to question
    document.body.appendChild(p);


    let answers = [...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer];
    answers.sort(() => Math.random() - 0.5); // Combine the correct and incorrect answers, then shuffle them

    for (let answer of answers) {
        let button = document.createElement('button');
        button.innerText = decodeHTMLEntities(answer);
        button.className = 'answer'; // Add class to answer buttons
        button.addEventListener('click', () => checkAnswer(answer));
        document.body.appendChild(button);
    }
}

function checkAnswer(answer) {
    if (answer === questions[currentQuestionIndex].correct_answer) {
        score++;
    }
    nextQuestion(); //increments score if correct, then moves to next question
}

function nextQuestion() {
    // Move to next question
    currentQuestionIndex++;

    // If there are more questions, display next one
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        // checks if score is less than 7, if it is, redirect the user to loser page, if >7, move to winner page
        if (score < 7) {
            window.location.href = 'loser.html'; 
        } else {
            window.location.href = 'winner.html'; 
        }
    }
}