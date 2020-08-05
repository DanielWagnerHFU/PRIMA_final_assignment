namespace V1 {

  import ƒAid = FudgeAid;

  export class Gametree extends GameObject {

    constructor(name: string) {
      super(name);
    }

    public init(gameCanvis: GameCanvas): void {
      // let material: ƒ.Material = new ƒ.Material("Projectile", ƒ.ShaderFlat, new ƒ.CoatColored());
      // let mesh: ƒ.MeshCube = new ƒ.MeshCube();
      // this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0))));

      // let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
      // cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
      // this.addComponent(cmpMaterial);

      // let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
      // this.addComponent(cmpMesh);
      // cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.2));
      let quad: ColliderQuad = new ColliderQuad(1, new ƒ.Vector3(0, 0, 0));
      let quad2: ColliderQuad = new ColliderQuad(1, new ƒ.Vector3(1.5, 0, 0));
      let quad3: ColliderQuad = new ColliderQuad(1, new ƒ.Vector3(3, 0, 0));
      let quad4: ColliderQuad = new ColliderQuad(1, new ƒ.Vector3(4.5, 0, 0));
      let linesegments: LineSegment[] = quad.getLineSegments();
      let linesegments2: LineSegment[] = quad2.getLineSegments();
      let linesegments3: LineSegment[] = quad3.getLineSegments();
      let linesegments4: LineSegment[] = quad4.getLineSegments();
      linesegments = linesegments.concat(linesegments2, linesegments3, linesegments4);
      console.log(linesegments.length);
      let ball1: PlayerBall = new PlayerBall(new ƒ.Vector3(0.4, 5, 0), 1, linesegments, gameCanvis.getViewport());
      let ball2: Ball = new Ball(new ƒ.Vector3(2, 4, 0), 1, linesegments);
      let ball3: Ball = new Ball(new ƒ.Vector3(3.2, 6, 0), 1, linesegments);
      this.addChild(quad);
      this.addChild(quad2);
      this.addChild(quad3);
      this.addChild(quad4);
      this.addChild(ball1);
      this.addChild(ball2);
      this.addChild(ball3);
      ƒAid.addStandardLightComponents(this, new ƒ.Color(0.6, 0.6, 0.6));
    }
  }
}