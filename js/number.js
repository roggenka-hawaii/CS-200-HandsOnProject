const numberDisplayElement = document.querySelector("#displayNumber");
const readyButtonElement = document.querySelector("#readyButton");
const inputFieldElement = document.querySelector("#inputField");
const inputButtonElement = document.querySelector("#inputButton");
const restartButtonElement = document.querySelector("#restartButton");

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function startRound(numberLength, number, upperBound, lowerBound) {
  upperBound = 10 ** numberLength - 1;
  lowerBound = 10 ** (numberLength - 1);
  number = randomIntFromInterval(lowerBound, upperBound);
  numberDisplayElement.innerHTML = number;
  inputFieldElement.value = "";
  numberDisplayElement.style.display = "inline";
  readyButtonElement.style.display = "inline";
  inputFieldElement.style.display = "none";
  inputButtonElement.style.display = "none";
  restartButtonElement.style.display = "none";
  return number;
}

let failed = false;
let numberLength = 1;
let number = 0;
let upperBound = 0;
let inputtedNumber = 0;
let lowerBound = 1;

restartButtonElement.style.display = "none";
number = startRound(numberLength, number, upperBound, lowerBound);

readyButtonElement.addEventListener("click", () => {
  numberLength = numberLength + 1;
  numberDisplayElement.style.display = "none";
  readyButtonElement.style.display = "none";
  inputFieldElement.style.display = "inline";
  inputButtonElement.style.display = "inline";
});

inputButtonElement.addEventListener("click", () => {
  inputtedNumber = inputFieldElement.value;
  if (inputtedNumber === number.toString()) {
    number = startRound(numberLength, number, upperBound, lowerBound);
    inputFieldElement.value = "";
    numberDisplayElement.style.display = "inline";
    readyButtonElement.style.display = "inline";
    inputFieldElement.style.display = "none";
    inputButtonElement.style.display = "none";
  } else {
    failed = true;
    numberDisplayElement.style.display = "inline";
    numberDisplayElement.innerHTML =
      "Game Over, your score is " + (numberLength - 2).toString();
    readyButtonElement.style.display = "none";
    inputFieldElement.style.display = "none";
    inputButtonElement.style.display = "none";
    restartButtonElement.style.display = "inline";
  }
});

restartButtonElement.addEventListener("click", () => {
  failed = false;
  numberLength = 1;
  number = 0;
  upperBound = 0;
  inputtedNumber = 0;
  number = startRound(numberLength, number, upperBound, lowerBound);
});
