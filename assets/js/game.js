
// set out the game variables below to link back to the HTML - they follow in order of how they appear in the HTML

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



// give baselines to game variables
var secondsRemaining = 0;
var score = 0;
var currentQues = 0;
var timerCountdown;



// this is dictating what should load to the home page when the page initialises for the first time and will run on website load load
function init () {
    // this is hiding/displaying the elements of the interface that need to be seen whilst this function is running
    gameHomepage.style.display = 'block';    
    gameOver.style.display = 'none'; 
    timerTitle.style.display = 'none';
    highScoresBtn.style.display = 'block';
    quiz.style.display = 'none';   
}

init();

// the following 3 functions define the soundeffects and pull the files in from the assets folder
function playSoundCorrect() {
    let correct = new Audio ('./assets/sfx/correct.wav');
    correct.play();
}


function playSoundIncorrect() {
    let incorrect = new Audio ('./assets/sfx/incorrect.wav');
    incorrect.play();
}

function playEndSound() {
    let playEnd = new Audio ('./assets/sfx/tadaa-47995.mp3');
    playEnd.play();

}

// whether the user runs out of time or answers all the questions, the endgame function will run and will display a message with the users score and a sound will play
//and will also display the highscores button, user input for ID for saving score, save score button and play again button (with event listeners defined for each button)
function endGame() {

    clearInterval(timerCountdown);

    timerClock.textContent = " "
    // this is hiding/displaying the elements of the interface that need to be seen whilst this function is running
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
   
    playEndSound();
}

// once the user has entered their ID in the input box, when they click on the save score button an event listener will trigger this function, to save their initials & score to local storage
 function onSaveScore(e) {

    results.style.display = 'none';

     var userInitials = document.getElementById("user-initials").value

     if (userInitials !== ""){
         localStorage.setItem(userInitials, score);
     }
     document.getElementById("user-initials").value = ""; 

    initialsRecord.textContent = userInitials + " scored " + score + "  ";

      e.preventDefault();  
 }

 // if the user clicks on either the highscores button in the header, or the high scores button displayed in the end game function, an event listener will trigger this function
 // i had orginally placed the code for this function within this game.js file, however, i found that it created a loop whereby everytime an event listener triggered this function, the data would be retrieved from local storage, creating multiple copies of the highscores list to be displayed.
 // the fix for this was to create a separate HTML and JS file for this function, so that the event listener for highscores each button, takes you to the highscores html page, rather than triggering the 'onSeeScores, function each time.
 // this function will run in the savescore.js file and take the user to the scoreboard.html page
function onSeeScores() {

// gameHomepage.style.display = 'none';
// quiz.style.display = 'none';
// gameOver.style.display = 'none';
// scoresPage.style.display = 'block';
// highScoresBtn.style.display = 'none'


  window.location.href = 'scoreboard.html';


}
    


// this function will run from the onclick called in the showQuestion function for loop and each potential answer is a button
// so if the onClick, targets a button (var userAnswer) that is linked to the answer laid out in the questions.js (defined in the var correct) the code will display a correct answer, if the two match, otherwise a wrong answer msg will be shown and time from the timer will be deducted
// the next question is called
function onAnswerSelection(event) {
    var correct = questions[currentQues].answer;
    var userAnswer = event.target.textContent;

    if (correct === userAnswer) {
        score++;

        answerMessage("You're RIGHT!! 👏")
        playSoundCorrect();

    } else {
        // 10s time will be deducted for a wrong answer
        secondsRemaining-=10;

        answerMessage("Sorry, WRONG answer! 😭")
        playSoundIncorrect();
    }
showQuestion();
}

// this function is defining where the message should be displayed in the HTML layout and for how long
function answerMessage(displayed) {

    message.textContent = displayed

    setTimeout(function(){
        message.textContent = " ";
    }, 2000);
}

// this function is telling the code to pull the current question from the questions.js file, and it is checking if the current question is greater than or equal to the no of questions available.
// if there are questions left, then the next question loads, if not then the endGame function is called
function showQuestion() {

    currentQues++;
    console.log('question asked' + currentQues);

    if (currentQues >= questions.length) {
        endGame();
        return;
    }
// this var loads the question title and writes it into the HTML
    var loadQues = questions[currentQues];
    document.getElementById("question").textContent = loadQues.title

    options.innerHTML = "";

    
// the for loop below, creates a button for each possible answer, and 'writes' it inot the HTML to be displayed
// by creating a button for each answer in the JS rather than in the HTML, the number of buttons shown will match the number of possible answers. ie. if there are 3 answers, only 3 buttons will be created, if there are 5 answers only 5 buttons will be displayed... and so on
// if we created the buttons in the HTML, when you may have unoccupied buttons or missing answers

    for (var i = 0; i < loadQues.choices.length; i++) {
// this is creating an inner div element for the options to sit in in the div(id = options) in the html
        var choice = document.createElement("button");
        choice.textContent = loadQues.choices[i];
        choice.onclick = onAnswerSelection;
        choice.classList.add("choice");

        options.appendChild(choice);
    }
    
}

//an event listener will trigger this function
function runGame() {

    // re defining the variable for seconds remaining, this is where the timer will start
    secondsRemaining = 59;
    //current question variable starts at -1, because if it started at index 0 then the way the showQuestion function runs, the first question wouldn't be called, as the showQuestion function starts with currentQues++
    currentQues = -1;
    // score set to zero
    score = 0;

    // the timer will be displayed in the header of the HTML and once it reaches 0, the endGame function will be triggered
    timerCountdown = setInterval(function() {

        if (secondsRemaining > 0) {
            timerClock.textContent = secondsRemaining;
        } else {
            endGame();
        }
        secondsRemaining--;
    }, 1000);

    // this is hiding/displaying the elements of the interface that need to be seen whilst this function is running
    gameHomepage.style.display = 'none';
    timerTitle.style.display = 'block';
    quiz.style.display = 'block';
    gameOver.style.display = 'none'; 
    
    
    // this triggers the showQuestion function
    showQuestion();

    
    
}

// all the event listeners
startQuiz.addEventListener("click", runGame);
saveScore.addEventListener("click", onSaveScore);
playAgain.addEventListener("click", runGame);
seeScores.addEventListener("click", onSeeScores);
highScoresBtn.addEventListener("click", onSeeScores);
