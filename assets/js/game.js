//logic flow

// page loads to show quiz home - title and get started button
// user clicks on the get started button
// timer starts and first question appears
//user answers the question
// its either right - correct warning - next question loads
// its wrong - wrong warning - time is deducted from timer - next question
// for loop to repeat until there are no more questions
// final score is shown and user can enter initials
// highscores are stored to local storage and displayed on a separate page 
// clear highscores button
// go back to home page

var timerClock = document.getElementById("timer-count")

var gameHomepage = document.getElementById("game-homepage")
var startQuiz = document.getElementById("start-quiz")

var quiz = document.getElementById("quiz")
var options = document.getElementById("options")
var message = document.getElementById("message")

var gameOver = document.getElementById("game-over")
var results = document.getElementById("results")
var seeScores = document.getElementById("see-scores")
var saveScore = document.getElementById("save-score")
var playAgain = document.getElementById("play-again")

var secondsRemaining = 0;
var score = 0;
var currentQues = 0;
var timerCountdown;


function endGame() {

    clearInterval(timerCountdown);

    timerClock.textContent = " "

    gameOver.textContent = "You scored: " + score;

}

 function onSaveScore() {
     var userInitials = document.getElementById("user-initials").value

     if (userInitials !== ""){
         localStorage.setItem(userInitials, score);
     }
     document.getElementById("user-initials").value = "";
 }

function onSeeScores() {

}

function onAnswerSelection(event) {
    var correct = questions[currentQues].answer;
    var userAnswer = event.target.textContent;

    if (correct === userAnswer) {
        score++;

        answerMessage("You're RIGHT!!")

    } else {
        secondsRemaining-=10;

        answerMessage("Sorry, WRONG answer!")
    }
showQuestion();
}

function answerMessage(displayed) {

    message.textContent = displayed

    setTimeout(function(){
        message.textContent = " ";
    }, 2000);
}

function showQuestion() {

    currentQues++;
    console.log('question asked' + currentQues);

    if (currentQues >= questions.length) {
        endGame();
        return;
    }

    var loadQues = questions[currentQues];
    document.getElementById("question").textContent = loadQues.title

    options.innerHTML = "";

    

    for (var i = 0; i < loadQues.choices.length; i++) {
// this is creating an inner div element for the options to sit in in the div(id = options) in the html
        var choice = document.createElement("button");
        choice.textContent = loadQues.choices[i];
        choice.onclick = onAnswerSelection;
        choice.classList.add("choice");

        options.appendChild(choice);
    }
    
}

function runGame() {

    // so this is to hide the welcome "div" once the game loads - ref back to the .hide in css

    gameHomepage.classList.add("hide");

    secondsRemaining = 59;

    currentQues = -1;

    score = 0;

    timerCountdown = setInterval(function() {

        if (secondsRemaining > 0) {
            timerClock.textContent = secondsRemaining;
        }else {
            endGame();
        }
        secondsRemaining--;
    }, 1000);

    showQuestion();
}

startQuiz.addEventListener("click", runGame);
saveScore.addEventListener("click", onSaveScore);
playAgain.addEventListener("click", runGame);
seeScores.addEventListener("click", onSeeScores)