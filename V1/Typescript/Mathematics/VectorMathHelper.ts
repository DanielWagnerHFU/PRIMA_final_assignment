namespace V1 {
  export class VectorMathHelper {
    public static distance(a: ƒ.Vector2): number {
      return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
    }
  }
}