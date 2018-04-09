/*
 * Create a list that holds all of your cards
 */
let cards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "bicycle", "bomb", "leaf", "diamond", "paper-plane-o", "anchor", "bolt", "cube", "bicycle", "bomb", "leaf"];
const cardDeck = document.querySelector('.deck');
const moveCounter = document.querySelector('.moves');
// const completeText = document.querySelector('.complete');
const starList = document.querySelector('.stars');
const restartButton = document.querySelector('.restart');
const completionScreen = document.querySelector('.completionScreen');
const completionScreenMessage = document.querySelector('.completionScreenMessage');
const completeRestart = document.querySelector('.completeRestart');
const completeStars = document.querySelector('.completeStars');
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
// let startTime = 0;
// let endTime = 0;
let startGame = 0;
let numberStars = 3;
// console.log (cardDeck);
starList.innerHTML = threeStars;
let listOpenCards = [];
let OpenCardElements = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let seconds = 0;



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

function setGame() {
    shuffle(cards);

    // AR - following isntrucitons above to create HTML each time... 
    // but could also append to pre-existing list of li class="card" elements?
    let cardHtml = '';
    for (const card of cards) {
        // console.log(`this card is ${card}`);
        cardHtml += `<li class="card"><i class="fa fa-${card}"></i></li>`;
    }
    // console.log(`the card HTML is ${cardHtml}`);
    
    cardDeck.innerHTML = '';
    
    cardDeck.innerHTML = cardHtml;
    // console.log (cardDeck);

}


function showCard(clickEvent) {

    //AR - need to check if card is actually a card - bug!

    // console.log(clickEvent.target);
    let cardClicked = clickEvent.target;
    if ((cardClicked.classList.contains("card")) && !(cardClicked.classList.contains("open")) ) {
        // if (startTime === 0) {
        //     startTime = performance.now().toFixed(0);
        // }
        // console.log(`startGame is ${startGame}`);
        
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
        // console.log(cardClicked.classList)
        // console.log(cardClicked.innerHTML)
        let cardName = cardClicked.querySelector('i').classList[1];
        // console.log(cardName);
        checkCard(cardName, cardClicked);
        console.log(`matchCounter is ${matchCounter}`);
        //listOpenCards
        // below matchCounter check must be here as match Counter is incremented in checkCard function!
        if ((startGame === 0) && (matchCounter < 8)) {
            let interval = setInterval(function() {
                document.querySelector('.timer').innerHTML = `time: ${++seconds}s`;
                // console.log(`time is ${seconds}`);
                // console.log(`startGame is ${startGame}`);
                if ((matchCounter === 8) && (startGame === 1)) {
                    // document.querySelector('.timer').innerHTML = `Your time is ${seconds}`;
                    // console.log(`interval cleared`);
                    clearInterval(interval);
                    
                    // startGame = 0;
                    // AR move the clear interval to one 'endgame function'
                    // ref - https://stackoverflow.com/questions/9989285/javascript-countdown-timer-and-display-text
                }
            }, 1000);
            startGame = 1;
        }
        

    }
}

function hideCard(OpenCardElements) {
    // console.log(clickEvent.target);
    OpenCardElements[0].classList.remove("open", "show");
    OpenCardElements[1].classList.remove("open", "show");
}
function lockOpenCards(OpenCardElements) {
    //lock somehow
    OpenCardElements[0].classList.add("matched");
    OpenCardElements[1].classList.add("matched");
    // console.log(`1st element classes are now: ${OpenCardElements[0].classList}`);

    // //reset list
    // OpenCardElements = [];
    // listOpenCards = []; 
    // console.log("card list cleared");
    // console.log(listOpenCards);
    // console.log(OpenCardElements);
    //ref - https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
}

function checkCard(cardName, cardClicked) {
    console.log(cardName);

    // console.log(`start time is ${startTime}, end time is ${endTime}`)
    listOpenCards.push(cardName);
    OpenCardElements.push(cardClicked);
    if (listOpenCards.length == 2) {
        if (listOpenCards[0] === listOpenCards[1]) {
            // console.log("matching cards!");
            matchCounter++;
            lockOpenCards(OpenCardElements);
            listOpenCards = []; 
            OpenCardElements = []; //can switch to .length = 0;
            if (matchCounter === 8) {
                // if (endTime === 0) { //AR - unecessary... check?
                //     endTime = performance.now().toFixed(0);
                // }
                // let finishTime = ((endTime - startTime) / 1000).toFixed(1);
                // completeText.textContent = `Well done! Completed in ${finishTime}s and `;
                completionScreenMessage.textContent = `You finished in ${seconds} seconds, a rating of ${numberStars} out of 3 stars!`;
                // let cloneStars = starList.cloneNode(true);
                // completeStars.appendChild(cloneStars);
                // completionScreen.style.cssText = "min-height: 720px;";
                completionScreen.style.cssText = "z-index: 10; min-height: 740px;";
                // AR - should also stop the timer
            }
        } else {
            setTimeout(function() {
                // console.log("no match");
                hideCard(OpenCardElements);
                listOpenCards = []; 
                OpenCardElements = [];
                // console.log("card lists cleared");
                // console.log(listOpenCards);
                // console.log(OpenCardElements);
            }, 250) //this timer seems to allow a bug when clicks are too fast


        }
        // console.log("bingo!");
    }
}

function restartGame() {
    matchCounter = 0;
    // startTime = 0;
    // endTime = 0;
    startGame = 0;
    starList.innerHTML = threeStars;
    moveCounter.innerHTML = 0;
    seconds = 0;
    // completeText.textContent = '';
    document.querySelector('.timer').innerHTML = 'time: 0s';
    completionScreen.style.cssText = 'z-index: -10';
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


*/