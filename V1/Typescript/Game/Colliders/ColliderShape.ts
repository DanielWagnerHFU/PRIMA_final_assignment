namespace V1 {
  export class ColliderShape extends GameObject {
    private static material: ƒ.Material = new ƒ.Material("Cube", ƒ.ShaderFlat, new ƒ.CoatColored());
    private static mesh: ƒ.MeshCube = new ƒ.MeshCube();

    private scale: number = 1;

    private lineSegments: LineSegment[];

    private leftShape: ColliderShape; //wenn null dann free
    private leftSideUnhandled: boolean = true;

    private topShape: ColliderShape; //wenn null dann free
    private topSideUnhandled: boolean = true;

    private rightShape: ColliderShape; //wenn null dann free
    private rightSideUnhandled: boolean = true;

    private bottomShape: ColliderShape; //wenn null dann free
    private bottomSideUnhandled: boolean = true;

    constructor(gameMatrix: number[][], x: number, y: number) {
      super("Shape");
      let position: ƒ.Vector2 = new ƒ.Vector2(x, y);
      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(position.toVector3(0))));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(ColliderShape.material);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
      this.addComponent(cmpMaterial);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(ColliderShape.mesh);
      this.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(this.scale));
    }
  }
}