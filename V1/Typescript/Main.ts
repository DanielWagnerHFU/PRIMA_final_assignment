namespace V1 {

  export interface IMatrix {
    level: number[][];
  }

  export let globalMatrix: IMatrix = null;

  window.addEventListener("load", main);
  window.addEventListener("contextmenu", e => {
    e.preventDefault();
  });
  ƒ.RenderManager.initialize(true);

  async function main(_event: Event): Promise<void> {
    try {
      await load("/V1/Json/gamematrix.json");
    } catch (error) {
      console.log("gamematrix.json loading failed");
    }
    let game: DefenseGame = new DefenseGame();
    game.init();
    game.startLoop();
  }

  async function load(_filename: string): Promise<void> {
    let response: Response = await fetch(_filename);
    let text: string = await response.text();
    globalMatrix = JSON.parse(text);
    console.log("matrix json loaded");
  }
}
