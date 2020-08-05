namespace V1 {
  export class Ball extends GameObject {
    private static material: ƒ.Material = new ƒ.Material("Ball", ƒ.ShaderFlat, new ƒ.CoatColored());
    private static mesh: ƒ.MeshSphere = new ƒ.MeshSphere(20, 20);

    private radius: number;
    private v: ƒ.Vector3;
    private a: ƒ.Vector3;
    private lineSegments: LineSegment[];

    constructor(_position: ƒ.Vector3, _radius: number, _lineSegments: LineSegment[]) {
      super("Ball");
      this.radius = _radius;
      this.v = new ƒ.Vector3(0, -0.4, 0);
      this.a = new ƒ.Vector3(1, 0, 0);
      this.lineSegments = _lineSegments;

      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)));
      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Ball.material);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
      this.addComponent(cmpMaterial);
      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Ball.mesh);
      this.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(this.radius));

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update.bind(this));
    }

    public hasCollision(lineSegments: LineSegment[]): LineSegment {
      for (let lineSegment of lineSegments) {
        let distance: number = lineSegment.distanceToPoint(new ƒ.Vector2(this.mtxLocal.translation.x, this.mtxLocal.translation.y));
        if (distance <= this.radius / 2) {
          return lineSegment;
        }
      }
      return null;
    }

    private update(_event: ƒ.Eventƒ): void {
      this.updateSpeed();
      this.updatePosition();
    }

    private updatePosition(): void {
      this.mtxLocal.translate(ƒ.Vector3.SCALE(this.v, ƒ.Loop.timeFrameReal / 1000));
      if (this.hasCollision(this.lineSegments) != null) {
        this.handleCollision(this.hasCollision(this.lineSegments));
      }    
    }

    private handleCollision(lineSegment: LineSegment): void {
      let n: ƒ.Vector2 = ƒ.Vector2.ORTHOGONAL(ƒ.Vector2.DIFFERENCE(lineSegment.b, lineSegment.a));
      n.normalize(1);
      console.log(n.toString());
      let v: ƒ.Vector2 = new ƒ.Vector2(this.v.x, this.v.y);
      n.scale(2 * ƒ.Vector2.DOT(v, n));
      v.subtract(n);
      this.v.x = v.x;
      this.v.y = v.y;

    }

    private updateSpeed(): void {
      this.v = ƒ.Vector3.SUM(this.v, (ƒ.Vector3.SCALE(this.a, ƒ.Loop.timeFrameReal / 1000)));
    }
  }
}