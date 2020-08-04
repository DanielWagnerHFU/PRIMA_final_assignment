namespace V1 {
  export class Ball extends GameObject {
    private static material: ƒ.Material = new ƒ.Material("Ball", ƒ.ShaderFlat, new ƒ.CoatColored());
    private static mesh: ƒ.MeshSphere = new ƒ.MeshSphere(20, 20);

    private position: ƒ.Vector3;
    private position2: ƒ.Vector2;
    private radius: number;

    constructor(_position: ƒ.Vector3, _radius: number) {
      super("Ball");
      this.position = _position;
      this.position2 = new ƒ.Vector2(_position.x, _position.y);
      this.radius = _radius;
      this.init();
    }

    public hasCollision(lineSegments: LineSegment[]): boolean {
      let hasCollision: boolean = false;
      for (let lineSegment of lineSegments) {
        let distance: number = lineSegment.distanceToPoint(this.position2);
        if (distance <= this.radius / 2) {
          hasCollision = true;
        }
      }
      return hasCollision;
    }

    private init(): void {
      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0))));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Ball.material);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
      this.addComponent(cmpMaterial);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Ball.mesh);
      this.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(this.radius));
    }
  }
}