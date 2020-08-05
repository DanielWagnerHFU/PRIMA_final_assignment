namespace V1 {
  export class GameCanvas extends HTMLCanvasElement {
    private viewport: ƒ.Viewport;

    constructor() {
      super();
    }

    public getViewport(): ƒ.Viewport {
      return this.viewport;
    }

    public init(graph: ƒ.Node, cmpCamera: ƒ.ComponentCamera): void {
      this.initViewport(graph, cmpCamera);
    }

    public update(): void {
      this.viewport.draw();
    }
    
    private initViewport(graph: ƒ.Node, cmpCamera: ƒ.ComponentCamera): void {
      this.viewport = new ƒ.Viewport();
      this.viewport.initialize("Viewport", graph, cmpCamera, this);
    }
  }

  customElements.define("game-canvas", GameCanvas, { extends: "canvas" });
}