namespace V1 {
  export class PlayerBall extends Ball {

    private ray: ƒ.Ray;
    private viewport: ƒ.Viewport;

    constructor(_position: ƒ.Vector3, _radius: number, _lineSegments: LineSegment[], _viewport: ƒ.Viewport) {
      super(_position, _radius, _lineSegments);
      this.viewport = _viewport;
      this.init();
    }

    private init(): void {
      this.viewport.activatePointerEvent(ƒ.EVENT_POINTER.MOVE, true);
      this.viewport.addEventListener(ƒ.EVENT_POINTER.MOVE, this.hndPointerMove.bind(this));
    }

    private hndPointerMove(_event: ƒ.EventPointer): void {
      this.ray = this.viewport.getRayFromClient(new ƒ.Vector2(_event.pointerX, _event.pointerY));
      let pos: ƒ.Vector3 = this.ray.intersectPlane(ƒ.Vector3.ZERO(), ƒ.Vector3.Z(1));
      //console.log(ƒ.Vector3.DIFFERENCE(pos, this.mtxLocal.translation).toString());
      this.a = ƒ.Vector3.DIFFERENCE(pos, this.mtxLocal.translation);
    }
  }
}