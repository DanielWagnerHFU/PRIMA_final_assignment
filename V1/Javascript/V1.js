"use strict";
var V1;
(function (V1) {
    window.addEventListener("load", main);
    ƒ.RenderManager.initialize(true);
    function main(_event) {
        let game = new V1.DefenseGame();
        game.init();
        game.startLoop();
    }
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class Camera extends ƒ.ComponentCamera {
        constructor() {
            super();
        }
        init() {
            this.pivot.translate(new ƒ.Vector3(4, 4, 20));
            this.pivot.lookAt(new ƒ.Vector3(4, 4, 0));
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
            let camera = new V1.Camera();
            camera.init();
            this.gcanvas = new V1.GameCanvas();
            this.gcanvas.init(this.gametree, camera);
            this.gametree.init(this.gcanvas);
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
        getViewport() {
            return this.viewport;
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
            this.lineSegments = new Array();
        }
        init(gameCanvis) {
            // for (let i: number = -50; i < 50; i++) {
            //   this.addChild(new ColliderQuad(1, new ƒ.Vector3(i, 0, 0), this.lineSegments));
            // }
            // this.addChild(new PlayerBall(new ƒ.Vector3(0.4, 5, 0), 1, this.lineSegments, gameCanvis.getViewport()));
            // this.addChild(new Ball(new ƒ.Vector3(2, 4, 0), 1, this.lineSegments));
            // this.addChild(new Ball(new ƒ.Vector3(4, 6, 0), 1, this.lineSegments));
            // this.addChild(new Ball(new ƒ.Vector3(6, 6, 0), 1, this.lineSegments));
            // this.addChild(new Ball(new ƒ.Vector3(-2, 6, 0), 1, this.lineSegments));
            // this.addChild(new Ball(new ƒ.Vector3(-4, 6, 0), 1, this.lineSegments));
            // this.addChild(new ColliderRectangle(new ƒ.Vector3(2, 1, 1), new ƒ.Vector3(0, 3, 0), this.lineSegments));
            let m = [[1, 1, 1, 1, 1],
                [1, 1, 0, 1, 1],
                [1, 1, 0, 1, 1],
                [1, 1, 1, 1, 1]];
            this.generateWorldFromMatrix(m);
            this.generatePlayer(gameCanvis);
            ƒAid.addStandardLightComponents(this, new ƒ.Color(0.9, 0.6, 0.6));
        }
        generateWorldFromMatrix(gameMatrix) {
            let shapeMatrix = [];
            for (let x = 0; x < gameMatrix.length; x++) {
                shapeMatrix[x] = [];
                for (let y = 0; y < gameMatrix[0].length; y++) {
                    if (gameMatrix[x][y] == 1) {
                        shapeMatrix[x][y] = new V1.ColliderShape(shapeMatrix, x, y, this.lineSegments);
                        this.addChild(shapeMatrix[x][y]);
                    }
                    else {
                        shapeMatrix[x][y] = null;
                    }
                }
            }
            for (let x = 0; x < gameMatrix.length; x++) {
                for (let y = 0; y < gameMatrix[0].length; y++) {
                    shapeMatrix[x][y].setNeighbours();
                }
            }
        }
        generatePlayer(gameCanvis) {
            this.addChild(new V1.PlayerBall(new ƒ.Vector3(0.4, 5, 0), 1, this.lineSegments, gameCanvis.getViewport()));
        }
    }
    V1.Gametree = Gametree;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class Ball extends V1.GameObject {
        constructor(_position, _radius, _lineSegments) {
            super("Ball");
            this.gravity = new ƒ.Vector3(0, -3.5, 0);
            this.radius = _radius;
            this.v = new ƒ.Vector3(0, 0, 0);
            this.a = this.gravity;
            this.collisionDamping = 0.95;
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
                console.log("COLLISION");
                let n;
                if (collisionEdges.length >= 2) {
                    if (collisionEdges[0].distanceToPoint(position) == collisionEdges[1].distanceToPoint(position)) {
                        console.log("CASE VERTEX");
                        if (V1.VectorMathHelper.distance(ƒ.Vector2.DIFFERENCE(collisionEdges[0].a, position)) > V1.VectorMathHelper.distance(ƒ.Vector2.DIFFERENCE(collisionEdges[0].b, position))) {
                            n = ƒ.Vector2.DIFFERENCE(collisionEdges[0].b, position);
                        }
                        else {
                            n = ƒ.Vector2.DIFFERENCE(collisionEdges[0].a, position);
                        }
                    }
                    else {
                        console.log("CASE MULTIPLE EDGES");
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
                    console.log("CASE EDGE");
                    n = ƒ.Vector2.ORTHOGONAL(ƒ.Vector2.DIFFERENCE(collisionEdges[0].b, collisionEdges[0].a));
                }
                n.normalize(1);
                let v = new ƒ.Vector2(this.v.x, this.v.y);
                n.scale(2 * ƒ.Vector2.DOT(v, n));
                v.subtract(n);
                this.v.x = v.x * this.collisionDamping;
                this.v.y = v.y * this.collisionDamping;
                this.mtxLocal.translation = this.lastPosition;
            }
        }
        update(_event) {
            this.updateSpeed();
            this.updatePosition();
        }
        updatePosition() {
            this.lastPosition = this.mtxLocal.translation;
            this.mtxLocal.translate(ƒ.Vector3.SCALE(this.v, ƒ.Loop.timeFrameReal / 1000));
            this.lineBallCollisionHandler(this.lineSegments);
        }
        updateSpeed() {
            this.v = ƒ.Vector3.SUM(this.v, (ƒ.Vector3.SCALE(this.a, ƒ.Loop.timeFrameReal / 1000)));
        }
    }
    Ball.material = new ƒ.Material("Ball", ƒ.ShaderFlat, new ƒ.CoatColored());
    Ball.mesh = new ƒ.MeshSphere(12, 9);
    V1.Ball = Ball;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class PlayerBall extends V1.Ball {
        constructor(_position, _radius, _lineSegments, _viewport) {
            super(_position, _radius, _lineSegments);
            this.viewport = _viewport;
            this.init();
        }
        init() {
            this.viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
            this.viewport.addEventListener("\u0192pointermove" /* MOVE */, this.hndPointerMove.bind(this));
        }
        hndPointerMove(_event) {
            this.ray = this.viewport.getRayFromClient(new ƒ.Vector2(_event.pointerX, _event.pointerY));
            let pos = this.ray.intersectPlane(ƒ.Vector3.ZERO(), ƒ.Vector3.Z(1));
            this.a = ƒ.Vector3.SUM(this.gravity, ƒ.Vector3.DIFFERENCE(pos, this.mtxLocal.translation));
        }
    }
    V1.PlayerBall = PlayerBall;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class ColliderQuad extends V1.GameObject {
        constructor(_scale, _position, _lineSegments) {
            super("Quad");
            this.lineSegments = _lineSegments;
            this.position = _position;
            this.scale = _scale;
            this.init();
        }
        init() {
            let a = new ƒ.Vector2(this.position.x - (this.scale / 2), this.position.y + (this.scale / 2));
            let b = new ƒ.Vector2(this.position.x + (this.scale / 2), this.position.y + (this.scale / 2));
            let c = new ƒ.Vector2(this.position.x + (this.scale / 2), this.position.y - (this.scale / 2));
            let d = new ƒ.Vector2(this.position.x - (this.scale / 2), this.position.y - (this.scale / 2));
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
    class ColliderRectangle extends V1.GameObject {
        constructor(_scale, _position, _lineSegments) {
            super("Rectangle");
            this.lineSegments = _lineSegments;
            this.position = _position;
            this.scale = _scale;
            this.init();
        }
        init() {
            let a = new ƒ.Vector2(this.position.x - (this.scale.x / 2), this.position.y + (this.scale.y / 2));
            let b = new ƒ.Vector2(this.position.x + (this.scale.x / 2), this.position.y + (this.scale.y / 2));
            let c = new ƒ.Vector2(this.position.x + (this.scale.x / 2), this.position.y - (this.scale.y / 2));
            let d = new ƒ.Vector2(this.position.x - (this.scale.x / 2), this.position.y - (this.scale.y / 2));
            this.lineSegments.push(new V1.LineSegment(a, b));
            this.lineSegments.push(new V1.LineSegment(b, c));
            this.lineSegments.push(new V1.LineSegment(c, d));
            this.lineSegments.push(new V1.LineSegment(d, a));
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(this.position)));
            let cmpMaterial = new ƒ.ComponentMaterial(ColliderRectangle.material);
            cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
            this.addComponent(cmpMaterial);
            let cmpMesh = new ƒ.ComponentMesh(ColliderRectangle.mesh);
            this.addComponent(cmpMesh);
            cmpMesh.pivot.scale(this.scale);
        }
    }
    ColliderRectangle.material = new ƒ.Material("Cube", ƒ.ShaderFlat, new ƒ.CoatColored());
    ColliderRectangle.mesh = new ƒ.MeshCube();
    V1.ColliderRectangle = ColliderRectangle;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class ColliderShape extends V1.GameObject {
        constructor(_gameMatrix, x, y, _lineSegments) {
            super("Shape");
            this.leftSideUnhandled = true;
            this.topSideUnhandled = true;
            this.rightSideUnhandled = true;
            this.bottomSideUnhandled = true;
            this.scale = 1;
            this.gameMatrix = _gameMatrix;
            this.x = x;
            this.y = y;
            this.lineSegments = _lineSegments;
            let position = new ƒ.Vector2(x, y);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(position.toVector3(0))));
            let cmpMaterial = new ƒ.ComponentMaterial(ColliderShape.material);
            cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
            this.addComponent(cmpMaterial);
            let cmpMesh = new ƒ.ComponentMesh(ColliderShape.mesh);
            this.addComponent(cmpMesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(this.scale));
        }
        generateLineSegments() {
            if (this.topShape == null && this.topSideUnhandled) {
                // Setze Handled //Schaue Links //Checke top
                // Setze Handled //Schaue Rechts //Checke top
            }
            if (this.rightShape == null && this.rightSideUnhandled) {
                //TODO
            }
            if (this.bottomShape == null && this.bottomSideUnhandled) {
                //TODO
            }
            if (this.leftShape == null && this.leftSideUnhandled) {
                //TODO
            }
        }
        setNeighbours() {
            if (this.x + 1 < this.gameMatrix.length) {
                this.rightShape = this.gameMatrix[this.x + 1][this.y];
            }
            else {
                this.rightShape = null;
            }
            if (this.x - 1 >= 0) {
                this.leftShape = this.gameMatrix[this.x - 1][this.y];
            }
            else {
                this.leftShape = null;
            }
            if (this.y + 1 < this.gameMatrix[0].length) {
                this.topShape = this.gameMatrix[this.x][this.y + 1];
            }
            else {
                this.topShape = null;
            }
            if (this.y - 1 >= 0) {
                this.bottomShape = this.gameMatrix[this.x][this.y - 1];
            }
            else {
                this.bottomShape = null;
            }
        }
    }
    ColliderShape.material = new ƒ.Material("Cube", ƒ.ShaderFlat, new ƒ.CoatColored());
    ColliderShape.mesh = new ƒ.MeshCube();
    V1.ColliderShape = ColliderShape;
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
        static difference(a, b) {
            let ax = a.x;
            let ay = a.y;
            let bx = b.x;
            let by = b.y;
            console.log(ax.toString() + bx.toString());
            console.log(((bx) - (ax)).toString());
            return new ƒ.Vector2((bx) - (ax), (by) - (ay));
        }
    }
    V1.VectorMathHelper = VectorMathHelper;
})(V1 || (V1 = {}));
//# sourceMappingURL=V1.js.map