namespace V1 {
  export class ColliderQuad extends GameObject {
    private static material: ƒ.Material = new ƒ.Material("Cube", ƒ.ShaderFlat, new ƒ.CoatColored());
    private static mesh: ƒ.MeshCube = new ƒ.MeshCube();

    private position: ƒ.Vector3;

    private lineSegments: LineSegment[];

    constructor(_scale: number, _position: ƒ.Vector3) {
      super("Quad");
      this.position = _position;
      this.init(_scale, _position);
    }

    public getLineSegments(): LineSegment[] {
      return this.lineSegments;
    }

    private init(_scale: number, _position: ƒ.Vector3): void {
      let a: ƒ.Vector2 = new ƒ.Vector2(_position.x - (_scale / 2), _position.y + (_scale / 2));
      let b: ƒ.Vector2 = new ƒ.Vector2(_position.x + (_scale / 2), _position.y + (_scale / 2));
      let c: ƒ.Vector2 = new ƒ.Vector2(_position.x + (_scale / 2), _position.y - (_scale / 2));
      let d: ƒ.Vector2 = new ƒ.Vector2(_position.x - (_scale / 2), _position.y - (_scale / 2));
      this.lineSegments = new Array<LineSegment>();
      this.lineSegments.push(new LineSegment(a, b));
      this.lineSegments.push(new LineSegment(b, c));
      this.lineSegments.push(new LineSegment(c, d));
      this.lineSegments.push(new LineSegment(d, a));

      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(ColliderQuad.material);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
      this.addComponent(cmpMaterial);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(ColliderQuad.mesh);
      this.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(_scale));
    }
  }
}