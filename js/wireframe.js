const intro = (function () {
  const wireFrame = {
    init: function () {
      this.cacheDom();
      this.bindEvents();
      this.render();
    },
    cacheDom: function () {
      this.main = document.querySelector('main');
      this.introContainer = this.main.querySelector('#intro-container');
      this.introPresents = this.introContainer.querySelector('#intro-presents');
      this.introMenu = this.introContainer.querySelector('#intro-menu');
      this.gameMenu = this.introContainer.querySelector('#game-menu');
      this.playerOneSymbolChoices = this.gameMenu.querySelectorAll(
        'input[name="player-mark"]'
      );
      this.gameContainer = this.main.querySelector('#game-container');
    },
    bindEvents: function () {
      this.main.addEventListener('click', this.toggleActivation.bind(this));
      this.gameMenu.addEventListener('click', this.initializeGame.bind(this));
    },
    render: function () {
      this.delay(() => {
        this.toggleActivation(this.introPresents);
        this.toggleActivation(this.introMenu);
      }, 5000 / 1);
    },
    delay: function (callback, delayTime) {
      setTimeout(callback, delayTime);
    },
    toggleActivation: function (phase) {
      if (phase.type === 'click') {
        if (phase.target.closest('#press-start-button')) {
          this.introMenu.classList.toggle('inactive');
          this.introMenu.classList.toggle('active');
          this.gameMenu.classList.toggle('inactive');
          this.gameMenu.classList.toggle('active');
        }
      } else {
        phase.classList.toggle('inactive');
        phase.classList.toggle('active');
      }
    },
    activateGame: function () {
      this.introContainer.classList.toggle('inactive');
      this.introContainer.addEventListener('animationend', () => {
        this.introContainer.remove();
        this.gameContainer.classList.toggle('inactive');
      });
    },
    setPlayerOneSymbol: function () {
      let playerOneSymbol;
      this.playerOneSymbolChoices.forEach((choice) => {
        if (!choice.checked) return;
        playerOneSymbol = choice.value;
      });
      if (!playerOneSymbol) return alert('Player one symbol not selected');
      this.activateGame();
      return {
        playerOneSymbol: playerOneSymbol
      }
    },
    initializeGame: function (e) {      
      if (e.target.id !== 'pvb-button' && e.target.id !== 'pvp-button') return;
      
      let playerOneSymbol = this.setPlayerOneSymbol();
      
      if (e.target.id === 'pvb-button') {
        return;
      } else if (e.target.id === 'pvp-button') {
        events.emit('playerOneSymbol', playerOneSymbol);
      }

      ticTacToe.render();
    }
  };
  wireFrame.init();
})();
