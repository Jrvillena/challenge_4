// Set variables
var startButton = document.getElementById("startBtn");
var welcome = document.getElementById("welcome");
var highScoreLink = document.getElementById("highScore");
var timeLeft = 60;
var timerInterval = 0;
var timeClock = document.querySelector("#timer");

// Call to action 'Start Quiz' by click of button
document.querySelector("#startBtn").addEventListener('click',startQuiz);

function startQuiz() {
    quizBox.style.display = "block";
    startButton.style.display = "none";
    welcome.style.display = "none";
    // Timer starts    
    timerInterval = setInterval(function() {
        timeLeft--;
        timeClock.textContent = timeLeft + " seconds left for quiz.";
        renderQuestions();

        if(timeLeft === 0) {
        leaderBoard();
        }

    }, 1000);

}
