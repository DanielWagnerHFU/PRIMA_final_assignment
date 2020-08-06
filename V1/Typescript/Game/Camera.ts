namespace V1 {
  export class Camera extends ƒ.ComponentCamera {
    private player: PlayerBall;

    constructor() {
      super();
    }

    public init(_player: PlayerBall): void {
      this.player = _player;
      this.pivot.translate(new ƒ.Vector3(4, 4, 20));
      this.pivot.lookAt(new ƒ.Vector3(4, 4, 0));
      this.backgroundColor = ƒ.Color.CSS("black");
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update.bind(this));  
    }

    private update(_event: ƒ.Eventƒ): void {
      this.updatePosition(this.player.getPosition());
    }

    private updatePosition(lookAt: ƒ.Vector3): void {
      this.pivot.translation = (ƒ.Vector3.SUM(lookAt, new ƒ.Vector3(0, 0, -20)));
      this.pivot.lookAt(lookAt);      
    }
  }
}