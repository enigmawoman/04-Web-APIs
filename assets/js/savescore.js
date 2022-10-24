// seeting out the variables to link back to the HMTL (scoreboard.html)
var quizHome = document.getElementById("quiz-home")

var scoresPage = document.getElementById("high-scores")
var tableScore = document.getElementById("high-scores")
var clearScore = document.getElementById("clear-scores")


// so for this for loop, the user initials are stored as a key and the score as a value in local storage
//so for each key up to the length of the data in locla storage, we are retrieving the user initials and score and displaying them on the highscores page.

 for (var i=0; i < localStorage.length; i++) {

     var initials = localStorage.key(i);
     var numbers = localStorage.getItem(initials);
    
     // by creating a new div for retrieved result, rather than having set divs in the html, we are not limited on the number of results that can be shown, this also makes it easier and clearer in the code
     var displayResults = document.createElement("div");
        displayResults.classList.add('display-result');

        tableScore.appendChild(displayResults);

        displayResults.textContent = initials + " " + numbers;

        

       }

// function will run on the event listener for quiz home and take the user back to the main quiz page
function rtnQuizHome() {
        window.location.href = 'index.html';
}

// this will run on the event listener for clear scores and will clear all the highscores stored in local storage
function clearHighScores() {

localStorage.clear();
scoresPage.textContent = "No scores yet .... go give the quiz a try!";

}


//event listeners
quizHome.addEventListener("click", rtnQuizHome);
clearScore.addEventListener("click", clearHighScores);