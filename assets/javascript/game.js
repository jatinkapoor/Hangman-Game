'use-strict'

let game = {
  words: ['exciting', 'beautiful', 'became', 'eventful', 'actually',
    'overdone', 'prefect', 'crayers', 'behowl', 'tired', 'empathy', 'unsteeled'
  ],
  word: '',
  winElement: document.getElementById("wins"),
  attempsElement: document.getElementById("attempts"),
  keyPressArray: [],
  keyPressLocation: document.getElementById("keyArray"),
  wins: 0,
  hasWon: false,
  attempts: 10,
  createPlaceholderForWord: (word) => {
    let target = document.getElementById("target");
    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }
    for (let i = 0; i < word.length; i++) {
      let node = document.createElement("span");
      let textnode = document.createTextNode(" _ ");
      node.appendChild(textnode);
      node.setAttribute("id", `letter${i}`);
      target.appendChild(node);
    }
    game.winElement.innerText = game.wins;
    game.attempsElement.innerText = game.attempts;
  },
  replacePlaceHolderWithLetter: (word, keyPressed) => {
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
      game.attempts = game.attempts - 1;
      game.attempsElement.innerText = game.attempts;
    }
  },
  keepTrackofLetterUsed: (keyPressed) => {
    game.keyPressArray.push(keyPressed);
    const keyPressLocation = game.keyPressLocation;
    let node = document.createElement("span");
    let textnode = document.createTextNode(keyPressed);
    node.appendChild(textnode);
    keyPressLocation.appendChild(node);
  },
  checkForWin: (keyPressArray, word) => {
    let wordArray = Array.from(word);
    let ret = wordArray.every((val) => keyPressArray.indexOf(val) >= 0);
    if (ret === true) {
      let winElement = game.winElement;
      game.wins = game.wins + 1;
      game.hasWon = true;
    }
  },
  reset: () => {
    game.hasWon = false;
    game.attempts = 10;
    while (game.keyPressArray.length !== 0) {
      game.keyPressArray.pop();
    }
    let target = document.getElementById("keyArray");
    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }
    let word = game.words[Math.floor(Math.random() * game.words.length)];
    game.word = word;
    game.createPlaceholderForWord(game.word);
  },
  gameFunction: (keyPressed) => {
    game.keepTrackofLetterUsed(keyPressed);
    game.replacePlaceHolderWithLetter(game.word, keyPressed);
    game.checkForWin(game.keyPressArray, game.word);
    if (game.hasWon === true) {
      game.winElement.innerText = game.wins;
      togglePlay();
      game.reset();
    }
  }
}

game.word = game.words[Math.floor(Math.random() * game.words.length)];
game.createPlaceholderForWord(game.word);

document.onkeypress = ((event) => {

  let keyPressed = event.key.toLowerCase();
  if (game.attempts === 0) {
    let keyPressLocation = game.keyPressLocation;
    keyPressLocation.innerText = "Game Over !! Press Enter";
    if (keyPressed === "enter") {
      game.reset();
    }
  } else {
    if (game.keyPressArray.length === 0) {
      game.gameFunction(keyPressed);
    } else if (game.keyPressArray.includes(keyPressed) === false) {
      game.gameFunction(keyPressed);
    }
  }
});

function togglePlay() {
  let audioElement = document.getElementById('audio');
  return audioElement.paused ? audioElement.play() : audioElement.pause();
};