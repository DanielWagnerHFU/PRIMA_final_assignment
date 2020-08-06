namespace V1 {

  import ƒAid = FudgeAid;

  export class Gametree extends GameObject {

    private lineSegments: LineSegment[];

    constructor(name: string) {
      super(name);
      this.lineSegments = new Array<LineSegment>();
    }

    public init(gameCanvis: GameCanvas): void {

      // for (let i: number = -50; i < 50; i++) {
      //   this.addChild(new ColliderQuad(1, new ƒ.Vector3(i, 0, 0), this.lineSegments));
      // }

      // this.addChild(new PlayerBall(new ƒ.Vector3(0.4, 5, 0), 1, this.lineSegments, gameCanvis.getViewport()));
      // this.addChild(new Ball(new ƒ.Vector3(2, 4, 0), 1, this.lineSegments));
      // this.addChild(new Ball(new ƒ.Vector3(4, 6, 0), 1, this.lineSegments));
      // this.addChild(new Ball(new ƒ.Vector3(6, 6, 0), 1, this.lineSegments));
      // this.addChild(new Ball(new ƒ.Vector3(-2, 6, 0), 1, this.lineSegments));
      // this.addChild(new Ball(new ƒ.Vector3(-4, 6, 0), 1, this.lineSegments));

      // this.addChild(new ColliderRectangle(new ƒ.Vector3(2, 1, 1), new ƒ.Vector3(0, 3, 0), this.lineSegments));
      let m: number[][] = 
      [[1, 1, 1, 1, 1], 
      [1, 1, 0, 1, 1], 
      [1, 1, 0, 1, 1], 
      [1, 1, 1, 1, 1]];
      this.generateWorldFromMatrix(m);
      this.generatePlayer(gameCanvis);
      ƒAid.addStandardLightComponents(this, new ƒ.Color(0.9, 0.6, 0.6));
    }

    private generateWorldFromMatrix(gameMatrix: number[][]): void {
      let shapeMatrix: ColliderShape[][] = [];
      for (let x: number = 0; x < gameMatrix.length; x++) {
        shapeMatrix[x] = [];
        for (let y: number = 0; y < gameMatrix[0].length; y++) {
            if (gameMatrix[x][y] == 1) {
              shapeMatrix[x][y] = new ColliderShape(shapeMatrix, x, y, this.lineSegments);
              this.addChild(shapeMatrix[x][y]);
            } else {
              shapeMatrix[x][y] = null;         
            }
        }
      }

      for (let x: number = 0; x < gameMatrix.length; x++) {
        for (let y: number = 0; y < gameMatrix[0].length; y++) {
          shapeMatrix[x][y].setNeighbours();
        }
      }
    }

    private generatePlayer(gameCanvis: GameCanvas): void {
      this.addChild(new PlayerBall(new ƒ.Vector3(0.4, 5, 0), 1, this.lineSegments, gameCanvis.getViewport()));
    }
  }
}