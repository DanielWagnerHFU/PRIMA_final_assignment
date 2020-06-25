namespace V1 {
  export class DefenseGame {
    
    private gametree: GameObject;
    private gcanvas: GameCanvas;

    public init(): void {
      this.gametree = this.createGametree();
      let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
      cmpCamera.pivot.translate(new ƒ.Vector3(10, 5, 10));
      cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
      cmpCamera.backgroundColor = ƒ.Color.CSS("lightblue");
      this.gcanvas = new GameCanvas();
      this.gcanvas.init(this.gametree, cmpCamera);
      document.querySelector("body").appendChild(this.gcanvas);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update.bind(this));
    }

    public startLoop(): void {
      ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
    }

    private update(_event: ƒ.Eventƒ): void {
      this.gcanvas.update();
    }

    private createGametree(): ƒ.Node {
      let tree: GameObject = new GameObject("gametree");
      //TODO
      return tree;
    }
  }
}