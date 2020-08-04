namespace V1 {
  export class Camera extends ƒ.ComponentCamera {
    constructor() {
      super();
    }

    public init(): void {
      this.pivot.translate(new ƒ.Vector3(0, 0, 20));
      this.pivot.lookAt(ƒ.Vector3.ZERO());
      this.backgroundColor = ƒ.Color.CSS("black");      
    }
  }
}