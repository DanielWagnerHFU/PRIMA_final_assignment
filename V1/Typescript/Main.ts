namespace V1 {

  window.addEventListener("load", hndLoad);

  export let viewport: ƒ.Viewport;

  function hndLoad(_event: Event): void {
    let game: DefenseGame = new DefenseGame();
    game.init();
    game.startLoop();
  }
}