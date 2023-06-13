let ticTacToe = (function () {
  const gameBoard = [null, null, null, null, null, null, null, null, null];
  let turn = 1;

  // * playerFactory ✨
  function _createPlayer(values) {
    const player = {
      ...values,
      score: 0,
    };
    return player;
  }

  let playerOne = _createPlayer({
    symbol: null,
  });

  let playerTwo = _createPlayer({
    symbol: null,
  });

  let scores = {
    playerOne: playerOne.score,
    playerTwo: playerTwo.score,
  };
  // ! playerFactory ✨

  // * cache DOM
  const main = document.querySelector('main');
  const gameContainer = main.querySelector('#game-container');
  const ticTacToe = gameContainer.querySelector('#tic-tac-toe');
  // const resetButton = gameContainer.querySelector('reset-button');

  // * bind events
  ticTacToe.addEventListener('click', _makeSelection);

  events.on('playerOneSymbol', _setPlayers);
  _render();

  function _render() {
    ticTacToe.innerHTML = '';

    gameBoard.forEach((value, index) => {
      const square = document.createElement('button');
      square.classList.add('game-square');
      square.setAttribute('data-index', index);
      gameBoard[index] = null;
      ticTacToe.appendChild(square);
    });

    turn = 1;
    _adjustSquareHoverBackground();
  }

  function _setPlayers(symbol) {
    console.log(symbol);
    playerOne.symbol = symbol.playerOneSymbol;
    playerTwo.symbol = symbol.playerOneSymbol === 'X' ? 'O' : 'X';
  }

  function _updateEmittedScores() {
    scores.playerOne = playerOne.score;
    scores.playerTwo = playerTwo.score;

    events.emit('scoresChanged', scores);
  }

  function _checkWinner() {
    let statusOutput = document.getElementById('status-output');
    const winCombos = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],
    ];

    winCombos.forEach((combo) => {
      const [a, b, c] = combo;
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        if (gameBoard[a] === playerOne.symbol) {
          playerOne.score++;
          statusOutput.textContent = `playerOne wins!`;
        } else if (gameBoard[a] === playerTwo.symbol) {
          playerTwo.score++;
          statusOutput.textContent = `playerTwo wins!`;
        }

        _updateEmittedScores();
        _render();
      }
    });

    if (gameBoard.every((value) => value !== null)) {
      statusOutput.textContent = `It's a tie!`;
      _render();
    }
  }

  function _adjustSquareHoverBackground() {
    if (turn === 1) {
      document.documentElement.style.setProperty(
        '--player-hover-icon-bg',
        'var(--x)'
      );
    } else if (turn === 2) {
      document.documentElement.style.setProperty(
        '--player-hover-icon-bg',
        'var(--o)'
      );
    }
  }

  function _setGameData(selectedSquare, selectedSquareIndex) {
    if (turn === 1) {
      gameBoard[selectedSquareIndex] = (playerOne.symbol === 'O') ? playerTwo.symbol : playerOne.symbol;
      selectedSquare.setAttribute('data-symbol', gameBoard[selectedSquareIndex]);
      selectedSquare.setAttribute('data-player', (playerOne.symbol === 'O') ? 2 : 1);
    } else if (turn === 2) {
      gameBoard[selectedSquareIndex] = (playerOne.symbol === 'O') ? playerOne.symbol : playerTwo.symbol;
      selectedSquare.setAttribute('data-symbol', gameBoard[selectedSquareIndex]);
      selectedSquare.setAttribute('data-player', (playerOne.symbol === 'O') ? 1 : 2);
    }
  }

  function _makeSelection(e) {
    if (!e.target.classList.contains('game-square')) return;

    let selectedSquare = e.target;
    let selectedSquareIndex = +e.target.getAttribute('data-index');

    if (gameBoard[selectedSquareIndex] !== null)
      return alert('Choose an empty square you fuck!');

    _setGameData(selectedSquare, selectedSquareIndex);

    selectedSquare.textContent = gameBoard[selectedSquareIndex];

    turn === 1 ? (turn = 2) : (turn = 1);
    _checkWinner();
    _adjustSquareHoverBackground();
  }
})();
