(function () {
  const wireFrame = {
    init: function () {
      this.cacheDom();
      this.bindEvents();
      this.render();
    },
    cacheDom: function () {
      this.main = document.querySelector('main');
      this.introContainer = this.main.querySelector('#intro-container');
      this.introPresents = this.main.querySelector('#intro-presents');
      this.introMenu = this.main.querySelector('#intro-menu');
      this.gameMenu = this.main.querySelector('#game-menu');
    },
    bindEvents: function () {
      this.main.addEventListener('click', this.toggleActivation.bind(this));
      this.gameMenu.addEventListener('click', this.initializeGame);
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
    initializeGame: function (e) {
      if (e.target.id !== 'pvb-button' && e.target.id !== 'pvp-button') return;

      if (e.target.id === 'pvb-button') {
        return;
      } else if (e.target.id === 'pvp-button') {
        alert('Coming Soon! 💭 {workin\' on it 😉}');
      }
    }
  };
  wireFrame.init();
})();
