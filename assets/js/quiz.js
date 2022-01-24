var questions = [
    {
        question: "Which of the following is used for assigning a value to a variable?",
        answers: ["x", "=", "-", "."],
        correctAnswer: "="
    },
    {
        question: "What is the correct way to write an array?",
        answers: ["let animals = ('dog', 'cat', 'mouse)", "let animals = {'dog', 'cat', 'mouse'}", "let animals = ['dog', 'cat', 'mouse']", "let animals = 'dog', 'cat', 'mouse'"],
        correctAnswer: "let animals = ['dog', 'cat', 'mouse']"
    },
    {
        question: "Commonly used data types DO NOT inlcude:",
        answers: ["strings", "null", "alerts", "booleans"],
        correctAnswer: "alerts"
    },
    {
        question: 'Where does this go <script src="scripts/main.js"></script> in your HTML?',
        answers: ["Just before the closing </body> tag", "Inside the <head></head> tag", "Just before the closing </html> tag", "At the beginning of the <body> tag"],
        correctAnswer: "Just before the closing </body> tag"
    }
]

var time = 75;
var timerEl = document.getElementById("timer");
var startSecEl = document.getElementById("start");
var startBtn = document.getElementById("start-btn");
var questionSecEl = document.getElementById("questions");
var questionEl = document.getElementById("question");
var answerBtn = document.getElementById("answer-btns")
var answerCheckEl = document.getElementById("answer-check");
var playerScoreSecEl = document.getElementById("player-score");
var finalScoreEl = document.getElementById("final-score");
var initialsInEl = document.getElementById("initial-input");
var submitBtn = document.getElementById("submit-btn");
var highscoresSecEl = document.getElementById("highscores");
var highscoresEl = document.getElementById("highscore-display");
var goBackBtn = document.getElementById("go-back-btn");
var clearBtn = document.getElementById("clear-btn");
var viewScoresEl = document.getElementById("viewScores");
var questionIndex = 0;
var timerID;

// Start button triggers first question
startBtn.addEventListener("click", startQuiz);
answerBtn.addEventListener("click", compareAnswer);
submitBtn.addEventListener("click", showHighscores);
viewScoresEl.addEventListener("click", showHighscores);

// Countdown
function countdownTimer() {
    time--;
    timerEl.textContent = "Time: " + time;
};

// Start quiz
function startQuiz() {
    timerID = setInterval(countdownTimer, 1000);
    startSecEl.classList.add("hide");
    questionSecEl.classList.remove("hide");
    countdownTimer();
    showQuestion(questionIndex);
}

// show questions
function showQuestion() {
    questionEl.textContent = questions[questionIndex].question;

    answerBtn.innerHTML = "";

    questions[questionIndex].answers.forEach(function(answer) {
        var li = document.createElement("li");
        var button = document.createElement("button");
        button.textContent = answer;
        li.appendChild(button);
        answerBtn.appendChild(li);
    });
}

// compare answers with correctAnswer
function compareAnswer(event) {
    var playerAnswer = event.target;

    // check if the answer was correct or wrong and display
    if (playerAnswer.innerText == questions[questionIndex].correctAnswer) {
          answerCheckEl.textContent = "Correct";
     } else {
         time = time - 10;
         answerCheckEl.textContent = "Wrong";
     }

    nextQuestion();
}

// go to next question or if at final question, end quiz
function nextQuestion() {
    questionIndex++;
    if (questionIndex >= questions.length) {
        endQuiz();
    } else {
        showQuestion();
    }
}

// end quiz
function endQuiz() {
    questionSecEl.classList.add("hide");
    playerScoreSecEl.classList.remove("hide");

    if (time >= 0) {
        clearInterval(timerID);
        var timeRemaining = time;
        timerEl.textContent = "Time: " + timeRemaining;
        finalScoreEl.textContent = "Your final score is " + timeRemaining;
    }

    var initials = initialsInEl.value;

    if (initials === null) {
        alert("Please enter intials!");
    } else {
        var currentScores = JSON.parse(currentScores);
        var newScore = {
            initials: initials,
            score: timeRemaining,
        }
        currentScores.push(newScore);
        localStorage.setItem("currentScores", newScore);
    }
}



function showHighscores() {
    startSecEl.classList.add("hide");
    questionSecEl.classList.add("hide");
    playerScoreSecEl.classList.add("hide");
    highscoresSecEl.classList.remove("hide");

    goBackBtn.addEventListener("click", function() {
        window.location.reload();
    });

    clearBtn.addEventListener("click", function() {
        localStorage.clear();
        highscoresEl.innerText = "";
    });    
}