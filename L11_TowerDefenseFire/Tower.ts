namespace L11_TowerDefenseFire {
  import ƒAid = FudgeAid;
  export class Tower extends ƒ.Node {
    private static material: ƒ.Material = new ƒ.Material("Tower", ƒ.ShaderFlat, new ƒ.CoatColored());
    private static meshBase: ƒ.MeshPyramid = new ƒ.MeshPyramid();
    private static meshTop: ƒ.MeshSphere = new ƒ.MeshSphere(10, 4);
    private static meshGun: ƒ.MeshCube = new ƒ.MeshCube();

    //private health: number = 1;
    //private strength: number = 0.1;
    private range: number = 4;
    //private rate: number = 0.5;

    private top: ƒ.Node;
    private gun: ƒ.Node;
    private target: Enemy;

    private elistener: EventListener;

    constructor(_name: string, _pos: ƒ.Vector3) {
      super(_name);
      let base: ƒAid.Node = new ƒAid.Node("Base", null, Tower.material, Tower.meshBase);
      this.top = new ƒAid.Node("Top", ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(1)), Tower.material, Tower.meshTop);
      let mtxTop: ƒ.Matrix4x4 = this.top.getComponent(ƒ.ComponentMesh).pivot;
      mtxTop.rotateZ(90);
      this.gun = new ƒAid.Node("Base", ƒ.Matrix4x4.IDENTITY(), Tower.material, Tower.meshGun);
      let mtxGun: ƒ.Matrix4x4 = this.gun.getComponent(ƒ.ComponentMesh).pivot;
      mtxGun.scale(new ƒ.Vector3(0.1, 0.1, 1));
      mtxGun.translateZ(0.5);

      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_pos)));
      this.addChild(base);
      this.addChild(this.top);
      this.top.addChild(this.gun);
      this.target = null;

      this.elistener = this.update.bind(this);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.elistener);
    }

    public shoot(): void {
      if (this.target != null) {
        let projectile: Projectile = new Projectile(this.top.mtxWorld.translation, this.target);
        viewport.getGraph().addChild(projectile);
        console.log("Projectile started", projectile);
      }
    }

    private followTarget(): void {
      if (this.target != null) {
        this.top.cmpTransform.lookAt(this.target.mtxWorld.translation, ƒ.Vector3.Y());
      }
    }

    private update(_event: ƒ.Eventƒ): void {
      this.updateTarget();
      this.followTarget();
    }

    private updateTarget(): void {
      
      if (this.target != null) {
        if (!this.enemyIsInRange(this.target)) {
          this.target = null;
        }
        if (!this.target.isAlive) {
          this.target = null;
        }
      } else {
        let enemys: ƒ.Node[] = viewport.getGraph().getChildrenByName("Enemy");
        let closestEnemy: Enemy = this.closestEnemy(enemys);
        if (this.enemyIsInRange(closestEnemy)) {
          this.target = closestEnemy;
        }
      }
    }

    private closestEnemy(enemys: ƒ.Node[]): Enemy {
      let closestEnemy: ƒ.Node = enemys[0];
      let smallestdistanceToTower: number = this.range + 1;
      for (let i: number = 0; i < enemys.length; i++) {
        let distance: number = this.distanceToEnemy(enemys[i]);
        if (distance < smallestdistanceToTower) {
          closestEnemy = enemys[i];
          smallestdistanceToTower = distance;
        }
      }
      return <Enemy> closestEnemy;
    }

    private distanceToEnemy(_enemy: ƒ.Node): number {
      return ƒ.Vector3.DIFFERENCE(this.mtxWorld.translation, _enemy.mtxWorld.translation).magnitudeSquared;
    }

    private enemyIsInRange(_enemy: ƒ.Node): boolean {
      if (this.distanceToEnemy(_enemy) > (this.range * this.range)) {
        return false;
      } else {
        return true;
      }
    }
  }
}