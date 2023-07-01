function startGame(mode) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  showBoard();
  const exitButton = createExitButton();
  document.querySelector(".container").appendChild(exitButton);

function createExitButton() {
  const exitButton = document.createElement("button");
  exitButton.classList.add("exit-button");
  exitButton.innerHTML = "Exit";
  exitButton.onclick = showMenu;
  return exitButton;
}
function showBoard() {
  const container = document.querySelector(".container");

  container.innerHTML = `

    <div class="box">
      <div id="board" class="board";"></div>
      <div class="info" ;">
        Search depth:
        <select id="search-depth">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3" selected>3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br>
        <span>Positions evaluated: <span id="position-count"></span></span>
        <br>
        <span>Time: <span id="time"></span></span>
        <br>
        <span>Positions/s: <span id="positions-per-s"></span> </span>
        <br>
        <br>
        <div id="move-history" class="move-history">
        </div>
      </div>

    </div>

  `;
}

/*
    AI Chess created by:
    Mohammad Farid Hendianto : 2200018401
    Rendie Abdi Saputra : 2200018094
    using alpha-beta pruning algorithm
*/

/**
 * Generates a pseudo-random number using the XORShift algorithm.
 * The generated number has a period of 2^32 - 1.
 * 
 * @returns {number} The generated pseudo-random number.
 */
function rand() {
  let seed = Date.now(); 
seed ^= seed << 13;
seed ^= seed >> 17;
seed ^= seed << 5;
return Math.abs(seed);
}

/**
* Shuffles an array in place using the Fisher-Yates algorithm.
* 
* @param {Array} array - The array to be shuffled.
*/
function shuffle(array) {
const shuffledArray = [...array];
let currentIndex = shuffledArray.length;

while (currentIndex !== 0) {
  const randomIndex = rand() % currentIndex;
  currentIndex--;

  [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
    shuffledArray[randomIndex],
    shuffledArray[currentIndex],
  ];
}

return shuffledArray;
}


/**
* Sorts an array in ascending order using the Quick Sort algorithm.
*
* @param {Array} array - The array to be sorted.
* @returns {Array} The sorted array in ascending order.
*/
function quickSort(array) {
if (array.length <= 1) {
  return array;
}

const pivot = array[0];
const smaller = [];
const equal = [];
const greater = [];

for (let element of array) {
  if (element < pivot) {
    smaller.push(element);
  } else if (element > pivot) {
    greater.push(element);
  } else {
    equal.push(element);
  }
}

return [...quickSort(smaller), ...equal, ...quickSort(greater)];
}


/**
* Reverses the elements of an array.
*
* @param {Array} array - The array to be reversed.
* @returns {Array} A new array with the elements in reverse order.
*/
var reverseArray = function(array) {
  var reversedArray = [];
  for (var i = array.length - 1; i >= 0; i--) {
    reversedArray.push(array[i]);
  }
  return reversedArray;
};

/**
* Returns the maximum value between two numbers.
*
* @param {number} a - The first number.
* @param {number} b - The second number.
* @returns {number} The maximum value between a and b.
*/
function max(a, b) {
  return a > b ? a : b;
}

/**
* Returns the minimum value between two numbers.
*
* @param {number} a - The first number.
* @param {number} b - The second number.
* @returns {number} The minimum value between a and b.
*/
function min(a, b) {
  return a < b ? a : b;
}



/**
* Performs the Alpha-Beta Pruning algorithm to determine the best move in a game.
*
* The `alphaBetaRoot` function is the entry point for the Alpha-Beta Pruning algorithm.
* It explores the game tree up to a certain depth, considering all possible moves for the current player.
* The algorithm uses the `alphaBeta` function to recursively evaluate positions and prune branches
* that are determined to be suboptimal based on alpha-beta bounds.
*
* @param {number} depth - The current depth of the search.
* @param {object} game - The game object representing the current state.
* @param {boolean} isMaximisingPlayer - Indicates if it's the maximising player's turn.
* @returns {object} The best move found based on the Alpha-Beta Pruning algorithm.
*/
var alphaBetaRoot = function(depth, game, isMaximisingPlayer) {

  var newGameMoves = game.ugly_moves();
  var bestScore = isMaximisingPlayer ? -Infinity : Infinity;
  var bestMoveFound;
  
  newGameMoves = shuffle(newGameMoves);

  for(var i = 0; i < newGameMoves.length; i++) {
      var newGameMove = newGameMoves[i]
      game.ugly_move(newGameMove);
      var score = alphaBeta(depth - 1, game, -Infinity, Infinity, !isMaximisingPlayer);
      game.undo();
      if(isMaximisingPlayer ? score > bestScore : score < bestScore) {
          bestScore = score;
          bestMoveFound = newGameMove;
      }
  }
  return bestMoveFound;
};

