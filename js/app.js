function createPlayer(values) {
  const player = {
    ...values,
    score: 0,
  }
}

  let player1 = createPlayer({
    name: 'Player 1',
    symbol: 'X',
  });

  let player2 = createPlayer({
    name: 'Player 2',
    symbol: 'O',
  });


(function () {
  const ticTacToe = {
    gameBoard: ['X', 'O', '', '', '', '', '', '', ''],
    winCombos: [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],
    ],
    init: function () {
      this.cacheDom();
      this.render();
    },
    cacheDom: function () {
      this.gameContainer = document.getElementById('game-container');
      this.ticTacToe = this.gameContainer.querySelector('#tic-tac-toe');
      // const gameBoardSquares = ticTacToe.querySelectorAll('.game-choice');
      // const player1Score = ticTacToe.querySelector('.player-1__score');
      // const player2Score = ticTacToe.querySelector('.player-2__score');
      // const player1Name = ticTacToe.querySelector('.player-1__name');
      // const player2Name = ticTacToe.querySelector('.player-2__name');
      // const player1Symbol = ticTacToe.querySelector('.player-1__symbol');
      // const player2Symbol = ticTacToe.querySelector('.player-2__symbol');
      // const player1Turn = ticTacToe.querySelector('.player-1__turn');
      // const player2Turn = ticTacToe.querySelector('.player-2__turn');
      // const resetButton = ticTacToe.querySelector('.reset-button');
    },
    bindEvents: function () {
      // gameContainer.addEventListener('click', );
    },
    render: function () {
      this.gameBoard.forEach((gameSquare, i) => {
        const square = document.createElement('button');
        square.classList.add('game-square');
        square.setAttribute('data-index', i);
        // square.textContent = gameSquare;
        square.textContent = i;

        this.ticTacToe.appendChild(square);
      });
    },
    makeSelection: function () {
      if (!e.target.classList.contains('game-choice')) return;

      let choiceIndex = e.target.getAttribute('data-index');
      console.log(choiceIndex);

      if (gameBoard[choiceIndex] !== '')
        return alert('Choose an empty square you fuck!');
      gameBoard[choiceIndex] = 'X';

      render();
    },
  };
ticTacToe.init();
})();