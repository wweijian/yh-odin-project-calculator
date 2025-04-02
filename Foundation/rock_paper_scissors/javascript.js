function getComputerChoice() {
  const value = Math.random();
  if (value <= 0.33) return "Rock";
  else if (value <= 0.66) return "Paper";
  else return "Scissors";
}

function getHumanChoice() {
  const choice = parseInt(
    prompt("Please enter your choice:\n0: rock\n1: paper\n2: scissors")
  );
  if (choice === 0) return "rock";
  else if (choice === 1) return "paper";
  else if (choice === 2) return "scissors";
  else return "Invalid";
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

function playRound(humanChoice, computerChoice) {
  const titleCase_humanChoice = toTitleCase(humanChoice);
  const titleCase_computerChoice = toTitleCase(computerChoice);
  const didHumanWin = decideIfHumanWin(
    titleCase_humanChoice,
    titleCase_computerChoice
  );
  if (didHumanWin === 1) {
    humanScore += 1;
    console.log(
      `You win! ${titleCase_humanChoice} beats ${titleCase_computerChoice}`
    );
  } else if (didHumanWin === 0) {
    computerScore += 1;
    console.log(
      `You lose! ${titleCase_computerChoice} beats ${titleCase_humanChoice}`
    );
  } else
    console.log(
      `Draw! ${titleCase_computerChoice} and ${titleCase_humanChoice}`
    );
}

function playGame() {
  for (let index = 0; index < 5; index++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
  }
  console.log(
    `Final score: ${humanScore} (Human) vs ${computerScore} (Computer)`
  );
}

playGame();
