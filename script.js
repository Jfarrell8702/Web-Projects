//audio script for interstellar music

var audio = document.getElementById("audio-player");
audio.volume = 0.7; // set the volume to 0.03
audio.play(); // start playing the audio

// Select the timer element from the DOM
const timerEl = document.getElementById('timer');

// Set the initial time
let time = 0;

// Create a function to update the timer every second
function updateTimer() {
  time++;


  // Calculate the minutes and seconds
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // Format the time string (add leading zeros if necessary)
  const timeStr = `${minutes.toString().padStart(2,
    '0')}:${seconds.toString().padStart(2, '0')}`;

  // Update the timer element with the new time
  timerEl.textContent = timeStr;
}

// Call the updateTimer function every second using setInterval
let intervalId = setInterval(updateTimer, 1000);


function createNewCard() {
  /* Step 1: Create a new div element and assign it to a variable called cardElement. */
  let cardElement = document.createElement('div');

  /* Step 2: Add the "card" class to the variable 'cardElement' from the previous step. */
  cardElement.classList.add('card');

  //***COMMENT OUT CODESTRIP BELOW TO PASS createCardsTest()***
  cardElement.classList.add('card-border');


  /* Step 3: Write the HTML for the children of the card element (card-down and card-up) as a normal string and assign it as the innerHTML of cardElement. */

  // define the HTML for the card-down and card-up elements as strings
  const cardDownHTML = '<div class="card-down"><h2>Card Down</h2></div>';
  const cardUpHTML = '<div class="card-up"><h2>Card Up</h2></div>';

  cardElement.innerHTML = cardDownHTML + cardUpHTML;


  /* Step 4: Return the cardElement. */
  return cardElement;

}
createNewCardTest();


function appendNewCard(parentElement) {
  /* Step 1: Create a new card by calling createNewCard() and assign it to a variable named cardElement. */
  let cardElement = createNewCard();

  /* Step 2: Append the card element to the parentElement (making the card element a "child").  */
  parentElement.appendChild(cardElement);

  /* Step 3: Return the card element. */
  return cardElement;

}
appendNewCardTest();


function shuffleCardImageClasses() {
  /* Step 1: Create a new array that contains two of each image class string in order (e.g. "image-1", "image-1", "image-2", "image-2"...). Store the array in a variable called 'cardClasses'.  */
  // let imageArray = ['image-1, image-1, image-2, image-2, image-3, image-3, image-4, image-4, image-5, image-5, image-6, image-6'];
  let cardArray = ['image-1', 'image-1', 'image-2', 'image-2', 'image-3', 'image-3', 'image-4', 'image-4', 'image-5', 'image-5', 'image-6', 'image-6'];

  /* Step 2: We're going to use a library to randomly "shuffle" the array we created. The library is called "underscore.js" because it uses an "_" character as an object to contain helper methods. Load underscore.js in your HTML via the CDN then open up the documentation linked below to learn how to use the 'shuffle' method.  
      
  CDN: https://cdnjs.com/libraries/underscore.js/1.4.1
  Shuffle: https://www.tutorialspoint.com/underscorejs/underscorejs_shuffle.htm 
  NOTE: Ignore the "require" syntax shown in the documentation as this is for non-browser environments. The '_' variable will already be available to you from loading the CDN. */
  let shuffleArray = _.shuffle(cardArray);
  cardArray = shuffleArray;

  /* Step 3: Return the shuffled array of class names. */
  return cardArray;
}
shuffleCardImageClassesTest();


function createCards(parentElement, shuffledImageClasses) {
  /* Step 1: Make an empty array to hold our card objects. */
  let cardObjects = [];

  /* Step 2: Write a for loop that loops 12 times to create the 12 cards we need. */
  for (let i = 0; i < 12; i++) {

    /* Step 2(a): Use appendNewCard to create/append a new card and store the result in a variable. */
    let newCard = appendNewCard(parentElement);

    /* Step 2(b): Add an image class to the new card element using shuffledImageClasses[i]. */
    newCard.classList.add(shuffledImageClasses[i]);

    /* Step 2(c): Append a new object to the card object array. The object should contain the following properties:
    "index" -- Which iteration of the loop this is.
    "element" -- The DOM element for the card.
    "imageClass" -- The string of the image class on the card. */
    let cardObject = {
      index: i,
      element: newCard,
      imageClass: shuffledImageClasses[i]
    };
    cardObjects.push(cardObject);
  }
  return cardObjects;
}

createCardsTest();


function doCardsMatch(cardObject1, cardObject2) {
  /* Step 1: Determine if two cards match. Remember the properties of our card objects from the createCards() function: index, element, and imageClass. */


  /* Step 2: Compare the imageClass property on each card element. */
  if (cardObject1.imageClass === cardObject2.imageClass) {
    return true;
  } else {
    return false;
  }
}

doCardsMatchTest();


/* The 'counters' object below is used as a dictionary to store our counter names and their respective values. Do you remember using objects as dictionaries? If not, go back to that video lesson in HQ to review. This object is empty for now but we'll fill it up in the following function. */
let counters = {};


