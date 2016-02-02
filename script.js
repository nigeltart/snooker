var playerOneScore = 0; //initialise
var playerTwoScore = 0; //initialise
var currentPlayer = 1; //initialise
var lastBall = 99; //initialise - 99 is a dummy value
var redsRemaining = 15;
var ballOn=2; //start the colours sequence with yellow
var playerOneScoreEl = document.getElementById("score-player-one");
var playerTwoScoreEl = document.getElementById("score-player-two");
var buttonEl = document.getElementsByTagName("button")[0];
var  redButton = document.getElementsByTagName("button")[1];
var currentBallPottedEl = document.querySelector(".balls-potted");

currentBallPottedEl.onclick = function(e) {
  var target = e.target; //target is the button
  console.log(target.dataset);
  var dataset = target.dataset;
  var addend = parseInt(dataset.score, 10); //converts text into a base 10 number
  console.log(redButton);
  if (redsRemaining || 1===lastBall){ //before we're on the colours
	  switch (addend) {
		case 0:
		  switchPlayer();
		  break; //miss
		case 1:
		  if (1 == lastBall) { //current ball (addend) and last ball are both red, so foul
			console.log('about to foul');
			addend = foul(addend);
		  }
		  redsRemaining--;
		  if (redsRemaining==0){
			redButton.style.display="none";
			console.log('just hidden red button');
		  }
		  break; //goes to the end of the switch
		case 2: //no 'break' so it follows through to the next case
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
		  if (((lastBall >= 2) && (lastBall <= 7)) || (lastBall == 99)) { //cases 2 to 7 if the last ball was also a colour
			addend = foul(addend); //other player gets points based on the value of the current ball (addend)
		  }
		  break;
	  }
  }
  else{ //potting the colours in order now
		if (addend===ballOn){
			target.style.display="none";
			ballOn++;
		}
		else{ //must be a foul
			addend = foul(addend);
		}
	  
  }
  
  //now augment the current player's score
  if (1 == currentPlayer) {
    playerOneScore += addend;
    console.log(playerOneScore);
  } else { //currentPlayer must be 2
    playerTwoScore += addend;
    console.log(playerTwoScore);
  }
  lastBall = addend; //we've finished the loop, so the current ball (addend) becomes the last ball, ready for the next onclick

  updatePlayerOneScore();
  updatePlayerTwoScore();
}

/*buttonEl.onclick=function(){
	playerOneScore++;
	updatePlayerOneScore();
}
*/

function updatePlayerOneScore() {
  playerOneScoreEl.textContent = playerOneScore;
}

function updatePlayerTwoScore() {
  playerTwoScoreEl.textContent = playerTwoScore;
}

function foul(currentBall) { //returns the number of points a foul is worth - 4, unless a higher value ball has been hit. 
  switchPlayer();
  return Math.max(currentBall, 4);
}

function switchPlayer() {
  currentPlayer = (currentPlayer + 1) % 2;
  lastBall = 99; //a dummy value for the new player's first shot
  highlightCurrentPlayer();
}

function highlightCurrentPlayer(){
	if (1===currentPlayer){
		playerOneScoreEl.style.backgroundColor = "red";
		playerTwoScoreEl.style.backgroundColor = null;
	}
	else{
		playerOneScoreEl.style.backgroundColor = null;  
		playerTwoScoreEl.style.backgroundColor = "red";
	}
}

updatePlayerOneScore();
updatePlayerTwoScore();
highlightCurrentPlayer();