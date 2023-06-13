let scoreBoard = (function () {
  let scoreBoard = {};

  //cache DOM
  const gameContainer = document.querySelector('#game-container');
  const playerOneScore = gameContainer.querySelector('#player-one-score');
  const playerTwoScore = gameContainer.querySelector('#player-two-score');

  events.on('scoresChanged', _render);
  _render();
  
  function _render(scores) {
    scoreBoard = scores || { playerOne: 0, playerTwo: 0 };
    playerOneScore.textContent = scoreBoard.playerOne;
    playerTwoScore.textContent = scoreBoard.playerTwo;
  }
})();
