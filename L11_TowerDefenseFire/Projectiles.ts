namespace L11_TowerDefenseFire {
  export class Projectile extends ƒ.Node {
    private static material: ƒ.Material = new ƒ.Material("Projectile", ƒ.ShaderFlat, new ƒ.CoatColored());
    private static mesh: ƒ.MeshCube = new ƒ.MeshCube();
    private speed: number = 10 / 1000;
    private target: Enemy;
    private demage: number;
    private elistener: EventListener;

    constructor(_start: ƒ.Vector3, _target: Enemy) {
      super("Projectile");
      this.target = _target;
      this.demage = 0.5;

      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_start)));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Projectile.material);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("red");
      this.addComponent(cmpMaterial);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Projectile.mesh);
      this.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.2));
      this.elistener = this.update.bind(this);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.elistener);
      console.log("Projectile flying");
    }

    private update(_event: ƒ.Eventƒ): void {
      if (this.target.isAlive) {
        let position: ƒ.Vector3 = this.mtxLocal.translation;
        let distance: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(this.target.mtxLocal.translation, position);
        let distanceToTravel: number = this.speed * ƒ.Loop.timeFrameGame;
        let travel: ƒ.Vector3 = ƒ.Vector3.NORMALIZATION(distance, distanceToTravel);
        this.mtxLocal.translate(travel);
  
        if (this.hitTarget()) {
          this.explode();
        }
      } else {
        this.explode();
      }
    }

    private hitTarget(): boolean {
      let position: ƒ.Vector3 = this.mtxLocal.translation;
      let distance: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(this.target.mtxLocal.translation, position);
      let magnitude: number = distance.magnitude;
      if (magnitude <= 0.2) {
        console.log("Target is hit");
        return true;
      } else {
        return false;
      }
    }

    private explode(): void {
      console.log("Projectile exploding");
      if (this.target.isAlive) {
        this.target.getDemaged(this.demage);
      }
      ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, this.elistener);
      viewport.getGraph().removeChild(this);
    }
  }
}