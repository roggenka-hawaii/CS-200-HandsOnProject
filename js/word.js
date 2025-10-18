const wordDisplayElement = document.querySelector("#displayWord");
const seenButtonElement = document.querySelector("#seenButton");
const newButtonElement = document.querySelector("#newButton");
const restartButtonElement = document.querySelector("#restartButton");

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getWord(wordlist) {}

function startRound(word, wordlist) {
  word = getWord(wordlist);
  wordDisplayElement.innerHTML = word;
  wordDisplayElement.style.display = "inline";
  seenButtonElement.style.display = "inline";
  newButtonElement.style.display = "inline";
  restartButtonElement.style.display = "none";
  wordlist.push(word);
  return wordlist;
}

let failed = false;
let word = "hello";
let score = 0;
let wordlist = [];

restartButtonElement.style.display = "none";
wordlist = startRound(word, wordlist);

seenButtonElement.addEventListener("click", () => {});