/**
* Performs the Alpha-Beta Pruning algorithm, which is a searching algorithm,
* to determine the best move in a game.
*
* The `alphaBeta` function is a recursive function that evaluates positions in the game tree.
* It uses the Alpha-Beta Pruning technique to efficiently search through the possible moves
* and prune branches that are determined to be suboptimal based on alpha-beta bounds.
* The function considers the current depth, the game state, and the maximizing/minimizing player
* to determine the best score for the current position.
*
* @param {number} depth - The current depth of the search.
* @param {object} game - The game object representing the current state.
* @param {number} alpha - The current alpha value.
* @param {number} beta - The current beta value.
* @param {boolean} isMaximisingPlayer - Indicates if it's the maximizing player's turn.
* @returns {number} The best score for the current position.
*/
var alphaBeta = function(depth, game, alpha, beta, isMaximisingPlayer) {
  positionCount++;

  if (depth === 0) {
    return -evaluateBoard(game.board());
  }

  var newGameMoves = game.ugly_moves();

  newGameMoves = shuffle(newGameMoves);

  if (isMaximisingPlayer) {
    var bestScore = -Infinity;

    for (var i = 0; i < newGameMoves.length; i++) {
      game.ugly_move(newGameMoves[i]);
      bestScore = max(bestScore, alphaBeta(depth - 1, game, alpha, beta, !isMaximisingPlayer));
      game.undo();
      alpha = max(alpha, bestScore);

      if (beta <= alpha) {
        break;
      }
    }

    return bestScore;
  } else {
    var bestScore = Infinity;

    for (var i = 0; i < newGameMoves.length; i++) {
      game.ugly_move(newGameMoves[i]);
      bestScore = min(bestScore, alphaBeta(depth - 1, game, alpha, beta, !isMaximisingPlayer));
      game.undo();
      beta = min(beta, bestScore);

      if (beta <= alpha) {
        break;
      }
    }

    return bestScore;
  }
};


/**
* Evaluates the current state of the board and returns an overall score.
*
* The `evaluateBoard` function assesses the current state of the game board and computes
* an evaluation score that represents the overall desirability of the position.
* It iterates over each square on the board and calculates the contribution of each piece
* to the total evaluation score using the `getPieceValue` function.
* The evaluation score is a cumulative value based on the piece values and their positions.
*
* @param {array} board - The game board representing the current state.
* @returns {number} The evaluation score for the current board position.
*/
var evaluateBoard = function (board) {
  var totalEvaluation = 0;
  for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
          totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j);
      }
  }
  return totalEvaluation;
};


/**
* Evaluation tables for different chess pieces and their positions on the board.
* These tables are used in the evaluation function to assign values to pieces based on their position.
*/

