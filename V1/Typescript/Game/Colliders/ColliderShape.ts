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
      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(position.toVector3(Math.random() * (-0.3 - 0.3) + -0.3))));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(ColliderShape.material);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
      this.addComponent(cmpMaterial);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(ColliderShape.mesh);
      this.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(this.scale));
    }

    public generateLineSegments(): void {
      //Diese Methode sollte man am besten schnell vergessen und nicht im Detail anschauen.
      //Kurz gesagt: es werden die Körper mit LineSegments umlegt aber dabei wird darauf geachtet dass keine LineSegments im Körper sind
      //Und dass keine LineSegments nebeneinander sind - stattdessen wird über mehrere Cubes hinweg ein LineSegment gelegt.
      //Das ganze ist garnicht mal so einfach und auf die kürze ist das alles was mir eingefallen ist. 
      if (this.topShape == null && this.topSideUnhandled) {
        this.topSideUnhandled = false;

        let currentShape: ColliderShape = this;
        let lengthRight: number = 0;
        while (currentShape.rightShape != null && currentShape.rightShape.topShape == null) {
          currentShape = currentShape.rightShape;
          lengthRight = lengthRight + 1;
          currentShape.topSideUnhandled = false;
        }
        currentShape = this;
        let lengthLeft: number = 0;
        while (currentShape.leftShape != null && currentShape.leftShape.topShape == null) {
          currentShape = currentShape.rightShape;
          lengthLeft = lengthLeft + 1;
          currentShape.topSideUnhandled = false;
        }
        let a: ƒ.Vector2 = new ƒ.Vector2(this.x - (this.scale / 2) - lengthLeft, this.y + (this.scale / 2));
        let b: ƒ.Vector2 = new ƒ.Vector2(this.x + (this.scale / 2) + lengthRight, this.y + (this.scale / 2));
        this.lineSegments.push(new LineSegment(a, b));
      }
      if (this.rightShape == null && this.rightSideUnhandled) {
        this.rightSideUnhandled = false;

        let currentShape: ColliderShape = this;
        let lengthTop: number = 0;
        while (currentShape.topShape != null && currentShape.topShape.rightShape == null) {
          currentShape = currentShape.topShape;
          lengthTop = lengthTop + 1;
          currentShape.rightSideUnhandled = false;
        }
        currentShape = this;
        let lengthBottom: number = 0;
        while (currentShape.bottomShape != null && currentShape.bottomShape.rightShape == null) {
          currentShape = currentShape.bottomShape;
          lengthBottom = lengthBottom + 1;
          currentShape.rightSideUnhandled = false;
        }
        let a: ƒ.Vector2 = new ƒ.Vector2(this.x + (this.scale / 2), this.y + (this.scale / 2) + lengthTop);
        let b: ƒ.Vector2 = new ƒ.Vector2(this.x + (this.scale / 2), this.y - (this.scale / 2) - lengthBottom);
        this.lineSegments.push(new LineSegment(a, b));
      }
      if (this.bottomShape == null && this.bottomSideUnhandled) {
        this.bottomSideUnhandled = false;

        let currentShape: ColliderShape = this;
        let lengthRight: number = 0;
        while (currentShape.rightShape != null && currentShape.rightShape.bottomShape == null) {
          currentShape = currentShape.rightShape;
          lengthRight = lengthRight + 1;
          currentShape.bottomSideUnhandled = false;
        }
        currentShape = this;
        let lengthLeft: number = 0;
        while (currentShape.leftShape != null && currentShape.leftShape.bottomShape == null) {
          currentShape = currentShape.rightShape;
          lengthLeft = lengthLeft + 1;
          currentShape.bottomSideUnhandled = false;
        }
        let a: ƒ.Vector2 = new ƒ.Vector2(this.x - (this.scale / 2) - lengthLeft, this.y - (this.scale / 2));
        let b: ƒ.Vector2 = new ƒ.Vector2(this.x + (this.scale / 2) + lengthRight, this.y - (this.scale / 2));
        this.lineSegments.push(new LineSegment(a, b));
      }
      if (this.leftShape == null && this.leftSideUnhandled) {
        this.leftSideUnhandled = false;

        let currentShape: ColliderShape = this;
        let lengthTop: number = 0;
        while (currentShape.topShape != null && currentShape.topShape.leftShape == null) {
          currentShape = currentShape.topShape;
          lengthTop = lengthTop + 1;
          currentShape.leftSideUnhandled = false;
        }
        currentShape = this;
        let lengthBottom: number = 0;
        while (currentShape.bottomShape != null && currentShape.bottomShape.leftShape == null) {
          currentShape = currentShape.bottomShape;
          lengthBottom = lengthBottom + 1;
          currentShape.leftSideUnhandled = false;
        }
        let a: ƒ.Vector2 = new ƒ.Vector2(this.x - (this.scale / 2), this.y + (this.scale / 2) + lengthTop);
        let b: ƒ.Vector2 = new ƒ.Vector2(this.x - (this.scale / 2), this.y - (this.scale / 2) - lengthBottom);
        this.lineSegments.push(new LineSegment(a, b));
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