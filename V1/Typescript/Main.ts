namespace V1 {

  export interface Data {
    level: {
        text: string,
        number: string,
        amountOfBombs: string,
        lives: string,
        amountOfObstacles: string,
        amountOfFood: string,
        amountOfItems: string,
        amountOfEnemies: string
    }[];
  }

  let data: Data;

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
    let response: Response = await fetch("data.json");
    let text: string = await response.text();
    data = JSON.parse(text);
    console.log(data.toString());
  }
}
