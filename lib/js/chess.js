
function startGame(mode) {
/**
 * createExitButton function
 * This function creates an exit button element.
 * When this button is clicked, the showMenu function is called.
 * @returns {HTMLElement} - The created exit button element.
 */
function createExitButton() {
  const exitButton = document.createElement("button");
  exitButton.classList.add("exit-button");
  exitButton.innerHTML = "Exit";
  exitButton.onclick = showMenu;
  return exitButton;
}

/**
 * createLabel function
 * This function creates a label element with the provided text.
 * @param {string} text - The text to be displayed in the label.
 * @returns {HTMLElement} - The created label element.
 */
function createLabel(text) {
  const label = document.createElement("div");
  label.classList.add("label");
  label.innerHTML = `<span class="label-text">${text}</span>`;
  return label;
}

/**
 * createLabels function
 * This function creates a labels container and appends label elements created from the provided array of labels.
 * @param {Array<string>} labelsArray - The array of labels to be created.
 * @returns {HTMLElement} - The created labels container element.
 */
function createLabels(labelsArray) {
  const labels = document.createElement("div");
  labels.classList.add("labels");
  labelsArray.forEach(label => labels.appendChild(createLabel(label)));
  return labels;
}

/**
 * createSquare function
 * This function creates a square element with a background color based on the provided row and column.
 * If a piece exists at the provided row and column, it is also added to the square.
 * @param {number} row - The row of the square.
 * @param {number} col - The column of the square.
 * @param {string} lightColor - The color to be used for light squares.
 * @param {string} darkColor - The color to be used for dark squares.
 * @returns {HTMLElement} - The created square element.
 */
function createSquare(row, col, lightColor, darkColor) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.style.backgroundColor = (row + col) % 2 === 0 ? lightColor : darkColor;
  const piece = getPiece(row, col);
  if (piece !== "") {
    square.innerHTML = `<span class="piece">${piece}</span>`;
  }
  return square;
}

/**
 * initializeBoard function
 * This function initializes the chess board by creating and appending all necessary elements.
 * The board is appended to a container element with the class "container".
 */
function initializeBoard() {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  const outerContainer = document.createElement("div");
  outerContainer.classList.add("outer-container");

  const board = document.createElement("div");
  board.classList.add("board");

  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const topLabels = createLabels(letters);
  const bottomLabels = createLabels(letters);
  outerContainer.appendChild(topLabels);

  const chessboard = {};
  for (let row = 0; row < 8; row++) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    const leftLabel = createLabel(8 - row);
    rowElement.appendChild(leftLabel);

    chessboard[letters[row]] = {};

    for (let col = 0; col < 8; col++) {
      const square = createSquare(row, col, lightColor, darkColor);
      rowElement.appendChild(square);
      const squareName = letters[col] + (8 - row);
      chessboard[letters[row]][(8 - row).toString()] = square;
    }

    const rightLabel = createLabel(8 - row);
    rowElement.appendChild(rightLabel);

    board.appendChild(rowElement);
  }

  outerContainer.appendChild(board);
  outerContainer.appendChild(bottomLabels);

  container.appendChild(outerContainer);

  // Example usage:
  // chessboard['a']['1'].style.backgroundColor = 'red';
  // chessboard['b']['2'].innerHTML = '<span class="piece">&#9823;</span>';
}


// Call the initializeBoard function to create the chess board.
initializeBoard();

const exitButton = createExitButton();
document.querySelector(".container").appendChild(exitButton);

// Global variable to store the dragged piece ID
let draggedPieceId = null;

// Function to handle the drag start event
function handleDragStart(event) {
  // Set the dragged piece ID
  draggedPieceId = event.target.id;
}

// Function to handle the drag over event
function handleDragOver(event) {
  // Prevent the default behavior to enable dropping
  event.preventDefault();
}

// Function to handle the drop event
function handleDrop(event) {
  // Get the square element where the piece is dropped
  const square = event.target;

  // Check if the square already contains a piece
  const hasPiece = square.querySelector(".piece") !== null;

  // Move the piece to the dropped square if it's empty
  if (!hasPiece) {
    square.appendChild(document.getElementById(draggedPieceId));
  }

  // Reset the dragged piece ID
  draggedPieceId = null;

  // Prevent the default behavior
  event.preventDefault();
}

// Function to add drag and drop functionality to the chess pieces
function addDragAndDrop() {
  const pieces = document.querySelectorAll(".piece");

  pieces.forEach(piece => {
    // Set the draggable attribute for each piece
    piece.setAttribute("draggable", true);

    // Add event listeners for drag events
    piece.addEventListener("dragstart", handleDragStart);
  });

  const squares = document.querySelectorAll(".square");

  squares.forEach(square => {
    // Add event listeners for drop and drag over events
    square.addEventListener("dragover", handleDragOver);
    square.addEventListener("drop", handleDrop);
  });
}

// Call the addDragAndDrop function to enable drag and drop functionality
addDragAndDrop();

// Function to get the piece icon based on row and column
function getPiece(row, col) {
  if (row === 1) {
    return "&#9823;"; // Pawn (♙)
  } else if (row === 6) {
    return "&#9817;"; // Pawn (♟)
  }

  if (row === 0 || row === 7) {
    if (col === 0 || col === 7) {
      return "&#9814;"; // Rook (♖)
    } else if (col === 1 || col === 6) {
      return "&#9816;"; // Knight (♘)
    } else if (col === 2 || col === 5) {
      return "&#9815;"; // Bishop (♗)
    } else if (col === 3) {
      return "&#9812;"; // King (♔)
    } else if (col === 4) {
      return "&#9813;"; // Queen (♕)
    }
  }
  return "";
}

  }