namespace V1 {
  export class DefenseGame {
    
    private viewport: ƒ.Viewport;
    private wrapperDiv: HTMLDivElement;

    constructor() {
      //this.wrapperDiv = _wrapperDiv;
      // let graph: ƒ.Node = new ƒ.Node("Graph");

      // let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
      // cmpCamera.pivot.translate(new ƒ.Vector3(10, 5, 10));
      // cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
      // cmpCamera.backgroundColor = ƒ.Color.CSS("lightblue");

      // this.viewport = new ƒ.Viewport();
      // this.viewport.initialize("Viewport", graph, cmpCamera, canvas);
      // ƒ.Debug.log(this.viewport);

      // ƒAid.addStandardLightComponents(graph, new ƒ.Color(0.5, 0.5, 0.5));

      // ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update.bind(this));
      // ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
    }

    public init(): void {
      this.wrapperDiv.appendChild(new HTMLCanvasElement());
    }

    public loop(): void {
      //TODO
    }

    private update(_event: ƒ.Eventƒ): void {
      this.viewport.draw();
    }

    private addCanvas(): void {

    }
  }
}