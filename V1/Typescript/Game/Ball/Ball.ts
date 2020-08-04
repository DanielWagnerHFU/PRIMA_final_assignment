namespace V1 {
  export class Ball extends GameObject {
    private static material: ƒ.Material = new ƒ.Material("Ball", ƒ.ShaderFlat, new ƒ.CoatColored());
    private static mesh: ƒ.MeshSphere = new ƒ.MeshSphere(20, 20);

    private position: ƒ.Vector2;
    private radius: number;
    private speed: ƒ.Vector3;
    private lineSegments: LineSegment[];

    constructor(_position: ƒ.Vector3, _radius: number, _lineSegments: LineSegment[]) {
      super("Ball");
      this.position = new ƒ.Vector2(_position.x, _position.y);
      this.radius = _radius;
      this.speed = new ƒ.Vector3(1, 0, 0);
      this.lineSegments = _lineSegments;

      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(_position.x, _position.y, _position.z))));
      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Ball.material);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
      this.addComponent(cmpMaterial);
      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Ball.mesh);
      this.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(this.radius));

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update.bind(this));
    }

    public hasCollision(lineSegments: LineSegment[]): boolean {
      let hasCollision: boolean = false;
      for (let lineSegment of lineSegments) {
        let distance: number = lineSegment.distanceToPoint(new ƒ.Vector2(this.mtxLocal.translation.x, this.mtxLocal.translation.y));
        if (distance <= this.radius / 2) {
          hasCollision = true;
        }
      }
      return hasCollision;
    }

    private update(_event: ƒ.Eventƒ): void {
        let travel: ƒ.Vector3 = ƒ.Vector3.NORMALIZATION(this.speed, ƒ.Loop.timeFrameGame / 10000);
        this.mtxLocal.translate(travel);
        console.log(this.hasCollision(this.lineSegments));
    }
  }
}