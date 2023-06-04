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
      this.pressStartButton = this.introMenu.querySelector('#press-start-button');
    },
    bindEvents: function () {
      this.main.addEventListener('click', this.destroyModule.bind(this.introContainer));
    },
    render: function () {
      this.delay(() => {
        this.toggleActivation(this.introPresents);
        this.toggleActivation(this.introMenu);
      }, 5000 / 1);
    },
    toggleActivation: function (phase) {
      phase.classList.toggle('inactive');
      phase.classList.toggle('active');
    },
    delay: function (callback, delayTime) {
      setTimeout(callback, delayTime);
    },
    destroyModule: function (e) {
      if (!e.target.closest('#press-start-button')) return;
      this.classList.add('destroying');
      this.addEventListener('animationend', () => {
        this.remove();
      });
    }
  };
  wireFrame.init()
})();