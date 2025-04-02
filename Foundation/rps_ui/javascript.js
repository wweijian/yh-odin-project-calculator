function getComputerChoice() {
  const value = Math.random();
  if (value <= 0.33) return "Rock";
  else if (value <= 0.66) return "Paper";
  else return "Scissors";
}

function toTitleCase(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const winConditions = {
  Rock: "Scissors",
  Paper: "Rock",
  Scissors: "Paper",
};

function decideIfHumanWin(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) return -1;
  return winConditions[humanChoice] === computerChoice ? 1 : 0;
}

let humanScore = 0;
let computerScore = 0;

function updateScores() {
  document.getElementById(
    "score"
  ).textContent = `${humanScore} (Player) vs ${computerScore} (Computer)`;
}

function playRound(humanChoice) {
  if (humanScore === 5 || computerScore === 5) {
    humanScore = 0;
    computerScore = 0;
    document.getElementById("result").textContent = "";
  }

  const titleCase_humanChoice = toTitleCase(humanChoice);
  const computerChoice = getComputerChoice();
  const didHumanWin = decideIfHumanWin(titleCase_humanChoice, computerChoice);

  if (didHumanWin === 1) humanScore += 1;
  else if (didHumanWin === 0) computerScore += 1;

  updateScores();
  if (humanScore === 5)
    document.getElementById("result").textContent = "Winner: Player";
  else if (computerScore === 5)
    document.getElementById("result").textContent = "Winner: Computer";
}

const rockBtn = document.querySelector("#rock-btn");
const paperBtn = document.querySelector("#paper-btn");
const scissorsBtn = document.querySelector("#scissors-btn");

rockBtn.addEventListener("click", () => playRound("Rock"));
paperBtn.addEventListener("click", () => playRound("Paper"));
scissorsBtn.addEventListener("click", () => playRound("Scissors"));

const mainDiv = document.querySelector("#main");
const scoreDiv = document.createElement("div");
const resultDiv = document.createElement("div");

scoreDiv.setAttribute("id", "score");
resultDiv.setAttribute("id", "result");
mainDiv.insertBefore(scoreDiv, rockBtn);
updateScores();
mainDiv.insertBefore(resultDiv, rockBtn);
