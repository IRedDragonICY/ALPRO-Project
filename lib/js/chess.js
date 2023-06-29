
function startGame(mode) {
  function createLabel(text) {
    const label = document.createElement("div");
    label.classList.add("label");
    label.innerHTML = `<span class="label-text">${text}</span>`;
    return label;
  }
  
  function createLabels(labelsArray) {
    const labels = document.createElement("div");
    labels.classList.add("labels");
    labelsArray.forEach(label => labels.appendChild(createLabel(label)));
    return labels;
  }
  
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
  
  function initializeBoard() {
    const container = document.querySelector(".container");
    container.innerHTML = "";
    
    const outerContainer = document.createElement("div");
    outerContainer.classList.add("outer-container");
    
    const board = document.createElement("div");
    board.classList.add("board");
    
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const topLabels = createLabels(letters);
    const bottomLabels = createLabels(letters);
    outerContainer.appendChild(topLabels);
    
    for (let row = 0; row < 8; row++) {
      const rowElement = document.createElement("div");
      rowElement.classList.add("row");
    
      const leftLabel = createLabel(8 - row);
      rowElement.appendChild(leftLabel);
    
      for (let col = 0; col < 8; col++) {
        const square = createSquare(row, col, lightColor, darkColor);
        rowElement.appendChild(square);
      }
    
      const rightLabel = createLabel(8 - row);
      rowElement.appendChild(rightLabel);
    
      board.appendChild(rowElement);
    }
    
    outerContainer.appendChild(board);
    outerContainer.appendChild(bottomLabels);
    
    container.appendChild(outerContainer);
  }
  
  initializeBoard();
  // Add game logic based on the selected mode
  if (mode === "ai") {
    // Add AI game logic
  } else if (mode === "player") {
    // Add player vs player game logic
  }
  
  
  initializeBoard();
    // Add game logic based on the selected mode
    if (mode === "ai") {
      // Add AI game logic
    } else if (mode === "player") {
      // Add player vs player game logic
    }
  }

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