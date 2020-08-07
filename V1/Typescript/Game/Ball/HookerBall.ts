namespace V1 {
  export class HookerBall extends Ball {
    private static hookmaterial: ƒ.Material = new ƒ.Material("hook", ƒ.ShaderFlat, new ƒ.CoatColored(new ƒ.Color(0.3, 0.4, 0.0, 1)));
    private static hookmesh: ƒ.MeshCube = new ƒ.MeshCube();

    private listener: EventListener;
    private hookNode: GameObject;
    private cmpMesh: ƒ.Matrix4x4;
    private ip: ƒ.Vector3;

    constructor(_position: ƒ.Vector3, _radius: number, _lineSegments: LineSegment[], _balls: Ball[]) {
      super(_position, _radius, _lineSegments, _balls);
      this.listener = null;
      this.hook = null;
    }

    protected hook(direction: ƒ.Vector2): void {
      this.ip = this.hookIntersectionPoint(direction).toVector3(0);
      if (this.ip != null) {
        this.hookNode = new GameObject("Hook"); //TODO GENERATE HOOK NODE
      
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(HookerBall.hookmaterial);
        cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
        this.hookNode.addComponent(cmpMaterial);
  
        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(HookerBall.hookmesh);
        this.hookNode.addComponent(cmpMesh);
        cmpMesh.pivot.scale(new ƒ.Vector3(1, 0.1 , 0.1));
        this.cmpMesh = cmpMesh.pivot;

        this.hookNode.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0 , 0))));

        this.addChild(this.hookNode);
        this.updateHook(null);
        this.listener = this.updateHook.bind(this);
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.listener);
      }
    }

    protected unhook(): void {
      this.forces.delete("hook");
      ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, this.listener);
      this.removeChild(this.hookNode);
      this.hookNode = null;
    }

    private updateHook(_event: ƒ.Eventƒ): void {
      let connectionVector: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(this.ip, this.mtxLocal.translation);
      let connectionVectorNormalized: ƒ.Vector3 = ƒ.Vector3.NORMALIZATION(connectionVector, 1);
      this.cmpMesh.scaling = new ƒ.Vector3(connectionVector.magnitude, 0.1, 0.1);
      this.hookNode.mtxLocal.translation = ƒ.Vector3.SCALE(connectionVector, 0.5);
      let cv: ƒ.Vector2 = connectionVector.toVector2();
      this.hookNode.mtxLocal.rotation = new ƒ.Vector3(0, 0, Math.atan2(cv.y, cv.x) * 180 / Math.PI);
      connectionVector.scale(2.0);
      connectionVectorNormalized.scale(3);
      this.forces.set("hook", ƒ.Vector3.SUM(connectionVectorNormalized, connectionVector));
    }

    private hookIntersectionPoint(direction: ƒ.Vector2): ƒ.Vector2 {
      direction.normalize(0.01);
      let a: LineSegment = new LineSegment(this.mtxLocal.translation.toVector2(), ƒ.Vector2.SUM(this.mtxLocal.translation.toVector2(), direction));
      let i: number = 0;
      while (this.intersectionPoint(a) == null && i < 750) {
        a.b.add(direction);
        i++;
      }
      return ƒ.Vector2.SUM(this.intersectionPoint(a), ƒ.Vector2.SCALE(direction , 5));
    }

    private intersectionPoint(a: LineSegment): ƒ.Vector2 {
      let ip: ƒ.Vector2 = null;
      for (let b of this.lineSegments) {
        if (b.getIntersectionPoint(a) != null) {
          ip = b.getIntersectionPoint(a);
        }
      }
      return ip;
    }
  }
}