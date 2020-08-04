namespace V1 {
  export class LineSegment {
    public a: ƒ.Vector2;
    public b: ƒ.Vector2;

    constructor(_a: ƒ.Vector2, _b: ƒ.Vector2) {
      this.a = _a;
      this.b = _b;
    }

    public getIntersectionPoint(lineSegment2: LineSegment): ƒ.Vector2 {
      let from1: ƒ.Vector2 = this.a;
      let to1: ƒ.Vector2 = this.b;
      let from2: ƒ.Vector2 = lineSegment2.a;
      let to2: ƒ.Vector2 = lineSegment2.b;
      const dX: number = to1.x - from1.x;
      const dY: number = to1.y - from1.y;
      const determinant: number = dX * (to2.y - from2.y) - (to2.x - from2.x) * dY;
      if (determinant === 0) {
        return null; 
      } else {
        const lambda: number = ((to2.y - from2.y) * (to2.x - from1.x) + (from2.x - to2.x) * (to2.y - from1.y)) / determinant;
        const gamma: number = ((from1.y - to1.y) * (to2.x - from1.x) + dX * (to2.y - from1.y)) / determinant;
        if (!(0 <= lambda && lambda <= 1) || !(0 <= gamma && gamma <= 1)) {
          return null;
        } else {
          return new ƒ.Vector2(from1.x + lambda * dX, from1.y + lambda * dY);
        }
      }
    }
    
    public distanceToPoint(p: ƒ.Vector2): number {
      return Math.sqrt(this.distToSegmentSquared(p, this.a, this.b));
    }

    private distToSegmentSquared(p: ƒ.Vector2, v: ƒ.Vector2, w: ƒ.Vector2): number {
      let l2: number = this.dist2(v, w);
      if (l2 == 0) return this.dist2(p, v);
      let t: number = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
      t = Math.max(0, Math.min(1, t));
      return this.dist2(p, new ƒ.Vector2(v.x + t * (w.x - v.x), v.y + t * (w.y - v.y) ));
    }

    private dist2(v: ƒ.Vector2, w: ƒ.Vector2): number {
      return Math.pow((v.x - w.x), 2) + Math.pow((v.y - w.y), 2);
    }
  }
}