namespace V1 {
  export class PlayerBall extends HookerBall {

    private ray: ƒ.Ray;
    private viewport: ƒ.Viewport;

    constructor(_position: ƒ.Vector3, _radius: number, _lineSegments: LineSegment[], _balls: Ball[], _viewport: ƒ.Viewport) {
      super(_position, _radius, _lineSegments, _balls);
      this.viewport = _viewport;
      this.forces.set("gravity", new ƒ.Vector3(0, -3.3, 0));
      this.init();
    }

    private init(): void {
      this.viewport.activatePointerEvent(ƒ.EVENT_POINTER.DOWN, true);
      this.viewport.activatePointerEvent(ƒ.EVENT_POINTER.UP, true);
      this.viewport.addEventListener(ƒ.EVENT_POINTER.DOWN, this.hndPointerDOWN.bind(this));
      this.viewport.addEventListener(ƒ.EVENT_POINTER.UP, this.hndPointerUP.bind(this));
    }

    private hndPointerDOWN(_event: ƒ.EventPointer): void {
      this.ray = this.viewport.getRayFromClient(new ƒ.Vector2(_event.pointerX, _event.pointerY));
      let pos: ƒ.Vector3 = this.ray.intersectPlane(ƒ.Vector3.ZERO(), ƒ.Vector3.Z(1));
      let direction: ƒ.Vector3 = ƒ.Vector3.SUM(ƒ.Vector3.DIFFERENCE(pos, this.mtxLocal.translation));
      super.hook(direction.toVector2());
    }

    private hndPointerUP(_event: ƒ.EventPointer): void {
      super.unhook();
    }
  }
}