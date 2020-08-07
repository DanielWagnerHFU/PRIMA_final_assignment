namespace V1 {
  export class Goal extends GameObject {
    private static material: ƒ.Material = new ƒ.Material("Ball", ƒ.ShaderFlat, new ƒ.CoatColored(new ƒ.Color(0.0, 0.5, 1.0, 1)));
    private static mesh: ƒ.MeshSphere = new ƒ.MeshSphere(12, 9);

    private balls: Ball[];
    private radius: number;
    private game: DefenseGame;
    private player: PlayerBall;

    constructor(_position: ƒ.Vector3, _radius: number, _balls: Ball[], _game: DefenseGame) {
      super("Ball");
      this.balls = _balls;
      this.radius = _radius;
      this.game = _game;

      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)));
      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Goal.material);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
      this.addComponent(cmpMaterial);
      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Goal.mesh);
      this.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(this.radius));

      this.player = this.getPlayer();

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update.bind(this));
    }

    private update(_event: ƒ.Eventƒ): void {
      if (ƒ.Vector3.DIFFERENCE(this.mtxLocal.translation, this.player.mtxLocal.translation).magnitude < (this.radius + this.player.getRadius()) / 2) {
        console.log("REACHED GOAL");
        this.game.end("YOU WON");
      }
    }

    private getPlayer(): PlayerBall {
      for (let b of this.balls) {
        if (b instanceof PlayerBall) {
          return b as PlayerBall;
        }
      }
      return null;
    }
  }
}