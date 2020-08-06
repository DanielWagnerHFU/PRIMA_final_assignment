namespace V1 {
  export class ColliderShape extends GameObject {
    private static material: ƒ.Material = new ƒ.Material("Cube", ƒ.ShaderFlat, new ƒ.CoatColored());
    private static mesh: ƒ.MeshCube = new ƒ.MeshCube();

    public leftShape: ColliderShape; //wenn null dann free
    public leftSideUnhandled: boolean = true;

    public topShape: ColliderShape; //wenn null dann free
    public topSideUnhandled: boolean = true;

    public rightShape: ColliderShape; //wenn null dann free
    public rightSideUnhandled: boolean = true;

    public bottomShape: ColliderShape; //wenn null dann free
    public bottomSideUnhandled: boolean = true;
    private scale: number = 1;
    private gameMatrix: ColliderShape[][];
    private x: number;
    private y: number;

    private lineSegments: LineSegment[];

    constructor(_gameMatrix: ColliderShape[][], x: number, y: number, _lineSegments: LineSegment[]) {
      super("Shape");
      this.gameMatrix = _gameMatrix;
      this.x = x;
      this.y = y;
      this.lineSegments = _lineSegments;

      let position: ƒ.Vector2 = new ƒ.Vector2(x, y);
      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(position.toVector3(0))));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(ColliderShape.material);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
      this.addComponent(cmpMaterial);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(ColliderShape.mesh);
      this.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(this.scale));
    }

    public generateLineSegments(): void {
      if (this.topShape == null && this.topSideUnhandled) {
        // Setze Handled //Schaue Links //Checke top
        // Setze Handled //Schaue Rechts //Checke top
      }
      if (this.rightShape == null && this.rightSideUnhandled) {
        //TODO
      }
      if (this.bottomShape == null && this.bottomSideUnhandled) {
        //TODO
      }
      if (this.leftShape == null && this.leftSideUnhandled) {
        //TODO
      }
    }

    public setNeighbours(): void {
      if (this.x + 1 < this.gameMatrix.length) {
        this.rightShape = this.gameMatrix[this.x + 1][this.y];
      } else {
        this.rightShape = null;
      }
      if (this.x - 1 >= 0) {
        this.leftShape = this.gameMatrix[this.x - 1][this.y];
      } else {
        this.leftShape = null;
      }
      if (this.y + 1 < this.gameMatrix[0].length) {
        this.topShape = this.gameMatrix[this.x][this.y + 1];
      } else {
        this.topShape = null;
      }
      if (this.y - 1 >= 0) {
        this.bottomShape = this.gameMatrix[this.x][this.y - 1];
      } else {
        this.bottomShape = null;
      }
    }
  }
}