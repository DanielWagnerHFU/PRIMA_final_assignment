namespace V1 {
  export class Ball extends GameObject {
    private static material: ƒ.Material = new ƒ.Material("Ball", ƒ.ShaderFlat, new ƒ.CoatColored());
    private static mesh: ƒ.MeshSphere = new ƒ.MeshSphere(15, 15);

    private radius: number;
    private v: ƒ.Vector3;
    private a: ƒ.Vector3;
    private lineSegments: LineSegment[];

    constructor(_position: ƒ.Vector3, _radius: number, _lineSegments: LineSegment[]) {
      super("Ball");
      this.radius = _radius;
      this.v = new ƒ.Vector3(0.065, 0, 0);
      this.a = new ƒ.Vector3(0, -3, 0);
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

    public lineBallCollisionHandler(lineSegments: LineSegment[]): void {
      let collisionEdges: LineSegment[] = new Array<LineSegment>();
      let position: ƒ.Vector2 = new ƒ.Vector2(this.mtxLocal.translation.x, this.mtxLocal.translation.y);
      for (let lineSegment of lineSegments) {
        let distance: number = lineSegment.distanceToPoint(position);
        if (distance <= this.radius / 2) {
          collisionEdges.push(lineSegment);
        }
      }

      if (collisionEdges.length > 0) {
        let vBefore: ƒ.Vector3 = this.v;
        let n: ƒ.Vector2;
        if (collisionEdges.length >= 2) {
          if (collisionEdges[0].distanceToPoint(position) == collisionEdges[1].distanceToPoint(position)) {
            if (collisionEdges[0].a > collisionEdges[0].b) {
              n = ƒ.Vector2.DIFFERENCE(collisionEdges[0].a, position);
            } else {
              n = ƒ.Vector2.DIFFERENCE(collisionEdges[0].b, position);
            }
          } else {
            let smallestDistance: number = Number.MAX_VALUE;
            let finalCollisionEdge: LineSegment = collisionEdges[0];
            for (let collisionEdge of collisionEdges) {
              let distance: number = collisionEdge.distanceToPoint(position);
              if (distance < smallestDistance) {
                smallestDistance = distance;
                finalCollisionEdge = collisionEdge;
              }
            }
            n = ƒ.Vector2.ORTHOGONAL(ƒ.Vector2.DIFFERENCE(finalCollisionEdge.b, finalCollisionEdge.a));
          }
        } else {
          n = ƒ.Vector2.ORTHOGONAL(ƒ.Vector2.DIFFERENCE(collisionEdges[0].b, collisionEdges[0].a));
        }
        n.normalize(1);
        let v: ƒ.Vector2 = new ƒ.Vector2(this.v.x, this.v.y);
        n.scale(2 * ƒ.Vector2.DOT(v, n));
        v.subtract(n);
        this.v.x = v.x;
        this.v.y = v.y;
        this.mtxLocal.translate(ƒ.Vector3.SCALE(vBefore, ( ƒ.Loop.timeFrameReal / 1000)));
      }
    }

    private update(_event: ƒ.Eventƒ): void {
      this.updateSpeed();
      this.updatePosition();
    }

    private updatePosition(): void {
      this.mtxLocal.translate(ƒ.Vector3.SCALE(this.v, ƒ.Loop.timeFrameReal / 1000));
      this.lineBallCollisionHandler(this.lineSegments);
    }

    private updateSpeed(): void {
      this.v = ƒ.Vector3.SUM(this.v, (ƒ.Vector3.SCALE(this.a, ƒ.Loop.timeFrameReal / 1000)));
    }
  }
}