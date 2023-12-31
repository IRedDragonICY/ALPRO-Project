/*
    AI Chess created by:
    Mohammad Farid Hendianto : 2200018401
    Rendie Abdi Saputra : 2200018094
    Menggunakan minimax dengan optimasi alpha-beta pruning algorithm
*/

function startGame(mode, level) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  showBoard();
function createExitButton() {
  const exitButton = document.createElement("button");
  exitButton.classList.add("exit-button");
  exitButton.innerHTML = "Exit";
  exitButton.onclick = showMenu;
  return exitButton;
}
const exitButton = createExitButton();
container.appendChild(exitButton);
function showBoard() {
  const container = document.querySelector(".container");
  container.innerHTML = `
    <div class="box">
      <div id="board" class="board";"></div>
      <div class="info" ;">
        <select class="hidden" id="search-depth">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br>
        <br>
        <h3>Move History</h3>
        <div id="move-history" class="move-history"></div>

      </div>
    </div>
  `;
}
document.getElementById("search-depth").selectedIndex = level - 1;
  
var transpositionTable = new Map();

const minimaxRoot = (maxDepth, game, isMaximisingPlayer) => {
  transpositionTable.clear();
  let bestMoveFound;

  for (let depth = 1; depth <= maxDepth; depth++) {
    const newGameMoves = game.uglyMoves();
    let bestMove = isMaximisingPlayer ? -Infinity : Infinity;

    newGameMoves.sort((a, b) => {
      game.uglyMove(a);
      const evalA = -evaluateBoard(game.board()); 
      game.undo();
      game.uglyMove(b);
      const evalB = -evaluateBoard(game.board());
      game.undo();
      return evalB - evalA;
    });

    for (let i = 0; i < newGameMoves.length; i++) {
      const newGameMove = newGameMoves[i];
      game.uglyMove(newGameMove);
      const value = minimax(depth - 1, game, -Infinity, Infinity, !isMaximisingPlayer);
      game.undo();
      if (isMaximisingPlayer && value >= bestMove) {
        bestMove = value;
        bestMoveFound = newGameMove;
      } else if (!isMaximisingPlayer && value <= bestMove) {
        bestMove = value;
        bestMoveFound = newGameMove;
      }
    }
  }
  return bestMoveFound;
};

const minimax = (depth, game, alpha, beta, isMaximisingPlayer) => {
  positionCount++;
  const key = game.fen() + depth.toString();
  if (transpositionTable.has(key)) {
    return transpositionTable.get(key);
  }
  if (depth === 0) {
      return -evaluateBoard(game.board());
  }

  const newGameMoves = game.uglyMoves();
  if (isMaximisingPlayer) {
    let bestMove = -Infinity;
    for (let i = 0; i < newGameMoves.length; i++) {
      game.uglyMove(newGameMoves[i]);
      bestMove = max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
      game.undo();
      alpha = max(alpha, bestMove);
      if (beta <= alpha) {
        break;
      }
    }
    transpositionTable.set(key, bestMove);
    return bestMove;
  } else {
    let bestMove = Infinity;
    for (let i = 0; i < newGameMoves.length; i++) {
      game.uglyMove(newGameMoves[i]);
      bestMove = min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
      game.undo();
      beta = min(beta, bestMove);
      if (beta <= alpha) {
        break;
      }
    }
    transpositionTable.set(key, bestMove);
    return bestMove;
  }
};

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

var pawnEvalBlack = reverse(pawnEvalWhite);

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

var bishopEvalWhite = 
  [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
  ];

var bishopEvalBlack = reverse(bishopEvalWhite);

var rookEvalWhite = 
  [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
  ];

var rookEvalBlack = reverse(rookEvalWhite);

var evalQueen = 
  [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
  ];

var kingEvalWhite = 
  [
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
  ];

var kingEvalBlack = reverse(kingEvalWhite);


var getPieceValue = function (piece, x, y) {
  if (piece === null) {
    return 0;
  }
  var getAbsoluteValue = function (piece, isWhite, x ,y) {
    if (piece.type === 'p') {
      return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
    } 
    if (piece.type === 'r') {
      return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
    } 
    if (piece.type === 'n') {
      return 30 + knightEval[y][x];
    } 
    if (piece.type === 'b') {
      return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
    } 
    if (piece.type === 'q') {
      return 90 + evalQueen[y][x];
    } 
    if (piece.type === 'k') {
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
  if (mode === 'playervsplayer'){
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
  if (mode === 'aivsplayer'){
    var bestMove = getBestMove(game);
    game.uglyMove(bestMove);
    board.position(game.fen());
    renderMoveHistory(game.history());
    if (game.game_over()) {
        alert('Game over');
    }
  }
};


var positionCount;
var getBestMove = function (game) {
  if (mode == 'aivsplayer'){
    if (game.game_over()) {
      alert('Game over');
  }
  var depth = parseInt($('#search-depth').find(':selected').text());
  var bestMove = minimaxRoot(depth, game, true);
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
  if (mode == 'aivsplayer'){
    if (game.in_checkmate() === true || game.in_draw() === true ||
    piece.search(/^b/) !== -1) {
    return false;
}
  }

  if (mode == 'playervsplayer'){
    if (game.game_over() === true || game.turn() !== currentPlayer) {
      return false;
    }
  }
};

var onDrop = function (source, target) {
  if (mode === 'aivsplayer'){
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
  if (mode === 'playervsplayer'){
    removeGreySquares();
    var move = makeMove(source, target);
    if (move === 'snapback') {
      return 'snapback';
    }
    window.setTimeout(function () {
      board.position(game.fen());
    });
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