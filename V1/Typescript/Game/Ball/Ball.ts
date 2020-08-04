namespace V1 {
  export class Ball extends GameObject {
    private static material: ƒ.Material = new ƒ.Material("Ball", ƒ.ShaderFlat, new ƒ.CoatColored());
    private static mesh: ƒ.MeshSphere = new ƒ.MeshSphere(20, 20);

    constructor(_name: string) {
      super(name);
      this.init();
    }

    private init(): void {
      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0))));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Ball.material);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
      this.addComponent(cmpMaterial);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Ball.mesh);
      this.addComponent(cmpMesh);
      //cmpMesh.pivot.scale(ƒ.Vector3.ONE(1));
    }
  }
}