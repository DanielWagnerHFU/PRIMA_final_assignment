"use strict";
var V1;
(function (V1) {
    window.addEventListener("load", main);
    ƒ.RenderManager.initialize(true);
    function main(_event) {
        let game = new V1.DefenseGame();
        game.init();
        game.startLoop();
        //testLineSegment1();
        //testLineSegment2();
    }
    function testLineSegment1() {
        let ls = new V1.LineSegment(new ƒ.Vector2(0, 0), new ƒ.Vector2(0, 10));
        let distance = ls.distanceToPoint(new ƒ.Vector2(-1.5, -1));
        let para = document.createElement("p");
        let node = document.createTextNode(distance.toString());
        para.appendChild(node);
        document.body.appendChild(para);
    }
    function testLineSegment2() {
        let ls1 = new V1.LineSegment(new ƒ.Vector2(-5, 0), new ƒ.Vector2(5, 0));
        let ls2 = new V1.LineSegment(new ƒ.Vector2(-5, -2), new ƒ.Vector2(5, 1));
        let ip = ls1.getIntersectionPoint(ls2);
        let para = document.createElement("p");
        let node = document.createTextNode(ip.toString());
        para.appendChild(node);
        document.body.appendChild(para);
    }
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class Camera extends ƒ.ComponentCamera {
        constructor() {
            super();
        }
        init() {
            this.pivot.translate(new ƒ.Vector3(0, 0, 20));
            this.pivot.lookAt(ƒ.Vector3.ZERO());
            this.backgroundColor = ƒ.Color.CSS("black");
        }
    }
    V1.Camera = Camera;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class DefenseGame {
        init() {
            this.gametree = new V1.Gametree("gametree");
            this.gametree.init();
            let camera = new V1.Camera();
            camera.init();
            this.gcanvas = new V1.GameCanvas();
            this.gcanvas.init(this.gametree, camera);
            document.querySelector("body").appendChild(this.gcanvas);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update.bind(this));
        }
        startLoop() {
            ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
        }
        update(_event) {
            this.gcanvas.update();
        }
    }
    V1.DefenseGame = DefenseGame;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class GameCanvas extends HTMLCanvasElement {
        constructor() {
            super();
        }
        init(graph, cmpCamera) {
            this.initViewport(graph, cmpCamera);
        }
        update() {
            this.viewport.draw();
        }
        initViewport(graph, cmpCamera) {
            this.viewport = new ƒ.Viewport();
            this.viewport.initialize("Viewport", graph, cmpCamera, this);
        }
    }
    V1.GameCanvas = GameCanvas;
    customElements.define("game-canvas", GameCanvas, { extends: "canvas" });
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class GameObject extends ƒ.Node {
        constructor(name) {
            super(name);
        }
    }
    V1.GameObject = GameObject;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    var ƒAid = FudgeAid;
    class Gametree extends V1.GameObject {
        constructor(name) {
            super(name);
        }
        init() {
            // let material: ƒ.Material = new ƒ.Material("Projectile", ƒ.ShaderFlat, new ƒ.CoatColored());
            // let mesh: ƒ.MeshCube = new ƒ.MeshCube();
            // this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0))));
            // let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
            // cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
            // this.addComponent(cmpMaterial);
            // let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
            // this.addComponent(cmpMesh);
            // cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.2));
            let quad = new V1.ColliderQuad(1, new ƒ.Vector3(0, 0, 0));
            let quad2 = new V1.ColliderQuad(1, new ƒ.Vector3(1.5, 0, 0));
            let quad3 = new V1.ColliderQuad(1, new ƒ.Vector3(3, 0, 0));
            let quad4 = new V1.ColliderQuad(1, new ƒ.Vector3(4.5, 0, 0));
            let linesegments = quad.getLineSegments();
            let linesegments2 = quad2.getLineSegments();
            let linesegments3 = quad3.getLineSegments();
            let linesegments4 = quad4.getLineSegments();
            linesegments = linesegments.concat(linesegments2, linesegments3, linesegments4);
            console.log(linesegments.length);
            let ball = new V1.Ball(new ƒ.Vector3(0.4, 5, 0), 1, linesegments);
            this.addChild(quad);
            this.addChild(quad2);
            this.addChild(quad3);
            this.addChild(quad4);
            this.addChild(ball);
            ƒAid.addStandardLightComponents(this, new ƒ.Color(0.6, 0.6, 0.6));
        }
    }
    V1.Gametree = Gametree;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class Ball extends V1.GameObject {
        constructor(_position, _radius, _lineSegments) {
            super("Ball");
            this.radius = _radius;
            this.v = new ƒ.Vector3(0.065, 0, 0);
            this.a = new ƒ.Vector3(0, -3, 0);
            this.lineSegments = _lineSegments;
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)));
            let cmpMaterial = new ƒ.ComponentMaterial(Ball.material);
            cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
            this.addComponent(cmpMaterial);
            let cmpMesh = new ƒ.ComponentMesh(Ball.mesh);
            this.addComponent(cmpMesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(this.radius));
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update.bind(this));
        }
        lineBallCollisionHandler(lineSegments) {
            let collisionEdges = new Array();
            let position = new ƒ.Vector2(this.mtxLocal.translation.x, this.mtxLocal.translation.y);
            for (let lineSegment of lineSegments) {
                let distance = lineSegment.distanceToPoint(position);
                if (distance <= this.radius / 2) {
                    collisionEdges.push(lineSegment);
                }
            }
            if (collisionEdges.length > 0) {
                let vBefore = this.v;
                let n;
                if (collisionEdges.length >= 2) {
                    if (collisionEdges[0].distanceToPoint(position) == collisionEdges[1].distanceToPoint(position)) {
                        if (collisionEdges[0].a > collisionEdges[0].b) {
                            n = ƒ.Vector2.DIFFERENCE(collisionEdges[0].a, position);
                        }
                        else {
                            n = ƒ.Vector2.DIFFERENCE(collisionEdges[0].b, position);
                        }
                    }
                    else {
                        let smallestDistance = Number.MAX_VALUE;
                        let finalCollisionEdge = collisionEdges[0];
                        for (let collisionEdge of collisionEdges) {
                            let distance = collisionEdge.distanceToPoint(position);
                            if (distance < smallestDistance) {
                                smallestDistance = distance;
                                finalCollisionEdge = collisionEdge;
                            }
                        }
                        n = ƒ.Vector2.ORTHOGONAL(ƒ.Vector2.DIFFERENCE(finalCollisionEdge.b, finalCollisionEdge.a));
                    }
                }
                else {
                    n = ƒ.Vector2.ORTHOGONAL(ƒ.Vector2.DIFFERENCE(collisionEdges[0].b, collisionEdges[0].a));
                }
                n.normalize(1);
                let v = new ƒ.Vector2(this.v.x, this.v.y);
                n.scale(2 * ƒ.Vector2.DOT(v, n));
                v.subtract(n);
                this.v.x = v.x;
                this.v.y = v.y;
                this.mtxLocal.translate(ƒ.Vector3.SCALE(vBefore, (ƒ.Loop.timeFrameReal / 1000)));
            }
        }
        update(_event) {
            this.updateSpeed();
            this.updatePosition();
        }
        updatePosition() {
            this.mtxLocal.translate(ƒ.Vector3.SCALE(this.v, ƒ.Loop.timeFrameReal / 1000));
            this.lineBallCollisionHandler(this.lineSegments);
        }
        updateSpeed() {
            this.v = ƒ.Vector3.SUM(this.v, (ƒ.Vector3.SCALE(this.a, ƒ.Loop.timeFrameReal / 1000)));
        }
    }
    Ball.material = new ƒ.Material("Ball", ƒ.ShaderFlat, new ƒ.CoatColored());
    Ball.mesh = new ƒ.MeshSphere(15, 15);
    V1.Ball = Ball;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class ColliderQuad extends V1.GameObject {
        constructor(_scale, _position) {
            super("Quad");
            this.position = _position;
            this.scale = _scale;
            this.init();
        }
        getLineSegments() {
            return this.lineSegments;
        }
        init() {
            let a = new ƒ.Vector2(this.position.x - (this.scale / 2), this.position.y + (this.scale / 2));
            let b = new ƒ.Vector2(this.position.x + (this.scale / 2), this.position.y + (this.scale / 2));
            let c = new ƒ.Vector2(this.position.x + (this.scale / 2), this.position.y - (this.scale / 2));
            let d = new ƒ.Vector2(this.position.x - (this.scale / 2), this.position.y - (this.scale / 2));
            this.lineSegments = new Array();
            this.lineSegments.push(new V1.LineSegment(a, b));
            this.lineSegments.push(new V1.LineSegment(b, c));
            this.lineSegments.push(new V1.LineSegment(c, d));
            this.lineSegments.push(new V1.LineSegment(d, a));
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(this.position)));
            let cmpMaterial = new ƒ.ComponentMaterial(ColliderQuad.material);
            cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
            this.addComponent(cmpMaterial);
            let cmpMesh = new ƒ.ComponentMesh(ColliderQuad.mesh);
            this.addComponent(cmpMesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(this.scale));
        }
    }
    ColliderQuad.material = new ƒ.Material("Cube", ƒ.ShaderFlat, new ƒ.CoatColored());
    ColliderQuad.mesh = new ƒ.MeshCube();
    V1.ColliderQuad = ColliderQuad;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class LineSegment {
        constructor(_a, _b) {
            this.a = _a;
            this.b = _b;
        }
        getIntersectionPoint(lineSegment2) {
            let from1 = this.a;
            let to1 = this.b;
            let from2 = lineSegment2.a;
            let to2 = lineSegment2.b;
            const dX = to1.x - from1.x;
            const dY = to1.y - from1.y;
            const determinant = dX * (to2.y - from2.y) - (to2.x - from2.x) * dY;
            if (determinant === 0) {
                return null;
            }
            else {
                const lambda = ((to2.y - from2.y) * (to2.x - from1.x) + (from2.x - to2.x) * (to2.y - from1.y)) / determinant;
                const gamma = ((from1.y - to1.y) * (to2.x - from1.x) + dX * (to2.y - from1.y)) / determinant;
                if (!(0 <= lambda && lambda <= 1) || !(0 <= gamma && gamma <= 1)) {
                    return null;
                }
                else {
                    return new ƒ.Vector2(from1.x + lambda * dX, from1.y + lambda * dY);
                }
            }
        }
        distanceToPoint(p) {
            return Math.sqrt(this.distToSegmentSquared(p, this.a, this.b));
        }
        distToSegmentSquared(p, v, w) {
            let l2 = this.dist2(v, w);
            if (l2 == 0)
                return this.dist2(p, v);
            let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
            t = Math.max(0, Math.min(1, t));
            return this.dist2(p, new ƒ.Vector2(v.x + t * (w.x - v.x), v.y + t * (w.y - v.y)));
        }
        dist2(v, w) {
            return Math.pow((v.x - w.x), 2) + Math.pow((v.y - w.y), 2);
        }
    }
    V1.LineSegment = LineSegment;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class VectorMathHelper {
        static distance(a) {
            return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
        }
    }
    V1.VectorMathHelper = VectorMathHelper;
})(V1 || (V1 = {}));
//# sourceMappingURL=V1.js.map