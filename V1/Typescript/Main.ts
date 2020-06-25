namespace V1 {
  import ƒAid = FudgeAid;

  window.addEventListener("load", hndLoad);

  export let viewport: ƒ.Viewport;

  function hndLoad(_event: Event): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let game: DefenseGame = new DefenseGame(canvas);
    
  }
}