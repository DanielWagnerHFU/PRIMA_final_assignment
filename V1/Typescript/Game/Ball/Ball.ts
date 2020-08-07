namespace V1 {
  export class Ball extends GameObject {
    private static material: ƒ.Material = new ƒ.Material("Ball", ƒ.ShaderFlat, new ƒ.CoatColored(new ƒ.Color(0.7, 0.8, 0.0, 1)));
    private static mesh: ƒ.MeshSphere = new ƒ.MeshSphere(12, 9);

    protected forces: Map<string, ƒ.Vector3>;
    protected mass: number = 1;
    protected a: ƒ.Vector3;
    protected lineSegments: LineSegment[];
    protected balls: Ball[];
    private radius: number;
    private v: ƒ.Vector3;
    private collisionDamping: number;
    private lastPosition: ƒ.Vector3;
    
    private listenerUpdate: EventListener;

    constructor(_position: ƒ.Vector3, _radius: number, _lineSegments: LineSegment[], _balls: Ball[]) {
      super("Ball");
      this.balls = _balls;
      this.balls.push(this);
      this.forces =  new Map<string, ƒ.Vector3>();
      this.radius = _radius;
      this.v = new ƒ.Vector3(0, 0, 0);
      this.collisionDamping = 0.95;
      this.lineSegments = _lineSegments;

      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)));
      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Ball.material);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
      this.addComponent(cmpMaterial);
      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Ball.mesh);
      this.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(this.radius));
      this.listenerUpdate = this.update.bind(this);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.listenerUpdate);
    }

    public getPosition(): ƒ.Vector3 {
      return this.mtxLocal.translation;
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
        console.log("COLLISION");
        let n: ƒ.Vector2;
        if (collisionEdges.length >= 2) {
          if (collisionEdges[0].distanceToPoint(position) == collisionEdges[1].distanceToPoint(position)) {
            console.log("CASE VERTEX");
            if (VectorMathHelper.distance(ƒ.Vector2.DIFFERENCE(collisionEdges[0].a, position)) > VectorMathHelper.distance(ƒ.Vector2.DIFFERENCE(collisionEdges[0].b, position))) {
              n = ƒ.Vector2.DIFFERENCE(collisionEdges[0].b, position);
            } else {
              n = ƒ.Vector2.DIFFERENCE(collisionEdges[0].a, position);
            }
          } else {
            console.log("CASE MULTIPLE EDGES");
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
          console.log("CASE EDGE");
          n = ƒ.Vector2.ORTHOGONAL(ƒ.Vector2.DIFFERENCE(collisionEdges[0].b, collisionEdges[0].a));
        }
        n.normalize(1);
        let v: ƒ.Vector2 = new ƒ.Vector2(this.v.x, this.v.y);
        n.scale(2 * ƒ.Vector2.DOT(v, n));
        v.subtract(n);
        this.v.x = v.x * this.collisionDamping;
        this.v.y = v.y * this.collisionDamping;
        this.mtxLocal.translation = this.lastPosition;
      }
    }

    protected updateAcceleration(): void {
      let forces: IterableIterator<ƒ.Vector3> = this.forces.values();
      this.a = new ƒ.Vector3(0, 0, 0);
      for (let force of forces) {
        this.a.add(ƒ.Vector3.SCALE(force, 1 / this.mass));
      }
    }

    private update(_event: ƒ.Eventƒ): void {
      this.updateAcceleration();
      this.updateSpeed();
      this.updatePosition();
    }



    private updatePosition(): void {
      this.lastPosition = this.mtxLocal.translation;
      this.mtxLocal.translate(ƒ.Vector3.SCALE(this.v, ƒ.Loop.timeFrameReal / 1000));
      this.lineBallCollisionHandler(this.lineSegments);
    }

    private updateSpeed(): void {
      this.v = ƒ.Vector3.SUM(this.v, (ƒ.Vector3.SCALE(this.a, ƒ.Loop.timeFrameReal / 1000)));
    }
  }
}