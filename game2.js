// Alert for game

    // alert("The battle is about to begin!");
    // var confidenceLevel = confirm("Are you sure you are prepared to lose?");
  
var choices = ["paper", "rock", "scissors"];
var i = Math.floor(Math.random() * 3);
var ComputerChoice = choices[i];
var UserPoints = 0;
var ComputerPoints = 0;
function score(){
    var score_div = document.getElementById("score").innerHTML = UserPoints + " - " + ComputerPoints;

}
setInterval(score, 50);

// User selection in order to select rock paper or scissors (SCRAPPED)
const selectionButtons = document.querySelectorAll('[data-selection]')

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        makeSelection(selectionName)
        })
    })

    function makeSelection(selection) {
        console.log(selection)
    }

// Computer random value (opponent)



//Outcome, basically how the score adds up and when do u win?// conditional if statement



//if time a replay button