function incrementCounter(counterName, parentElement) {
  /* Step 1: If the 'counterName' property is not defined in the 'counters' object, initialize it with a value of 0. */
  if (counters[counterName] === undefined) {
    counters[counterName] = 0;
  }

  /* Step 2: Increment the counter for 'counterName'. */
  counters[counterName]++;

  /* Step 3: Change the HTML within 'parentElement' to display the new counter value. */

  parentElement.innerHTML = counters[counterName];
}


incrementCounterTest();

/* The 'onCardFlipped' function below will be called each time the user flips a card. The 'lastCardFlipped' variable is used to remember the first card flipped while we wait for the user to flip another card. We need to keep track of this value to determine if the two cards flipped match or not. 'lastCardFlipped' should be reset to 'null' each time a second card is flipped. */
let lastCardFlipped = null;


function onCardFlipped(newlyFlippedCard) {
  /* Step 1: Use the 'incrementCounter' function to add one to the flip counter UI.  */
  incrementCounter('flips', document.getElementById('flip-count'));


  /* Step 2: If 'lastCardFlipped' is null (this is the first card flipped), update 'lastCardFlipped' and return (nothing else to do) */
  if (lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }

  /* If the above condition was not met, we know there are two cards flipped that should be stored in 'lastCardFlipped' and 'newlyFlippedCard', respectively. */
  let startCard = lastCardFlipped;
  let newCard = newlyFlippedCard;

  /* Step 3: If the cards don't match, remove the "flipped" class from each, reset 'lastCardFlipped' to null, and use a 'return' to exit the function. Remember that newlyFlippedCard and lastCardFlipped are both objects made with the createCards function. This means that, to access each card's classList, you must access the card object's .element property first!  */
  if (!doCardsMatch(startCard, newCard)) {
    newlyFlippedCard.element.classList.remove('flipped');
    lastCardFlipped.element.classList.remove('flipped');
    lastCardFlipped = null;
    return;
  }


  /* Step 4: Now we have two matching cards. Increment the match counter and optionally add a "glow" effect to the matching cards. */
  incrementCounter('matches', document.getElementById('match-count'));
  matchAudio.play();
  lastCardFlipped.element.classList.remove('card-border');
  newlyFlippedCard.element.classList.remove('card-border');
  lastCardFlipped.element.classList.add('match-border');
  newlyFlippedCard.element.classList.add('match-border');

  /* Step 5: Play either the win audio or match audio based on whether the user has the number of matches needed to win. Both sounds have been loaded in provided.js as matchAudio and winAudio, respectively. */
  if (counters['matches'] === 6) {
    winAudio.play();
    clearInterval(intervalId);
    setTimeout(resetGame, 5000); //resets game 5 seconds after win;

  }
  else {
    clickAudio.play(); //plays click audio every click unless win
  }


  /* Step 6: Reset 'lastCardFlipped' to null */
  lastCardFlipped = null;

}

//tracking best score
function trackLowScore() {
  // Get the current score and low score from the DOM
  var currentScore = parseInt(document.getElementById('flip-count').innerHTML);
  var lowScore = parseInt(localStorage.getItem('lowScore'));

  // Check that currentScore is a valid integer
  if (isNaN(currentScore)) {
    console.error('Invalid current score:', currentScore);
    return;
  }

  // Check that lowScore is a valid integer
  if (isNaN(lowScore)) {
    console.warn('No previous low score found');
  }

  // Update the low score if necessary and save it to local storage
  if (isNaN(lowScore) || currentScore < lowScore) {
    lowScore = currentScore;
    localStorage.setItem('lowScore', lowScore);
  }

  // Update the score element in the DOM with the low score
  document.getElementById('score-count').innerHTML = lowScore;
}




// Select the element to animate
const celebrateEl = document.getElementById('celebrate');

// Create a function to trigger the celebration animation
function celebrate() {
  // Add the 'celebrate' class to the element
  celebrateEl.classList.add('celebrate');

  // Remove the 'celebrate' class after the animation finishes
  setTimeout(() => {
    celebrateEl.classList.remove('celebrate');
  }, 3000);
}


/* This function should remove all children from the #card-container, reset the flip and match counts displayed in the HTML, reset the counters dictionary to an empty object, reset lastCardFlipped to null, and set up a new game. */
function resetGame() {
  /* Step 1: Get the card container by its id and store it in a variable. */

  trackLowScore();


  let cardCon = document.getElementById('card-container');

  /* Step 2: Clear all the cards by using a while loop to remove the first child of the card container as long as a first child exists.
  See "To remove all children from an element:" in the Examples section of the MDN removeChild documentation -> https://mzl.la/3bklFxP */
  while (cardCon.firstChild) {
    cardCon.removeChild(cardCon.firstChild);
  }

  /* Step 3: Get the HTML elements that display the flip and match counts and reset their inner text to 0. */
  var flipCount = document.getElementById('flip-count');
  var matchCount = document.getElementById('match-count');
  flipCount.innerText = '0';
  matchCount.innerText = '0';

  /* Step 4: Reassign the `counters` dictionary that stores our counter names and their values to be an empty object  */
  counters = {};

  /* Step 5: Set lastCardFlipped back to null. */
  lastCardFlipped = null;

  // Reset the time
  time = 0;

  // Update the timer element with the new time
  timerEl.textContent = '00:00';

  // Call the updateTimer function every second using setInterval


  /* Step 6: Set up a new game. */
  setUpGame();


}

setUpGame();