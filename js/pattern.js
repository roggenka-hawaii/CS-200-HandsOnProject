// Load HTML Elements
const pCells = document.querySelectorAll(".cell");
const pWrapper = document.getElementById("patternGridWrapper");
const patternStartBtn = document.getElementById("patternStartBtn");
const patternStatus = document.getElementById("patternStatus");

// Initialize Variables
let pattern = [];
let playerPattern = [];
let patternAccepting = false;
let score = 0;

// Wait function from stackoverflow:
// https://stackoverflow.com/questions/39538473/using-settimeout-on-promise-chain
function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// Random number function integer in range
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Start a new pattern memory game
patternStartBtn.addEventListener("click", () => {
  pattern = [];
  patternStatus.textContent = "Watch";
  score = 0;
  nextPatternRound();
});

// Generate next pattern step
function nextPatternRound() {
  playerPattern = [];
  patternAccepting = false;
  pWrapper.classList.add("no-hover");

  // Add between 5 and 10 squares
  let newSquares = randomIntFromInterval(5, 10);
  let roundPattern = [];

  // Add square index to list, if already there skip
  while (roundPattern.length < newSquares) {
    let index = randomIntFromInterval(0, 15);
    if (!roundPattern.includes(index)) {
      roundPattern.push(index);
    }
  }

  pattern = roundPattern;
  showPattern(pattern);
}

async function showPattern(patternArray) {
  // Flash all squares in the pattern at the same time
  patternArray.forEach((i) => {
    pCells[i].classList.add("flash");
  });

  await wait(900);

  patternArray.forEach((i) => {
    pCells[i].classList.remove("flash");
  });

  await wait(200);

  // Let the player input pattern
  patternAccepting = true;
  pWrapper.classList.remove("no-hover");
  patternStatus.textContent = "Repeat";
}

// Happens when a cell is clicked and allowed ot be
pCells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!patternAccepting) return;

    const index = Number(cell.dataset.index);

    // Ignore if already selected
    if (cell.classList.contains("pattern-selected")) {
      return;
    }

    // Permanently highlight the selected cells
    cell.classList.add("pattern-selected");
    playerPattern.push(index);

    // Player presses a wrong square
    if (!pattern.includes(index)) {
      patternStatus.textContent =
        "Wrong! Game over, your score is " + score.toString() + "!";
      patternAccepting = false;
      pWrapper.classList.add("no-hover");

      // Clear selected cells back to normal color after 1 second
      setTimeout(() => {
        pCells.forEach((c) => c.classList.remove("pattern-selected"));
      }, 1000);

      return;
    }

    // Complete correct pattern
    if (playerPattern.length === pattern.length) {
      patternStatus.textContent = "Correct! Watch";
      patternAccepting = false;
      pWrapper.classList.add("no-hover");

      // Clear selected cells back to normal color before next pattern
      setTimeout(() => {
        pCells.forEach((c) => c.classList.remove("pattern-selected"));
      }, 800);

      setTimeout(nextPatternRound, 1000);

      // Update score
      score++;
    }
  });
});
