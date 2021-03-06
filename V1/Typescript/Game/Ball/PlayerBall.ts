namespace V1 {
  export class PlayerBall extends HookerBall {

    private downListener: EventListener;
    private upListener: EventListener;
    private updateIsAlive: EventListener;
    private ray: ƒ.Ray;
    private viewport: ƒ.Viewport;
    private game: DefenseGame;

    constructor(_position: ƒ.Vector3, _radius: number, _lineSegments: LineSegment[], _balls: Ball[], _viewport: ƒ.Viewport, _game: DefenseGame) {
      super(_position, _radius, _lineSegments, _balls);
      this.viewport = _viewport;
      this.forces.set("gravity", new ƒ.Vector3(0, -3.3, 0));
      this.game = _game;
      this.init();
      this.updateIsAlive = this.updateAlive.bind(this);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.updateIsAlive);
    }

    public removeAllListeners(): void {
      ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, super.listener);
      ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, super.listenerUpdate);
      this.viewport.removeEventListener(ƒ.EVENT_POINTER.DOWN, this.downListener);
      this.viewport.removeEventListener(ƒ.EVENT_POINTER.UP, this.upListener);
      ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, this.updateIsAlive);
    }

    public die(): void {
      this.game.end("YOU DIED");
    }

    private updateAlive(_event: ƒ.Eventƒ): void {
      if (this.mtxLocal.translation.y < -5) {
        this.game.end("You died");
      }
    }

    private init(): void {
      this.viewport.activatePointerEvent(ƒ.EVENT_POINTER.DOWN, true);
      this.viewport.activatePointerEvent(ƒ.EVENT_POINTER.UP, true);
      this.upListener = this.hndPointerUP.bind(this);
      this.downListener = this.hndPointerDOWN.bind(this);
      this.viewport.addEventListener(ƒ.EVENT_POINTER.DOWN, this.downListener);
      this.viewport.addEventListener(ƒ.EVENT_POINTER.UP, this.upListener);
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