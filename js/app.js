//consts
const cardList = document.querySelector('.deck');

let $deck = $('.deck');
let oneVisible = false;
let turnCounter = 0;
let cardOpenArray = [];
let visible_nr;
let cardOne = null;
let cardOpenTempomary = [];
let lock = false;

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
			//cardOnep = this;

		    if($this.hasClass('show') || $this.hasClass('match')) {return true;}

			cardOne = $this.addClass('open show');
			cardOpenArray.push(cardOne);
			//cardOpenTempomary = Array.from(cardOpenArray);
			//cardOpenTempomary.push(cardOne.hasChildElement());

			if(oneVisible == false){
				//first card
				oneVisible = true;
				visible_nr = cardOne;

			}else{
				//second card
				if(visible_nr == cardOne){
					console.log("pair");
					setTimeout(function() {
					 matchTwooCards();
					},750)
				}
				else
				{
					console.log("not");
					setTimeout(function() {
					 removeTwooCards();
					},750)

				}

				turnCounter++;
				$('.score').html('Turn counter: '+ turnCounter);
				oneVisible = false;
			}
				
		});
		}


function matchTwooCards(){
		$('.show').addClass('match');
	}


function removeTwooCards(){
		$('.show').removeClass('open show');
	}


function game(){
	createCards();

}
game();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
