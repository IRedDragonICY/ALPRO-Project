
function startGame(mode) {
    // Clear the container
    const container = document.querySelector(".container");
    container.innerHTML = "";

    // Create the chessboard
    const board = document.createElement("div");
    board.classList.add("board");

    // Add the exit button
    const exitButton = document.createElement("div");
    exitButton.classList.add("exit");
    exitButton.innerHTML = "Exit";
    exitButton.addEventListener("click", showMenu);
    board.appendChild(exitButton);

    // Create the squares
    const chessboard = [];
    for (let row = 0; row < 8; row++) {
      chessboard[row] = [];
      for (let col = 0; col < 8; col++) {
        const square = document.createElement("div");
        square.classList.add("square");

        // Set the background color for alternating squares
        if ((row + col) % 2 === 0) {
          square.style.backgroundColor = lightColor;
        } else {
          square.style.backgroundColor = darkColor;
        }

        // Add the piece icon to the square
        const piece = getPiece(row, col);
        if (piece !== "") {
          square.innerHTML = `<span class="piece">${piece}</span>`;
        }

        chessboard[row][col] = square;
        board.appendChild(square);
      }
    }

    // Append the board to the container
    container.appendChild(board);

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