namespace V1 {
  export class GameCanvas extends HTMLCanvasElement {
    private viewport: ƒ.Viewport;

    constructor() {
      super();
    }

    public init(graph: ƒ.Node, cmpCamera: ƒ.ComponentCamera): void {
      this.initViewport(graph, cmpCamera);
      this.initEventlistners();
    }

    public update(): void {
      this.viewport.draw();
    }
    
    private initViewport(graph: ƒ.Node, cmpCamera: ƒ.ComponentCamera): void {
      this.viewport = new ƒ.Viewport();
      this.viewport.initialize("Viewport", graph, cmpCamera, this);
    }

    private initEventlistners(): void {
      this.viewport.activatePointerEvent(ƒ.EVENT_POINTER.MOVE, true);
      this.viewport.addEventListener(ƒ.EVENT_POINTER.MOVE, this.pointerEventHandler.bind(this));
    }

    private pointerEventHandler(_event: ƒ.EventPointer): void {
      //TODO
    }
    
  }

  customElements.define("game-canvas", GameCanvas, { extends: "canvas" });
}