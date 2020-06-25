namespace L11_TowerDefenseFire {
  export class Enemy extends ƒ.Node {
    private static material: ƒ.Material = new ƒ.Material("Enemy", ƒ.ShaderFlat, new ƒ.CoatColored());
    private static mesh: ƒ.MeshSphere = new ƒ.MeshSphere(4, 2);

    public isAlive: boolean;
    private speed: number = 1 / 1000;
    private nextWaypoint: number = 0;
    private elistener: EventListener;
    private health: number = 1;
    private path: Path;

    constructor(_pos: ƒ.Vector3, _path: Path) {
      super("Enemy");
      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_pos)));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Enemy.material);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("lightblue");
      this.addComponent(cmpMaterial);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Enemy.mesh);
      this.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.5));
      cmpMesh.pivot.translateY(0.5);
      this.elistener = this.update.bind(this);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.elistener);
      this.isAlive = true;
      this.path = _path;
    }

    public getDemaged(_demage: number): void {
      this.health -= _demage;
    }

    private update(_event: ƒ.Eventƒ): void {
      let distanceToTravel: number = this.speed * ƒ.Loop.timeFrameGame;
      let move: ƒ.Vector3;
      while (true) {
        if (this.health <= 0) {
          this.die();
          break;
        }
        move = ƒ.Vector3.DIFFERENCE(this.path[this.nextWaypoint], this.mtxLocal.translation);
        if (move.magnitudeSquared > distanceToTravel * distanceToTravel)
          break;

        this.nextWaypoint = ++this.nextWaypoint % (sizeTerrain + 1);
        if (this.nextWaypoint == 0)
          this.mtxLocal.translation = this.path[0];
      }

      this.mtxLocal.translate(ƒ.Vector3.NORMALIZATION(move, distanceToTravel));
    }

    private die(): void {
      console.log("Enemy died");
      this.isAlive = false;
      ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, this.elistener);
      viewport.getGraph().removeChild(this);
    }
  }
}