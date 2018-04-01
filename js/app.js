//consts
const cardList = document.querySelector('.deck');

let $deck = $('.deck');
let $restart = $('.restart');
let oneVisible = false;
let turnCounter = 0;
let cardOpenArray = [];
let visible_nr;
let cardOne = null;
var lock = false;
let pairLeft = 8; 
let timer;
let stars = 3;

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
		cardListener();
	
	}
}
//Open and check cards
	const cardListener = function(){

		$deck.find('.card').bind('click', function(){

			let $this = $(this);

		    if($this.hasClass('show') || $this.hasClass('match')) {return true;}

			cardOne = $this.addClass('open show');
			cardOpenArray.push(cardOne.html());
		
			if(oneVisible == false){
				//first card
				oneVisible = true;
				visible_nr = cardOpenArray[0];
				lock = false;

			}else{
				//second card
				if(visible_nr == cardOpenArray[1]){
					setTimeout(function() {
					 matchTwooCards();
					},750);
					cardOpenArray.shift();
					cardOpenArray.shift();
					lock = false;
				}
				else
				{
					setTimeout(function() {
					 removeTwooCards();
					},1000);
					cardOpenArray.shift();
					cardOpenArray.shift();
					lock = false;
				}

				turnCounter++;
				$('.score').html('Turn counter: '+ turnCounter);
				oneVisible = false;
			updateMoves();	
			}
		});
		}

function matchTwooCards(){
		$('.show').addClass('match');

		pairLeft--;
		let minutes = $('.minutes').text();
		let seconds = $('.seconds').text();

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

		
	}


function removeTwooCards(){
		$('.show').removeClass('open show');
		$('.show').addClass('match');
		lock = false;
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
      var sec = 0;
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

