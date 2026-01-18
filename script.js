const chessboard = document.getElementById("chessboard");
const resetBtn = document.getElementById("resetBtn");
const startBtn = document.getElementById("startBtn");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const turnIndicator = document.getElementById("turnIndicator");
const playerModal = document.getElementById("playerModal");

let player1 = "Player 1";
let player2 = "Player 2";
let selected = null;
let turn = "white";

// Chess pieces
const pieces = {
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
  p: "♟",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
  P: "♙",
};

// Starting board
let board = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

// Start game with player names
startBtn.addEventListener("click", () => {
  player1 = player1Input.value || "Player 1";
  player2 = player2Input.value || "Player 2";
  playerModal.style.display = "none";
  updateTurnIndicator();
});

// Reset game
resetBtn.addEventListener("click", () => {
  board = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ];
  turn = "white";
  selected = null;
  updateTurnIndicator();
  createBoard();
  playerModal.style.display = "flex";
});

// Create chessboard
function createBoard() {
  chessboard.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = document.createElement("div");
      square.classList.add("square", (i + j) % 2 === 0 ? "light" : "dark");
      square.dataset.row = i;
      square.dataset.col = j;
      square.textContent = pieces[board[i][j]] || "";
      square.addEventListener("click", () => handleClick(i, j));
      chessboard.appendChild(square);
    }
  }
}

// Handle click
function handleClick(row, col) {
  const piece = board[row][col];
  const isWhite = piece && piece === piece.toUpperCase();
  const isBlack = piece && piece === piece.toLowerCase();

  if (selected) {
    const movingPiece = board[selected.row][selected.col];

    // Check King capture
    const targetPiece = board[row][col];
    if (targetPiece.toLowerCase() === "k") {
      const winner = turn === "white" ? player1 : player2;
      alert(`Game Over! ${winner} wins by capturing the King!`);
      resetBtn.click();
      return;
    }

    board[row][col] = movingPiece;
    board[selected.row][selected.col] = "";
    selected = null;
    turn = turn === "white" ? "black" : "white";
    updateTurnIndicator();
    createBoard();
  } else if (piece) {
    if ((turn === "white" && isWhite) || (turn === "black" && isBlack)) {
      selected = { row, col };
      highlightSquare(row, col);
    }
  }
}

// Highlight selected
function highlightSquare(row, col) {
  createBoard();
  const index = row * 8 + col;
  chessboard.children[index].classList.add("highlight");
}

// Update turn
function updateTurnIndicator() {
  const currentPlayer = turn === "white" ? player1 : player2;
  turnIndicator.textContent = `${currentPlayer}'s Turn (${turn})`;
}

// Initialize board
createBoard();
