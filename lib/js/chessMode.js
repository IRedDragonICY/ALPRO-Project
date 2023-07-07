
/*
    AI Chess created by:
    Mohammad Farid Hendianto : 2200018401
    Rendie Abdi Saputra : 2200018094
    using alpha-beta pruning algorithm
*/

/**
 * Mengembalikan nilai absolut dari suatu bilangan.
 * @param {number} x - Bilangan yang akan diambil nilai absolutnya.
 * @return {number} Nilai absolut dari bilangan x.
 */
function abs(x) {
  return x < 0 ? -x : x;                                                // jika x < 0, maka mengembalikan nilai -x, jika tidak maka mengembalikan nilai x
}

/**
 * Menghasilkan angka pseudo-random menggunakan algoritma XORShift
 * Angka yang dihasilkan memiliki periode 2^32 - 1.
 * @return {number} Angka pseudo-random yang dihasilkan.
 */
function rand() {
  let seed = Date.now();                                                // seed = waktu saat ini
seed ^= seed << 13;                                                     // melakukan operasi XOR pada seed dengan seed << 13
seed ^= seed >> 17;                                                     // melakukan operasi XOR pada seed dengan seed >> 17
seed ^= seed << 5;                                                      // melakukan operasi XOR pada seed dengan seed << 5
return abs(seed);                                                       // mengembalikan nilai absolut dari seed
}


/**
* Mengurutkan elemen-elemen dari sebuah array menggunakan algoritma Quick Sort.
*
* @param {Array} array - Array yang akan diurutkan.
* @returns {Array} Array baru yang sudah diurutkan.
*/
function quickSort(array) {
if (array.length <= 1) {                                                  // jika panjang array <= 1, maka array sudah terurut
  return array;
}

const pivot = array[0];                                                   // pivot = elemen pertama dari array
const smaller = [];                                                       // smaller = array kosong
const equal = [];                                                         // equal = array kosong
const greater = [];                                                       // greater = array kosong

for (let element of array) {
  if (element < pivot) {                                                  // jika elemen < pivot, maka elemen dimasukkan ke array smaller
    smaller.push(element);
  } else if (element > pivot) {                                           // jika elemen > pivot, maka elemen dimasukkan ke array greater
    greater.push(element);
  } else {                                                                // jika elemen = pivot, maka elemen dimasukkan ke array equal
    equal.push(element);
  }
}

return [...quickSort(smaller), ...equal, ...quickSort(greater)];          // menggabungkan array smaller, equal, dan greater
}


/**
* Membalikkan elemen-elemen dari sebuah array.
*
* @param {Array} array - Array yang akan dibalikkan.
* @returns {Array} Array baru dengan elemen-elemen dalam urutan terbalik.
*/
var reverseArray = function(array) {
  var reversedArray = [];
  for (var i = array.length - 1; i >= 0; i--) {
    reversedArray.push(array[i]);
  }
  return reversedArray;
};

/**
* Mengembalikan nilai maksimum antara dua angka.
*
* @param {number} a - Angka pertama.
* @param {number} b - Angka kedua.
* @returns {number} Nilai maksimum antara a dan b.
*/
function max(a, b) {
  return a > b ? a : b;                                                         // jika a > b, maka mengembalikan nilai a, jika tidak maka mengembalikan nilai b  
}

/**
* Mengembalikan nilai minimum antara dua angka.
*
* @param {number} a - Angka pertama.
* @param {number} b - Angka kedua.
* @returns {number} Nilai minimum antara a dan b.
*/
function min(a, b) {
  return a < b ? a : b;
}




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



  /**
   * AI ini menggunakan algoritma minimax dengan alpha-beta pruning untuk memilih gerakan terbaik.
   * Minimax adalah algoritma rekursif yang mencoba memilih gerakan terbaik untuk pemain saat ini dengan
   * mensimulasikan semua gerakan yang mungkin. Algoritma ini mengasumsikan bahwa kedua pemain bermain secara optimal, yaitu mereka akan selalu
   * memilih gerakan yang memberikan skor tertinggi.
   * Alpha-beta pruning adalah teknik optimasi untuk minimax yang mengurangi jumlah node
   * yang dievaluasi oleh minimax dengan memangkas cabang yang dijamin lebih buruk dari gerakan terbaik saat ini.
   * Mengembalikan gerakan terbaik untuk pemain saat ini menggunakan algoritma minimax.
   * @param {number} depth - Kedalaman maksimum dari pohon pencarian.
   * @param {Game} game - Keadaan saat ini dari permainan.
   * @param {boolean} isMaximisingPlayer - Menunjukkan apakah pemain saat ini adalah pemain maksimal.
   * @returns {Move} - Gerakan terbaik yang ditemukan.
   */
var minimaxRoot =function(depth, game, isMaximisingPlayer) {

  var newGameMoves = game.uglyMoves();
  var bestMove = -9999;                                                                                         // skor terbaik yang ditemukan sejauh ini untuk pemain maksimal (tidak dapat infinity karena akan menyebabkan overflow)
  var bestMoveFound;                                                                                            // gerakan terbaik yang ditemukan sejauh ini untuk pemain maksimal

  for(var i = 0; i < newGameMoves.length; i++) {
      var newGameMove = newGameMoves[i]
      game.uglyMove(newGameMove);
      var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
      game.undo();
      if(value >= bestMove) {
          bestMove = value;
          bestMoveFound = newGameMove;
      }
  }
  return bestMoveFound;
};


/**
 * Mengembalikan skor terbaik untuk pemain saat ini menggunakan algoritma minimax.
 * @param {number} depth - Kedalaman saat ini dari pohon pencarian.
 * @param {Game} game - Keadaan saat ini dari permainan.
 * @param {number} alpha - Skor terbaik yang ditemukan sejauh ini untuk pemain maksimal.
 * @param {number} beta - Skor terbaik yang ditemukan sejauh ini untuk pemain minimal.
 * @param {boolean} isMaximisingPlayer - Menunjukkan apakah pemain saat ini adalah pemain maksimal.
 * @returns {number} - Skor terbaik yang ditemukan.
 */
var minimax = function (depth, game, alpha, beta, isMaximisingPlayer) {
  positionCount++;
  if (depth === 0) {
      return -evaluateBoard(game.board());
  }

  var newGameMoves = game.uglyMoves();
  if (isMaximisingPlayer) {
      var bestMove = -9999;
      for (var i = 0; i < newGameMoves.length; i++) {
          game.uglyMove(newGameMoves[i]);
          bestMove = max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
          game.undo();
          alpha = max(alpha, bestMove);
          if (beta <= alpha) {
              return bestMove;
          }
      }
      return bestMove;
  } else {
      var bestMove = 9999;
      for (var i = 0; i < newGameMoves.length; i++) {
          game.uglyMove(newGameMoves[i]);
          bestMove = min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
          game.undo();
          beta = min(beta, bestMove);
          if (beta <= alpha) {
              return bestMove;
          }
      }
      return bestMove;
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

  positionCount = 0;
  var depth = parseInt($('#search-depth').find(':selected').text());
  
  var d = new Date().getTime();
  // var bestMove = alphaBetaRoot(depth, game, true);
  var bestMove = minimaxRoot(depth, game, true);
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