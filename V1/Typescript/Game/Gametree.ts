namespace V1 {

  import ƒAid = FudgeAid;

  export class Gametree extends GameObject {

    private lineSegments: LineSegment[];
    private balls: Ball[];
    private shapes: ColliderShape[];
    private player: PlayerBall;

    constructor(name: string) {
      super(name);
      this.lineSegments = new Array<LineSegment>();
      this.balls = new Array<Ball>();
      this.shapes = new Array<ColliderShape>();
    }

    public getPlayer(): PlayerBall {
      return this.player;
    }

    public init(gameCanvis: GameCanvas, _game: DefenseGame): void {
      let m: number[][] = 
      [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 , 1], 
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 1], 
      [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 1], 
      [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 1], 
      [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0 , 1], 
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 1], 
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 1], 
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 1], 
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0 , 1], 
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 , 1], 
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 , 1], 
      [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 , 1],
      [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 , 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 1],
      [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 1],
      [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0 , 1],
      [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 , 1]]; 
      this.generateWorldFromMatrix(m);
      this.generatePlayer(gameCanvis, m);
      this.generateGoal(m, _game);
      ƒAid.addStandardLightComponents(this, new ƒ.Color(0.6, 0.6, 0.6));
    }

    private generateWorldFromMatrix(gameMatrix: number[][]): void {
      let shapeMatrix: ColliderShape[][] = [];
      for (let x: number = 0; x < gameMatrix.length; x++) {
        shapeMatrix[x] = [];
        for (let y: number = 0; y < gameMatrix[0].length; y++) {
            if (gameMatrix[x][y] == 1) {
              shapeMatrix[x][y] = new ColliderShape(shapeMatrix, x, y, this.lineSegments);
              this.addChild(shapeMatrix[x][y]);
              this.shapes.push(shapeMatrix[x][y]);
            } else {
              shapeMatrix[x][y] = null;         
            }
        }
      }

      for (let x: number = 0; x < gameMatrix.length; x++) {
        for (let y: number = 0; y < gameMatrix[0].length; y++) {
          if (shapeMatrix[x][y] != null) {
            shapeMatrix[x][y].setNeighbours();
          }
        }
      }

      for (let x: number = 0; x < gameMatrix.length; x++) {
        for (let y: number = 0; y < gameMatrix[0].length; y++) {
          if (shapeMatrix[x][y] != null) {
            shapeMatrix[x][y].generateLineSegments();
          }
        }
      }
    }

    private generatePlayer(gameCanvis: GameCanvas, gameMatrix: number[][]): void {
      for (let x: number = 0; x < gameMatrix.length; x++) {
        for (let y: number = 0; y < gameMatrix[0].length; y++) {
          if (gameMatrix[x][y] == 2) {
            this.player = new PlayerBall(new ƒ.Vector3(x, y, 0), 0.7, this.lineSegments, this.balls, gameCanvis.getViewport());
            this.addChild(this.player);
          }
        }
      }
    }

    private generateGoal(gameMatrix: number[][], game: DefenseGame): void {
      for (let x: number = 0; x < gameMatrix.length; x++) {
        for (let y: number = 0; y < gameMatrix[0].length; y++) {
          if (gameMatrix[x][y] == 3) {
            this.addChild(new Goal(new ƒ.Vector3(x, y, 0), 0.8, this.balls, game));
          }
        }
      }
    }
  }
}