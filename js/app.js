//consts
const cardList = document.querySelector('.deck');

let $deck = $('.deck');
let oneVisible = false;
let turnCounter = 0;
let cardOpenArray = [];
let visible_nr;
let cardOne = null;
let cardOpenTempomary = [];
var lock = false;
let pairLeft = 8; 

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

	const cardListener = function(){

		
		$deck.find('.card').bind('click', function(){

			let $this = $(this);
			//cardOne = this;

		    if($this.hasClass('show') || $this.hasClass('match')) {return true;}

			cardOne = $this.addClass('open show');
			cardOpenArray.push(cardOne.html());
		

			//cardOpenTempomary = Array.from(cardOpenArray);

			if(oneVisible == false){
				//first card
				oneVisible = true;
				visible_nr = cardOpenArray[0];
				lock = false;

			}else{
				//second card
				if(visible_nr == cardOpenArray[1]){
					console.log("pair");
					setTimeout(function() {
					 matchTwooCards();
					},750);
					cardOpenArray.shift();
					cardOpenArray.shift();
					lock = false;
				}
				else
				{
					console.log("not");
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
			}
		});
		}


function matchTwooCards(){
		$('.show').addClass('match');

		pairLeft--;

		if(pairLeft == 0){
			$('.deck').html('<h1>You Win! </br> Done in '+ turnCounter + ' turns </h1>');
		}

		lock = false;
	}


function removeTwooCards(){
		$('.show').removeClass('open show');
		$('.show').addClass('match');
		lock = false;
	}


function game(){
	createCards();

}
game();

