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
var timerTitle = document.getElementById("timer-title")

var gameHomepage = document.getElementById("game-homepage")
var startQuiz = document.getElementById("start-quiz")

var quiz = document.getElementById("quiz")
var options = document.getElementById("options")
var message = document.getElementById("message")

var gameOver = document.getElementById("game-over")
var results = document.getElementById("results")
var initialsRecord = document.getElementById ("initials-record")
var seeScores = document.getElementById("see-scores")
var saveScore = document.getElementById("save-score")
var playAgain = document.getElementById("play-again")

var highScoresBtn = document.getElementById("home-scores")

var scoresPage = document.getElementById("score-page")
//var tableScore = document.getElementById("table-score")
var quizHome = document.getElementById("quiz-home")

var secondsRemaining = 0;
var score = 0;
var currentQues = 0;
var timerCountdown;
const NO_OF_HIGH_SCORES = 10;
const HIGH_SCORES = "high-scores";
const highScoreString = localStorage.getItem(HIGH_SCORES);
const highScores = JSON.parse(highScoreString) ?? [];




function init () {
    gameHomepage.style.display = 'block';    
    gameOver.style.display = 'none'; 
    timerTitle.style.display = 'none';
    scoresPage.style.display = 'none';
    highScoresBtn.style.display = 'block';


}

init();


function checkHighScore(score) {
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;
    
    if (score > lowestScore) {
      saveHighScore(score, highScores); // TODO
      showHighScores(); // TODO
    }
  }

function endGame() {

    clearInterval(timerCountdown);

    timerClock.textContent = " "

    quiz.style.display = 'none';
    gameOver.style.display = 'block';
    timerTitle.style.display = 'none';
    

    if (score == 0) {
        results.textContent = "You scored " + score + "/5 ! 😱 Must try harder 😉"
    } else if (score !== 5) {
        results.textContent = "You scored " + score + "/5 Great attempt! 🙌🏻 play again and go for gold!!"
    } else {
        results.textContent = "You scored " + score + "/5 CONGRATULATIONS 🎉"
    };
   
    checkHighScore(account.score);

}

 function saveHighScore(score, highScores) {

    results.style.display = 'none';

     const userInitials = document.getElementById("user-initials").value;
     

     if (userInitials == ""){
        window.alert("You must enter a user initials")
        saveHighScore();
     } else {
        const newScore = { score, userInitials };
        highScores.push(newScore);
        highScores.sort((a, b) => b.score - a.score);
        highScores.splice(NO_OF_HIGH_SCORES);
        localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
    };
    
    
    
    
    
        //      localStorage.setItem(userInitials, score);
    //  }
    //  document.getElementById("user-initials").value = "";
    // userInitials = userInitials.toUpperCase();  

    // initialsRecord.textContent = userInitials + " scored " + score + "  ";
        
 }

function onSeeScores() {

    gameHomepage.style.display = 'none';
    quiz.style.display = 'none';
    gameOver.style.display = 'none';
    scoresPage.style.display = 'block';
    highScoresBtn.style.display = 'none'

const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
const highScoreList = document.getElementById("highScores");

highScoreList.innerHTML = highScores
    .map((score) => `<li>${score.score} - ${score.name}`)
    .join('');
    

    //   var displayResults = [];
    //   console.log(displayResults);
     
    
    //  for (var i=0; i < localStorage.length; i++) {

    //     var initials = localStorage.key(i);
    //     var numbers = localStorage.getItem(initials);

    //     displayResults.push({ initials, numbers });
    //     document.getElementById("table-score").textContent = displayResults;
    // }

    

    // for (var i=0; i < localStorage.length; i++) {

    //     var initials = localStorage.key(i);
    //     var numbers = localStorage.getItem(initials);
        
    //     var displayResults = document.createElement("div");
    //        displayResults.classList.add('display-result');
    
    //        tableScore.appendChild(displayResults);
    
    //        displayResults.textContent = initials + " " + numbers;

        
    }
    





    //   var displayResults = document.createElement("div");
    //   displayResults.classList.add('display-result');

    //   tableScore.appendChild(displayResults);

    //   displayResults.textContent = initials + " " + numbers;



       // tableScore.textContent = initials + numbers;

   




function onAnswerSelection(event) {
    var correct = questions[currentQues].answer;
    var userAnswer = event.target.textContent;

    if (correct === userAnswer) {
        score++;

        answerMessage("You're RIGHT!! 👏")

    } else {
        secondsRemaining-=10;

        answerMessage("Sorry, WRONG answer! 😭")
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


    gameHomepage.style.display = 'none';
    timerTitle.style.display = 'block';
    quiz.style.display = 'block';
    gameOver.style.display = 'none'; 
    
    

    showQuestion();
    
}

startQuiz.addEventListener("click", runGame);
saveScore.addEventListener("click", saveHighScore);
playAgain.addEventListener("click", runGame);
seeScores.addEventListener("click", onSeeScores);
highScoresBtn.addEventListener("click", onSeeScores);
quizHome.addEventListener("click", init);