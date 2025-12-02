// Load HTML Elements
const sCells = document.querySelectorAll(".cell");
const sGrid = document.querySelector(".sequence-grid");
const sStartBtn = document.getElementById("startBtn");
const sStatus = document.getElementById("status");

// Initialize Variables
let sSequence = [];
let sPlayerIndex = 0;
let sAccepting = false;

// Wait function from stackoverflow:
// https://stackoverflow.com/questions/39538473/using-settimeout-on-promise-chain
function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// Random number function integer in range
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Flash a cell function
function flash(node, ms = 350) {
  node.classList.add("flash");
  return wait(ms).then(() => node.classList.remove("flash"));
}

// Start a new sequence memory game
sStartBtn.addEventListener("click", () => {
  sSequence = [];
  sPlayerIndex = 0;
  sAccepting = false;
  sStatus.textContent = "Watch";
  nextSeqRound();
});

// Add next element to sequence
function nextSeqRound() {
  sPlayerIndex = 0;
  sAccepting = false;
  sSequence.push(randomIntFromInterval(0, 8));
  playSeq();
}

// Show sequence flashing
async function playSeq() {
  sAccepting = false;
  sStatus.textContent = "Watch";

  await wait(400);

  for (let i = 0; i < sSequence.length; i++) {
    const idx = sSequence[i];
    await flash(sCells[idx], 400);
    await wait(180);
  }

  sStatus.textContent = "Repeat";
  await wait(250);

  sAccepting = true;
  sPlayerIndex = 0;
}

// Player clicking logic
function clickSeq(index, node) {
  if (!sAccepting) return;

  // Correct click, flash the cell
  if (index === sSequence[sPlayerIndex]) {
    flash(node, 180);
    sPlayerIndex++;

    // If sequence complete add next element, else display progress
    if (sPlayerIndex === sSequence.length) {
      sAccepting = false;
      sStatus.textContent = "Correct!";
      setTimeout(nextSeqRound, 700);
    } else {
      sStatus.textContent = `${sPlayerIndex}/${sSequence.length}`;
    }

    return;
  }

  // Player presses the wrong cell
  loseSeq();
}

// Lose function
function loseSeq() {
  sAccepting = false;
  sStatus.textContent =
    "Wrong! Game over, your score is " +
    (sSequence.length - 1).toString() +
    "!";

  sCells.forEach((c) => c.classList.add("lost"));
  setTimeout(() => {
    sCells.forEach((c) => c.classList.remove("lost"));
  }, 500);
}

// When a cell is clicked
sGrid.addEventListener("click", (e) => {
  const cell = e.target.closest(".cell");
  if (!cell) return;

  const index = Number(cell.dataset.index);
  clickSeq(index, cell);
});
