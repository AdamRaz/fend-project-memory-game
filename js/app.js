/*
 * Create a list that holds all of your cards
 */
// AR - declaring all main variables and selecting main elements to control
let cards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "bicycle", "bomb", "leaf", "diamond", "paper-plane-o", "anchor", "bolt", "cube", "bicycle", "bomb", "leaf"];
const cardDeck = document.querySelector('.deck');
const moveCounter = document.querySelector('.moves');
const starList = document.querySelector('.stars');
const restartButton = document.querySelector('.restart');
const completionScreen = document.querySelector('.completionScreen');
const completionScreenMessage = document.querySelector('.completionScreenMessage');
const completeRestart = document.querySelector('.completeRestart');
const completeStars = document.querySelector('.completeStars');
const timer = document.querySelector('.timer');
// AR - these HTML star blocks will be used to easily show different star ratings
const threeStars = `<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>`;
const twoStars = `<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star-o"></i></li>`;
const oneStar = `<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star-o"></i></li>
<li><i class="fa fa-star-o"></i></li>`;
let matchCounter = 0;
let startGame = 0;
let numberStars = 3;
// AR - the below arrays will store data about cards the user clicks on
let listOpenCards = [];
let OpenCardElements = [];
let seconds = 0;
// AR - gameInterval is declared here to be a global variable and allow the interval to be easily cleared
let gameInterval = undefined; 
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 // Shuffle function from http://stackoverflow.com/a/2450976
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

// AR - 
function setGame() {
    shuffle(cards);
    let cardHtml = '';
    for (const card of cards) {
        cardHtml += `<li class="card"><i class="fa fa-${card}"></i></li>`;
    }
    cardDeck.innerHTML = '';
    cardDeck.innerHTML = cardHtml;
}

function timerControl (option) {
    if (option === "start") {
        gameInterval = setInterval(function() {
            timer.innerHTML = `time: ${++seconds}s`;
        }, 1000);
    }
    if (option === "stop") {
        clearInterval(gameInterval);
    }
}

function showCard(clickEvent) {
    let cardClicked = clickEvent.target;
    if ((cardClicked.classList.contains("card")) && !(cardClicked.classList.contains("open")) ) {
        moveCounter.innerHTML++;
        let moveCount = moveCounter.innerHTML;
        if (moveCount >= 50) {
            starList.innerHTML = oneStar;
            numberStars = 1;
        } else if (moveCount >= 30) {
            starList.innerHTML = twoStars;
            numberStars = 2;
        }
        cardClicked.classList.add("open", "show");
        let cardName = cardClicked.querySelector('i').classList[1];
        checkCard(cardName, cardClicked);
        // below matchCounter check must be here at this point in the code as match Counter is incremented in checkCard function!
        if ((startGame === 0) && (matchCounter < 8)) {
            timerControl("start");
            startGame = 1;
        }
        if ((matchCounter === 8) && (startGame === 1)) {
            timerControl("stop");
        }
    }
}
// interval function adapted from - https://stackoverflow.com/questions/9989285/javascript-countdown-timer-and-display-text

function hideCard(OpenCardElements) {
    OpenCardElements[0].classList.remove("open", "show");
    OpenCardElements[1].classList.remove("open", "show");
}
function lockOpenCards(OpenCardElements) {
    OpenCardElements[0].classList.add("matched");
    OpenCardElements[1].classList.add("matched");
}

function checkCard(cardName, cardClicked) {
    listOpenCards.push(cardName);
    OpenCardElements.push(cardClicked);
    if (listOpenCards.length == 2) {
        if (listOpenCards[0] === listOpenCards[1]) {
            matchCounter++;
            lockOpenCards(OpenCardElements);
            listOpenCards = []; 
            OpenCardElements = []; //can switch to .length = 0;
            if (matchCounter === 8) {
                completionScreenMessage.textContent = `You finished in ${seconds} seconds, a rating of ${numberStars} out of 3 stars!`;
                completionScreen.style.cssText = "z-index: 10; min-height: 740px;";
            }
        } else {
            setTimeout(function() {
                hideCard(OpenCardElements);
                listOpenCards = []; 
                OpenCardElements = [];
            }, 250) //this timer seems to allow a bug when clicks are too fast
        }
    }
}

function restartGame() {
    matchCounter = 0;
    startGame = 0;
    starList.innerHTML = threeStars;
    moveCounter.innerHTML = 0;
    seconds = 0;
    document.querySelector('.timer').innerHTML = 'time: 0s';
    completionScreen.style.cssText = 'z-index: -10';
    timerControl("stop");
    setGame();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * 
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 * 
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 * 
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
cardDeck.addEventListener('click', showCard);
restartButton.addEventListener('click', restartGame)
completeRestart.addEventListener('click', restartGame)
setGame()

//AR - bug: issue with unreliable interval timer... related to unrealiable clicks?

// resources used
/*
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
https://css-tricks.com/almanac/properties/t/text-align/
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript

*/