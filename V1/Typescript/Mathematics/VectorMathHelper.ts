namespace V1 {
  export class VectorMathHelper {
    public static distance(a: ƒ.Vector2): number {
      return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
    }

    public static difference(a: ƒ.Vector2, b: ƒ.Vector2): ƒ.Vector2 {
      let ax: number = a.x;
      let ay: number = a.y;
      let bx: number = b.x;
      let by: number = b.y;
      console.log(ax.toString() + bx.toString());
      console.log(((bx) - (ax)).toString());
      return new ƒ.Vector2((bx) - (ax) , (by) - (ay));

    }
  }
}