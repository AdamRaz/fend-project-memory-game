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

// AR - setGame function creates randomized HTML listing of cards
function setGame() {
    shuffle(cards);
    let cardHtml = '';
    for (const card of cards) {
        cardHtml += `<li class="card"><i class="fa fa-${card}"></i></li>`;
    }
    cardDeck.innerHTML = '';
    cardDeck.innerHTML = cardHtml;
}

// AR - function to declare/start an interval function using global variable gameInterval
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

function updateStars (moveCount) {
    if (moveCount >= 50) {
        starList.innerHTML = oneStar;
        numberStars = 1;
    } else if (moveCount >= 30) {
        starList.innerHTML = twoStars;
        numberStars = 2;
    }
}

// AR - this is the main 'game loop' function, starting the game once a card is clicked, updating move counter, star rating, checking for matching cards.
// AR - this function is only called if a card that is not currently open is clicked.
function showCard(clickEvent) {
    // AR - get element clicked on
    let cardClicked = clickEvent.target;
    if ((cardClicked.classList.contains("card")) && !(cardClicked.classList.contains("open")) ) {
        if ((startGame === 0) && (matchCounter < 8)) {
            // AR - set of interval based timer only once - on initial card click
             timerControl("start");
             startGame = 1;
         }
        moveCounter.innerHTML++;
        let moveCount = moveCounter.innerHTML;
        updateStars(moveCount);
        cardClicked.classList.add("open", "show");
        // AR - get name/type of card by querying the i element
        let cardName = cardClicked.querySelector('i').classList[1];
        checkCard(cardName, cardClicked);
        // below matchCounter check must be here at this point in the code as match Counter is incremented in checkCard function!
    }
}
// AR - interval function adapted from - https://stackoverflow.com/questions/9989285/javascript-countdown-timer-and-display-text

function hideCard(OpenCardElements) {
    OpenCardElements[0].classList.remove("open", "show");
    OpenCardElements[1].classList.remove("open", "show");
}

function lockOpenCards(OpenCardElements) {
    OpenCardElements[0].classList.add("matched");
    OpenCardElements[1].classList.add("matched");
}

function emptyCardInfo () {
    listOpenCards = []; 
    OpenCardElements = [];  //could also set array.length = 0;
}

function endGame () {
    completionScreenMessage.textContent = `You finished in ${seconds} seconds, a rating of ${numberStars} out of 3 stars!`;
    completionScreen.style.cssText = "z-index: 10; min-height: 740px;";
    timerControl("stop");
}

// AR - compare cards once 2 seperate cards have been clicked on, if mathching, lock them in open state (with a 'matched' class). If no match, flip/close the cards.
function checkCard(cardName, cardClicked) {
    listOpenCards.push(cardName);
    OpenCardElements.push(cardClicked);
    if (listOpenCards.length == 2) {
        if (listOpenCards[0] === listOpenCards[1]) {
            // AR - cards match!
            matchCounter++;
            lockOpenCards(OpenCardElements);
            // AR - card info arrays are now emptied
            emptyCardInfo();
            if (matchCounter === 8) {
                endGame();
            }
        } else {
            // AR - timeout function to allow a short delay to look at the cards before they are hidden
            setTimeout(function() {
                hideCard(OpenCardElements);
                emptyCardInfo();
            }, 250) // AR - this timer seems to allow unexpected behaviour when timeout delay is too large ( >= 350ms) or clicks are too fast
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
    emptyCardInfo();
    setGame();
}

cardDeck.addEventListener('click', showCard);
restartButton.addEventListener('click', restartGame)
completeRestart.addEventListener('click', restartGame)
setGame()

// AR - resources used
/*
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
https://css-tricks.com/almanac/properties/t/text-align/
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
*/