var pawnEvalWhite =
  [
      [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
      [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
      [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
      [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
      [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
      [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
      [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
      [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
  ];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval =
  [
      [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
      [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
      [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
      [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
      [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
      [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
      [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
      [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
  ];

var bishopEvalWhite = [
  [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
  [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
  [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
  [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
  [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
  [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
  [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
  [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
  [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
  [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
  [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
  [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
  [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
  [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
  [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen = [
  [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
  [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
  [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
  [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
  [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
  [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
  [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
  [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var kingEvalWhite = [

  [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
  [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
  [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
  [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

var kingEvalBlack = reverseArray(kingEvalWhite);


var getPieceValue = function (piece, x, y) {
  if (piece === null) {
      return 0;
  }
  var getAbsoluteValue = function (piece, isWhite, x ,y) {
      if (piece.type === 'p') {
          return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
      } else if (piece.type === 'r') {
          return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
      } else if (piece.type === 'n') {
          return 30 + knightEval[y][x];
      } else if (piece.type === 'b') {
          return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
      } else if (piece.type === 'q') {
          return 90 + evalQueen[y][x];
      } else if (piece.type === 'k') {
          return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
      }
      throw "Unknown piece type: " + piece.type;
  };

  var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
  return piece.color === 'w' ? absoluteValue : -absoluteValue;
};


/* board visualization and games state handling */

var currentPlayer = 'w'; // Track the current player

var makeMove = function (source, target) {
  if (mode === 'player'){
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // Default promotion to queen
  });

  // If the move is invalid, return 'snapback' to revert the move
  if (move === null) {
      return 'snapback';
  }

  renderMoveHistory(game.history());

  // Check for game over
  if (game.game_over()) {
      alert('Game over');
  }

  // Switch turns
  currentPlayer = currentPlayer === 'w' ? 'b' : 'w';
  }
};

var makeBestMove = function () {
  if (mode === 'ai'){
    var bestMove = getBestMove(game);
    game.ugly_move(bestMove);
    board.position(game.fen());
    renderMoveHistory(game.history());
    if (game.game_over()) {
        alert('Game over');
    }
  }
};


var positionCount;
var getBestMove = function (game) {
  if (mode == 'ai'){
    if (game.game_over()) {
      alert('Game over');
  }

  positionCount = 0;
  var depth = parseInt($('#search-depth').find(':selected').text());
  
  var d = new Date().getTime();
  var bestMove = alphaBetaRoot(depth, game, true);
  var d2 = new Date().getTime();
  var moveTime = (d2 - d);
  var positionsPerS = ( positionCount * 1000 / moveTime);
  
  $('#position-count').text(positionCount);
  $('#time').text(moveTime/1000 + 's');
  $('#positions-per-s').text(positionsPerS);
  return bestMove;
  }
};

var renderMoveHistory = function (moves) {
  var historyElement = $('#move-history').empty();
  historyElement.empty();
  for (var i = 0; i < moves.length; i = i + 2) {
      historyElement.append('<span>' + moves[i] + ' ' + ( moves[i + 1] ? moves[i + 1] : ' ') + '</span><br>')
  }
  historyElement.scrollTop(historyElement[0].scrollHeight);

};


var onSnapEnd = function () {
  board.position(game.fen());
};

var onMouseoverSquare = function(square, piece) {
  var moves = game.moves({
      square: square,
      verbose: true
  });

  if (moves.length === 0) return;

  greySquare(square);

  for (var i = 0; i < moves.length; i++) {
      greySquare(moves[i].to);
  }
};

var onMouseoutSquare = function(square, piece) {
  removeGreySquares();
};

var removeGreySquares = function() {
  $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
  var squareEl = $('#board .square-' + square);

  var background = '#a9a9a9';
  if (squareEl.hasClass('black-3c85d') === true) {
      background = '#696969';
  }

  squareEl.css('background', background);
};


var onDragStart = function (source, piece, position, orientation) {
  if (mode == 'ai'){
    if (game.in_checkmate() === true || game.in_draw() === true ||
    piece.search(/^b/) !== -1) {
    return false;
}
  }

  if (mode == 'player'){
    if (game.game_over() === true || game.turn() !== currentPlayer) {
      return false;
  }
  }
};

var onDrop = function (source, target) {
  if (mode === 'ai'){
  var move = game.move({
      from: source,
      to: target,
      promotion: 'q'
  });

  removeGreySquares();
  if (move === null) {
      return 'snapback';
  }

  renderMoveHistory(game.history());
  window.setTimeout(makeBestMove, 250);
}
  if (mode === 'player'){
    removeGreySquares();

    // Make the move
    var move = makeMove(source, target);

    // If it's not a valid move, return 'snapback'
    if (move === 'snapback') {
        return 'snapback';
    }

    // Switch turns
    window.setTimeout(function () {
        board.position(game.fen());
    }, 250);
  };
};


var cfg = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd
};

var board,
  game = new Chess();
board = ChessBoard('board', cfg);
}