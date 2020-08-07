namespace V1 {

  export interface IMatrix {
    level: number[][];
  }

  let matrix: IMatrix;

  window.addEventListener("load", main);
  window.addEventListener("contextmenu", e => {
    e.preventDefault();
  });
  ƒ.RenderManager.initialize(true);

  function main(_event: Event): void {
    load("gamematrix.json");
    let game: DefenseGame = new DefenseGame();
    game.init();
    game.startLoop();

  }

  async function load(_filename: string): Promise<void> {
    let response: Response = await fetch("gamematrix.json");
    let text: string = await response.text();
    matrix = JSON.parse(text);
    console.log("matrix");
    for (let a of matrix.level) {
      for (let b of a) {
        console.log(b.toString());
      }
    }
  }
}
