namespace V1 {

  window.addEventListener("load", main);
  ƒ.RenderManager.initialize(true);

  function main(_event: Event): void {
    let game: DefenseGame = new DefenseGame();
    game.init();
    game.startLoop();

  }
}
