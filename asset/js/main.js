const cells = document.querySelectorAll("[data-cell]");
const gameStatus = document.getElementById("gameStatus");
const endGameStatus = document.getElementById("endGameStatus");
const playerOne = "X";
const playerTwo = "O";
let vsCpu = false;
let playerTurn = playerOne;
let random;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


// DEMARRAGE DE LA PARTIE ET REGLES DU JEUX\CONDITION


function playGame(e) {
  console.log(e);
  e.innerHTML = playerTurn;

  if (checkWin(playerTurn)) {
    updateGameStatus("wins" + playerTurn);
    return endGame();
  } else if (checkDraw()) {
    updateGameStatus("draw");
    return endGame();
  }

  updateGameStatus(playerTurn);
  playerTurn == playerOne ? (playerTurn = playerTwo) : (playerTurn = playerOne);
  if (vsCpu == true) {
    cpuTurn();
  }
}



// L'ORDINATEUR CHERCHE UNE CELLULE VIDE POUR JOUER\DECLARE LE GAGNANT

function cpuTurn() {
  random = Math.ceil(Math.random() * 9) - 1;
  while (true) {
    if (document.querySelectorAll(".cell")[random].innerHTML != "") {
      random = Math.ceil(Math.random() * 9) - 1;
    } else {
      document.querySelectorAll(".cell")[random].innerHTML = playerTurn;
      break;
    }
  }
  if (checkWin(playerTurn)) {
    updateGameStatus("wins" + playerTurn);
    return endGame();
  } else if (checkDraw()) {
    updateGameStatus("draw");
    return endGame();
  }
  updateGameStatus(playerTurn);
  playerTurn == playerOne ? (playerTurn = playerTwo) : (playerTurn = playerOne);
}
// VERIFIE LE GAGNANT

function checkWin(playerTurn) {
  return winningPatterns.some((combination) => {
    return combination.every((index) => {
      return cells[index].innerHTML == playerTurn;
    });
  });
}

// A QUI LE TOUR

function checkDraw() {
  return [...cells].every((cell) => {
    return cell.innerHTML == playerOne || cell.innerHTML == playerTwo;
  });
}

// MET A JOUR LE GAMEPLAY

function updateGameStatus(status) {
  let statusText;

  switch (status) {
    case "X":
      statusText = "Player 2 turn (O)";
      break;
    case "O":
      statusText = "Player 1 turn (X)";
      break;
    case "winsX":
      statusText = "Player X WIN !";
      break;
    case "winsO":
      statusText = "Player O WIN !";
      break;
    case "draw":
      statusText = "Equality ! Try Again ";
      break;
  }

  gameStatus.innerHTML = statusText;
  endGameStatus.innerHTML = statusText;
}

// FONCTION QUI NETTOIE LES CELLULES QUAND ON PASSE EN MODE VS ORDI

function clearGrid() {
  let cells = document.querySelectorAll('.cell')
  for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = ""
  }
}

// FONCTION DE FIN DE JEUX

function endGame() {
  document.getElementById("gameEnd").style.display = "block";
}

// BUTTON PLAY AGAIN

function reloadGame() {
  window.location.reload();
}

// NETTOIE LES CELLULES

function gameMode(isCpuGame) {
  clearGrid();

  vsCpu = isCpuGame;
}









