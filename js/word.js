const wordDisplayElement = document.querySelector("#displayWord");
const seenButtonElement = document.querySelector("#seenButton");
const newButtonElement = document.querySelector("#newButton");
const restartButtonElement = document.querySelector("#restartButton");

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function loadWords() {
  const response = await fetch("wordList.txt");
  const text = await response.text();
  const loadedWords = text.split(/\r?\n/).map((w) => w.trim().toLowerCase());
  return loadedWords;
}

function getWord(wordlist, loadedWords, word) {
  const useOldWord = Math.random() < 0.5;
  if (useOldWord && wordlist.length > 2) {
    let chosenWord = wordlist[randomIntFromInterval(0, wordlist.length - 1)];
    while (chosenWord === word) {
      chosenWord = wordlist[randomIntFromInterval(0, wordlist.length - 1)];
    }
    return chosenWord;
  } else {
    return loadedWords[randomIntFromInterval(0, loadedWords.length - 1)];
  }
}

function startRound(wordlist, loadedWords, word) {
  wordDisplayElement.textContent = word;
  wordDisplayElement.style.display = "inline";
  seenButtonElement.style.display = "inline";
  newButtonElement.style.display = "inline";
  restartButtonElement.style.display = "none";
  return wordlist;
}

let failed = false;
let score = 0;
let wordlist = [];

restartButtonElement.style.display = "none";

loadWords().then((loadedWords) => {
  let word = getWord(wordlist, loadedWords, "");
  wordlist = startRound(wordlist, loadedWords, word);

  seenButtonElement.addEventListener("click", () => {
    if (wordlist.includes(word)) {
      score += 1;
      word = getWord(wordlist, loadedWords, word);
      wordlist = startRound(wordlist, loadedWords, word);
    } else {
      failed = true;
      wordDisplayElement.style.display = "inline";
      wordDisplayElement.innerHTML =
        "Game Over, your score is " + score.toString() + "!";
      seenButtonElement.style.display = "none";
      newButtonElement.style.display = "none";
      restartButtonElement.style.display = "inline";
    }
  });

  newButtonElement.addEventListener("click", () => {
    if (!wordlist.includes(word)) {
      score += 1;
      wordlist.push(word);
      word = getWord(wordlist, loadedWords, word);
      wordlist = startRound(wordlist, loadedWords, word);
    } else {
      failed = true;
      wordDisplayElement.style.display = "inline";
      wordDisplayElement.innerHTML =
        "Game Over, your score is " + score.toString() + "!";
      seenButtonElement.style.display = "none";
      newButtonElement.style.display = "none";
      restartButtonElement.style.display = "inline";
    }
  });
  restartButtonElement.addEventListener("click", () => {
    failed = false;
    score = 0;
    wordlist = [];
    word = getWord(wordlist, loadedWords, "");
    wordlist = startRound(wordlist, loadedWords, word);
  });
});
