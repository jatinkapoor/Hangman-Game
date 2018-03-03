'use-strict'

const words = ['exciting', 'beautiful', 'became', 'eventful', 'actually']
const word = words[Math.floor(Math.random() * words.length)];
let keyPressArray = [];
let wins = 0;
let hasWon = false;
let losses;
let attempts = 10;
console.log(word);

const createPlaceholderForWord = function (word) {
  for (let i = 0; i < word.length; i++) {
    var node = document.createElement("span");
    var textnode = document.createTextNode("  __  ");
    node.appendChild(textnode);
    node.setAttribute("id", `letter${i}`);
    target.appendChild(node);
  }
};

const replacePlaceHolderWithLetter = function (word, event) {

  if (word.includes(event.key)) {
    let arr = [];
    for (let i = 0; i < word.length; i++) {
      if (word[i] === event.key) {
        arr.push(i);
      }
    }

    for (let i = 0; i < arr.length; i++) {
      let element = document.getElementById(`letter${arr[i]}`);
      element.innerHTML = event.key;
    }
  } else {
    attempts = attempts - 1;
  }
};

const keepTrackofLetterUsed = function (event) {
  keyPressArray.push(event.key);
  const keyPressLocation = document.getElementById("keyArray");
  var node = document.createElement("span");
  var textnode = document.createTextNode(event.key);
  node.appendChild(textnode);
  keyPressLocation.appendChild(node);
};

const checkForWin = function (keyPressArray, word) {
  let wordArray = Array.from(word);
  let ret = wordArray.every(val => keyPressArray.indexOf(val) >= 0);
  if (ret === true) {
    wins = wins + 1;
  }
};


createPlaceholderForWord(word);

document.onkeypress = ((event) => {

  if (keyPressArray.length === 0) {
    keepTrackofLetterUsed(event);
    replacePlaceHolderWithLetter(word, event);
    checkForWin(keyPressArray, word);
    console.log(wins)

  } else if (keyPressArray.includes(event.key) === false) {
    keepTrackofLetterUsed(event);
    replacePlaceHolderWithLetter(word, event);
    checkForWin(keyPressArray, word);
    console.log(wins)
  }
});