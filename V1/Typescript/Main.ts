namespace V1 {

  export interface IMatrix {
    level: number[][];
  }

  export let globalMatrix: IMatrix = null;

  window.addEventListener("load", acceptSounds);
  window.addEventListener("contextmenu", e => {
    e.preventDefault();
  });
  ƒ.RenderManager.initialize(true);

  async function main(): Promise<void> {
    try {
      await load("/PRIMA_final_assignment/V1/Json/gamematrix.json");
    } catch (error) {
      console.log("gamematrix.json loading failed");
    }
    let game: DefenseGame = new DefenseGame();
    game.init();
    game.startLoop();
  }

  async function acceptSounds(_event: Event): Promise<void> {
    var button: HTMLButtonElement = document.createElement("button");
    button.innerHTML = "Accept Sound";
    document.querySelector("body").appendChild(button);
    button.addEventListener ("click", function(): void {
      Sound.init();
      Sound.playMusic();
      main();
    });
  }

  async function load(_filename: string): Promise<void> {
    let response: Response = await fetch(_filename);
    let text: string = await response.text();
    globalMatrix = JSON.parse(text);
    console.log("matrix json loaded");
  }
}
