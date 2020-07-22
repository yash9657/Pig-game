/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
/*3 CHALLENGES
1.A player looses his entire score if he rolls two 6 in a row.After that its the next players turn.
2.Add an input field to the HTML where players can set the winning score,so that they can change the 
predefined score of 100
3.Add another dice to the game, so that there are two dices now. The player looses his current score
when one of them is 1.

*/
var scores, roundScore, activePlayer, gamePlaying;
gamePlaying = true;
init();
var lastDice;

//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";

//var x = document.querySelector("#score-0").textContent;


document.querySelector('.dice').style.display = 'none';

document.getElementById("score-0").textContent = '0';
document.getElementById("score-1").textContent = '0';
document.getElementById("current-0").textContent = '0';
document.getElementById("current-1").textContent = '0';



document.querySelector('.btn-roll').addEventListener('click',function() {
	if(gamePlaying) {
		//1.Random no.
	var dice = Math.floor(Math.random() * 6) + 1;

	//2.Display result
	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = "block";
	diceDOM.src = 'dice-' + dice + '.png';

	//3.update the round score IF the rolled number was not  = 1
	if (dice === 6 && lastDice === 6) {
		//player looses score
		scores[activePlayer] = 0;
		document.querySelector("#score-" + activePlayer).textContent = 0;
	}
	else if (dice !== 1) {
		//add score
		roundScore += dice;
		document.querySelector("#current-" + activePlayer).textContent = roundScore;

	} else {
		//next player
		nextPlayer();
	}
	lastDice = dice;
	}
	
});

document.querySelector('.btn-hold').addEventListener('click',function() {
	if(gamePlaying) {
		//add current score to players global score
	scores[activePlayer] += roundScore;

	//update the UI
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
	//check if player won the game
	if (scores[activePlayer] >= 30) {
		document.querySelector("#name-"+ activePlayer).textContent = 'WINNER!';
		document.querySelector(".dice").style.display = "none";
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		gamePlaying = false;
	} else {
		//next player
		nextPlayer();
	}
	}
	
	
});

function nextPlayer() {
	//next player
	    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;


		document.getElementById("current-0").textContent = '0';
		document.getElementById("current-1").textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		//document.querySelector('.player-0-panel').classList.remove('active');
		//document.querySelector('.player-1-panel').classList.add('active');

		document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click',init);

function init() {
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;


	document.querySelector('.dice').style.display = 'none';

	document.getElementById("score-0").textContent = '0';
	document.getElementById("score-1").textContent = '0';
	document.getElementById("current-0").textContent = '0';
	document.getElementById("current-1").textContent = '0';
	document.getElementById("name-0").textContent = 'Player 1';
	document.getElementById("name-1").textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');


}