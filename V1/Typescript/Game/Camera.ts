namespace V1 {
  export class Camera extends ƒ.ComponentCamera {
    constructor() {
      super();
    }

    public init(): void {
      this.pivot.translate(new ƒ.Vector3(4, 4, 20));
      this.pivot.lookAt(new ƒ.Vector3(4, 4, 0));
      this.backgroundColor = ƒ.Color.CSS("black");      
    }
  }
}