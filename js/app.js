let ticTacToe = (function () {
  const gameBoard = [null, null, null, null, null, null, null, null, null];
  const random = () => {
    return Math.floor(Math.random() * 1000000);
  };
  let turn = 1;
  let last = 0;
  let changeSpeed = 1500;
  let rAF;

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
  const gameOverModal = gameContainer.querySelector('#game-over-modal');
  const easterEgg = gameOverModal.querySelector('#cyclone-c-button');
  // const resetButton = gameContainer.querySelector('reset-button');

  // * bind events
  ticTacToe.addEventListener('click', _makeSelection);
  easterEgg.addEventListener('click', () => {
    document.body.classList.toggle('easterEgg');
  });

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

  function _openGameOverModal(winner) {
    let gameWinnerOutput = gameOverModal.querySelector('#dialog-winner-output');

    gameWinnerOutput.textContent = `${winner} wins!`
    gameOverModal.showModal();
  
    gameOverModal.addEventListener('cancel', (e) => e.preventDefault());
  }

  function _checkRoundWinner() {
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

        if (playerOne.score === 5) {
          _openGameOverModal('playerOne');
          return;
        } else if (playerTwo.score === 5) {
          _openGameOverModal('playerTwo');
          return;
        }
        
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
    _checkRoundWinner();
    _adjustSquareHoverBackground();
  }

  function _morphModal(now) {
    if (!last || now - last >= changeSpeed) {
      last = now;

      gameOverModal.style.borderBottomLeftRadius = `${random()}px ${random()}px`;
      gameOverModal.style.borderBottomRightRadius = `${random()}px ${random()}px`;
      gameOverModal.style.borderTopLeftRadius = `${random()}px ${random()}px`;
      gameOverModal.style.borderTopRightRadius = `${random()}px ${random()}px`;
    }
    rAF = requestAnimationFrame(_morphModal);
  }
  _morphModal(last);
})();
