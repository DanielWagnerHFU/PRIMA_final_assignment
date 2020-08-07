namespace V1 {

  export class DefenseGame {
    
    private gametree: Gametree;
    private gcanvas: GameCanvas;
    private updateListener: EventListener;

    public init(): void {
      this.gametree = new Gametree("gametree");

      let camera: Camera = new Camera();

      this.gcanvas = new GameCanvas();
      this.gcanvas.init(this.gametree, camera);

      this.gametree.init(this.gcanvas, this);
      camera.init(this.gametree.getPlayer());
      
      document.querySelector("body").appendChild(this.gcanvas);
      this.updateListener = this.update.bind(this);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.updateListener);
    }

    public end(message: string): void {
      ƒ.Loop.stop();
      this.gametree.removeAllListeners();
      ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, this.updateListener);
      document.querySelector("body").removeChild(this.gcanvas);
      this.gcanvas = null;
      this.gametree = null;
      console.log("END");

      let para: HTMLParagraphElement = document.createElement("p");
      let node: Text = document.createTextNode(message);
      para.appendChild(node);
      document.querySelector("body").appendChild(para);
      var button: HTMLButtonElement = document.createElement("button");
      button.innerHTML = "Reload";
      document.querySelector("body").appendChild(button);
      button.addEventListener ("click", function(): void {
        location.reload();
      });
    }

    public startLoop(): void {
      ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
    }

    private update(_event: ƒ.Eventƒ): void {
      this.gcanvas.update();
    }
  }
}