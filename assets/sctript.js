// Set variables
var timeLeft = 60;
var timerInterval = 0;
var timeClock = document.querySelector("#timer");
var yourScore = document.getElementById("yourScore");
var lastQuestionIndex = questionArr.length - 1;
var questions = document.getElementById("question");
var i = 0;
var choiceAEl = document.getElementById("choiceA");
var choiceBEl = document.getElementById("choiceB");
var quizBox = document.getElementById("quizBox");
var leaderScore = document.getElementById("leaderScore");
var leaders = [];
var leaderList = document.getElementById("leader-list");
var submitButton = document.getElementById("submit-button");
var scoreInput = document.getElementById("score-text");
var name = document.getElementById("score-name");
var startButton = document.getElementById("startBtn");
var welcome = document.getElementById("welcome");
var highScoreLink = document.getElementById("highScore");


init();

function init(){
    leaderScore.style.display = "none";
    quizBox.style.display = "none";
    //     Parsing the JSON string to an object
    var lastUser = JSON.parse(localStorage.getItem("leaderHighScore"));
    // If todos were retrieved from localStorage, update the array 
    if (lastUser !== null) {
      leaders = lastUser;
    }
}



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

    
function renderQuestions(){
    questions.innerHTML = questionArr[i].question;
    choiceA.innerHTML = questionArr[i].choiceA;
    choiceB.innerHTML = questionArr[i].choiceB;
    choiceC.innerHTML = questionArr[i].choiceC;
    choiceD.innerHTML = questionArr[i].choiceD;
};


document.getElementById("nextButton").addEventListener("click", function(){
     //If timer runs out OR questions finished time stops
    if (i > lastQuestionIndex){
        clearInterval(timerInterval);
        leaderBoard();
     }  else {
        renderQuestions();
        i++;
    }
});


function checkAnswer(answer){
    if (answer === questionArr[i].correct) {
         timeLeft +=10;
    } if (answer !== questionArr[i].correct){
        // decrease 15 seconds of time
        timeLeft -=15;
    } 
}


function leaderBoard(){
    quizBox.style.display = "none";
    leaderScore.style.display = "block";
}


submitButton.addEventListener("click", function(event) {
    event.preventDefault();
           
     var scoreText = scoreInput.value.trim();
  
    // Return from function early if submitted scoreText is blank
    if (scoreText === "") {
    return;
    }

    var div = document.createElement("div");
    div.textContent = "Your score is:" +" " + timeLeft;
    leaderList.appendChild(div);
    
    leaderBoard();
    storeScore();    
    storeLeaders();
});

function storeScore(event) {
    leaders[leaders.length] = {
        names: scoreInput.value,
        savedScores: timeLeft
    }
}        

   
function storeLeaders() {
    // Stringify and set "scores" key in localStorage to leader array
    localStorage.setItem("leaderHighScore", JSON.stringify(leaders));
}

showScore();

function showScore(){
    var lastUser = JSON.parse(localStorage.getItem("leaderHighScore"));

    for (var i = 0; i < lastUser.length; i++) {
        console.log(lastUser[i].savedScores);
            var name = leaders[i].names;
            var score = leaders[i].savedScores;
            var div = document.createElement("div");
            div.textContent = name + " " +score;
            div.setAttribute("data-index", i);
            leaderList.appendChild(div);
          }
}
    
highScoreLink.addEventListener('click',function(){
    quizBox.style.display = "none";
    startButton.style.display = "none";
    welcome.style.display = "none";
    leaderScore.style.display = "block";
});
