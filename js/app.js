//consts
const cardList = document.querySelector('.deck');

let $deck = $('.deck');
let $restart = $('.restart');
let oneVisible = false;
let turnCounter = -1;
let visible_nr;
let cardOne = null;
let pairLeft = 8; 
let timer;
let stars = 3;
let count = 0;
let checkOpened = [];


//card List
let cardArray = [
	'fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o',
	'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt',
	'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf',
	'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb',
]

// Shuffle function 
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Create Cards
function createCards(){
	let cardsShuffleArray = shuffle(cardArray);

	cardList.innerHTML = "";
	for(let i = 0; i < cardsShuffleArray.length; i++){
	    const newCard = document.createElement('li');
		const newIcon = document.createElement('i');
		newCard.cover = cardsShuffleArray[i];
		newCard.classList.add('card');
		newIcon.classList.add('fa', cardsShuffleArray[i]);
		const newCardList = document.querySelector('.deck');
		newCardList.appendChild(newCard);
		newCard.appendChild(newIcon);
		newCard.addEventListener('click', openCards);
	
	}
}
//Open and check cards
	let clickFlag = true;
//need react on clicks or ignore it

function openCards(){
	if(!clickFlag){return;}
	//ignore all click while not true

	this.classList.toggle('show');
	this.classList.toggle('open');
	//push the clicked card to the checkOpened array
	checkOpened.push(this);
	//check if the user open the first card to leave to opened

	this.removeEventListener('click', openCards);
	//remove click event fot 1st and 2nd click 

	if(checkOpened.length == 2){
		//if we have two clicks we need to check them
		clickFlag = false;
		//but first we need to ignore all other clicks with this line
		setTimeout(function(){
			//we need to set timeout because first we need that animation occurred

			if(checkOpened[0].innerHTML === checkOpened[1].innerHTML){
				//start our check
				checkOpened[0].classList.add('match');
				checkOpened[1].classList.add('match');

				let minutes = $('.minutes').text();
				let seconds = $('.seconds').text();

				pairLeft--;

				//finish game
			if(pairLeft == 0){
				clearInterval(timer);
				swal({
					allowEscapeKey: false,
					allowOutsideClick: false,
					title: 'Congratulations! You Won!',
					text: 'Your statistic: \nNumber of tour: ' + turnCounter + '\nTime: ' + minutes + ":" 
					+ seconds + '\nStars: '+ stars,
					type: 'success',
					confirmButtonColor: 'blue',
					button: 'Play again!'
				}).then(function (isConfirm) {
			if (isConfirm) {
				createCards();
				location.reload();
					}
				})
				}
				checkOpened = [];

			}else{
				//if mismatch
				setTimeout(function(){
					checkOpened[0].classList.remove('open');
					checkOpened[1].classList.remove('open');

					checkOpened[0].classList.remove('show');
					checkOpened[1].classList.remove('show');

					checkOpened[0].addEventListener('click',openCards);
					checkOpened[1].addEventListener('click',openCards);
					checkOpened = [];
				}, 0);
			}	
			clickFlag = true;
		}, 750);
		turnCounter++;
			$('.score').html('Turn counter: '+ turnCounter);
			updateMoves();
	}
}

//restart game
$restart.bind('click', function () {
	swal({
  title: "Restart",
  text: "Game gonna be restareted",
  icon: "error",
  button: "Restart",
}).then(function (isConfirm) {
		if (isConfirm) {
			location.reload();
		}
	});
});

//Timer
function startTimer() {
  let moves = 0;
  $(".card").on("click", function() {
    moves += 1;
    if (moves === 1) {
      let sec = 0;
      function time ( val ) { return val > 9 ? val : "0" + val; }
      timer = setInterval( function(){
        $(".seconds").html(time(++sec % 60));
        $(".minutes").html(time(parseInt(sec / 60, 10)));
      }, 1000);
    }
  });
}

function updateMoves(){
if (turnCounter > 0 && turnCounter < 15) {
    stars = stars;
  } else if (turnCounter >= 15 && turnCounter <= 20) {
    $("#starOne").removeClass("fa-star");
    stars = "2";
  } else if (turnCounter > 20) {
    $("#starTwoo").removeClass("fa-star");
    stars = "1";
  	}
  };     


//init function
function game(){
	createCards();
	timer = 0;
	turnCounter = 0;
	startTimer();
}
game();

