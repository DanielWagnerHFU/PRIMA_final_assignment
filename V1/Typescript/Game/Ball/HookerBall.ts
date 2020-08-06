namespace V1 {
  export class HookerBall extends Ball {
    private static hookmaterial: ƒ.Material = new ƒ.Material("hook", ƒ.ShaderFlat, new ƒ.CoatColored());
    private static hookmesh: ƒ.MeshCube = new ƒ.MeshCube();

    private listener: EventListener;
    private hookNode: GameObject;

    constructor(_position: ƒ.Vector3, _radius: number, _lineSegments: LineSegment[]) {
      super(_position, _radius, _lineSegments);
      this.listener = null;
      this.hook = null;
    }

    protected hook(direction: ƒ.Vector2): void {
      let ip: ƒ.Vector2 = this.hookIntersectionPoint(direction);

      this.hookNode = new GameObject("Hook"); //TODO GENERATE HOOK NODE
      
      //this.hookNode.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(this.position)));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(HookerBall.hookmaterial);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
      this.hookNode.addComponent(cmpMaterial);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(HookerBall.hookmesh);
      this.hookNode.addComponent(cmpMesh);
      cmpMesh.pivot.scale(ƒ.Vector3.ONE(1));

      this.addChild(this.hookNode);
      this.listener = this.updateHook.bind(this);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.listener);

      //TODO
      //start with a normalized very short direction vector and make it longer until max - always looking for a line intersection
      //If no intersection as found dont do anything
      //If a intersection was found draw a rectangle from the body to the intersection point

      //update this when the ball moves
        //method: calculate new vector between position and intersectionpoint
          //update the rectangle 
          //also update a based on new vector
    }

    protected unhook(): void {
      ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, this.listener);
      this.removeChild(this.hookNode);
      this.hookNode = null;
    }

    private updateHook(_event: ƒ.Eventƒ): void {
      //TODO
    }

    private hookIntersectionPoint(direction: ƒ.Vector2): ƒ.Vector2 {
      direction.normalize(0.05);
      let a: LineSegment = new LineSegment(this.mtxLocal.translation.toVector2(), ƒ.Vector2.SUM(this.mtxLocal.translation.toVector2(), direction));
      while (this.intersectionPoint(a) == null) {
        a.b.add(direction);
      }
      return this.intersectionPoint(a);
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