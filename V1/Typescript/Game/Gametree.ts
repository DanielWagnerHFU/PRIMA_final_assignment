namespace V1 {
  export class Gametree extends GameObject {

    constructor(name: string) {
      super(name);
    }

    public init(): void {
      // let material: ƒ.Material = new ƒ.Material("Projectile", ƒ.ShaderFlat, new ƒ.CoatColored());
      // let mesh: ƒ.MeshCube = new ƒ.MeshCube();
      // this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0))));

      // let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
      // cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
      // this.addComponent(cmpMaterial);

      // let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
      // this.addComponent(cmpMesh);
      // cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.2));
      let ball: Ball = new Ball("Ball");
      this.addChild(ball);
    }
  }
}