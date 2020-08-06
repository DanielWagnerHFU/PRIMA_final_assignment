namespace V1 {

  window.addEventListener("load", main);
  window.addEventListener("contextmenu", e => {
    e.preventDefault();
  });
  ƒ.RenderManager.initialize(true);

  function main(_event: Event): void {
    let game: DefenseGame = new DefenseGame();
    game.init();
    game.startLoop();

  }
}
