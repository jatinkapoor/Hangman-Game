'use-strict'

const words = ['exciting', 'beautiful', 'became', 'eventful', 'actually']
let word = words[Math.floor(Math.random() * words.length)];

let winElement = document.getElementById("wins");
let attempsElement = document.getElementById("attempts");
let keyPressArray = [];
let wins = 0;
let hasWon = false;
let losses;
let attempts = 10;
//console.log(word);

const createPlaceholderForWord = function (word) {
  let target = document.getElementById("target");

  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }

  for (let i = 0; i < word.length; i++) {
    var node = document.createElement("span");
    var textnode = document.createTextNode(" _ ");
    node.appendChild(textnode);
    node.setAttribute("id", `letter${i}`);
    target.appendChild(node);
  }

  winElement.innerText = wins;
  attempsElement.innerText = attempts;
};

const replacePlaceHolderWithLetter = function (word, keyPressed) {

  if (word.includes(keyPressed)) {
    let arr = [];
    for (let i = 0; i < word.length; i++) {
      if (word[i] === keyPressed) {
        arr.push(i);
      }
    }
    for (let i = 0; i < arr.length; i++) {
      let element = document.getElementById(`letter${arr[i]}`);
      element.innerHTML = keyPressed;
    }
  } else {
    attempts = attempts - 1;
    attempsElement.innerText = attempts;
  }
};

const keepTrackofLetterUsed = function (keyPressed) {
  keyPressArray.push(keyPressed);
  const keyPressLocation = document.getElementById("keyArray");
  var node = document.createElement("span");
  var textnode = document.createTextNode(keyPressed);
  node.appendChild(textnode);
  keyPressLocation.appendChild(node);
};

const checkForWin = function (keyPressArray, word) {
  let wordArray = Array.from(word);
  let ret = wordArray.every((val) => keyPressArray.indexOf(val) >= 0);
  if (ret === true) {
    let winElement = document.getElementById("wins");
    wins = wins + 1;
    hasWon = true;
  }
};

const reset = function () {
  hasWon = false;
  attempts = 10;
  //console.log("In reset");

  //console.log(keyPressArray);
  while (keyPressArray.length !== 0) {
    keyPressArray.pop();
  }

  //console.log(keyPressArray);
  let target = document.getElementById("keyArray");
  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }
  word = words[Math.floor(Math.random() * words.length)];
  //console.log(word);
  createPlaceholderForWord(word);

}

createPlaceholderForWord(word);

document.onkeypress = ((event) => {

  let keyPressed = event.key.toLowerCase();

  if (attempts === 0) {
    const keyPressLocation = document.getElementById("keyArray");
    keyPressLocation.innerText = "game over !! press 'enter'"
    if (keyPressed === "enter") {
      reset();
    }
  } else {
    if (keyPressArray.length === 0) {
      keepTrackofLetterUsed(keyPressed);
      replacePlaceHolderWithLetter(word, keyPressed);
      checkForWin(keyPressArray, word);
      if (hasWon === true) {
        winElement.innerText = wins;
        reset();
      }

    } else if (keyPressArray.includes(keyPressed) === false) {
      keepTrackofLetterUsed(keyPressed);
      replacePlaceHolderWithLetter(word, keyPressed);
      checkForWin(keyPressArray, word);
      //console.log(wins)
      if (hasWon === true) {
        winElement.innerText = wins;
        reset();
      }
    }
  }
});