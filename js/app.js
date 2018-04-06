/*
 * Create a list that holds all of your cards
 */
let cards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "bicycle", "bomb", "leaf", "diamond", "paper-plane-o", "anchor", "bolt", "cube", "bicycle", "bomb", "leaf"];
const cardDeck = document.querySelector('.deck');
const moveCounter = document.querySelector('.moves');
// console.log (cardDeck);


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
let listOpenCards = [];
let OpenCardElements = [];
function showCard(clickEvent) {

    //AR - need to check if card is actually a card - bug!

    // console.log(clickEvent.target);
    let cardClicked = clickEvent.target;
    if (cardClicked.classList.contains("card")) {
        moveCounter.innerHTML++
        cardClicked.classList.add("open", "show");
        // console.log(cardClicked.classList)
        // console.log(cardClicked.innerHTML)
        let cardName = cardClicked.querySelector('i').classList[1];
        // console.log(cardName);
        checkCard(cardName, cardClicked);
        //listOpenCards
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
    console.log(`1st element classes are now: ${OpenCardElements[0].classList}`);

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
    listOpenCards.push(cardName);
    OpenCardElements.push(cardClicked);
    if (listOpenCards.length == 2) {
        if (listOpenCards[0] === listOpenCards[1]) {
            console.log("matching cards!");
            lockOpenCards(OpenCardElements);
            listOpenCards = []; 
            OpenCardElements = []; //can switch to .length = 0;
        } else {
            console.log("no match");
            hideCard(OpenCardElements);
            listOpenCards = []; 
            OpenCardElements = [];
            console.log("card lists cleared");
            console.log(listOpenCards);
            console.log(OpenCardElements);

        }
        // console.log("bingo!");
    }
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

//AR - could lock cards in place by capturing click events on the cards? capture mode versus bubbling?