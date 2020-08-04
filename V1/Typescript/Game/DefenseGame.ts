namespace V1 {

  export class DefenseGame {
    
    private gametree: Gametree;
    private gcanvas: GameCanvas;

    public init(): void {
      this.gametree = new Gametree("gametree");
      this.gametree.init();

      let camera: Camera = new Camera();
      camera.init();

      this.gcanvas = new GameCanvas();
      this.gcanvas.init(this.gametree, camera);
      
      document.querySelector("body").appendChild(this.gcanvas);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update.bind(this));
    }

    public startLoop(): void {
      ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
    }

    private update(_event: ƒ.Eventƒ): void {
      this.gcanvas.update();
    }
  }
}