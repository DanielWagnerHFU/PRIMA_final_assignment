"use strict";
var V1;
(function (V1) {
    let data;
    window.addEventListener("load", main);
    window.addEventListener("contextmenu", e => {
        e.preventDefault();
    });
    ƒ.RenderManager.initialize(true);
    function main(_event) {
        load("gamematrix.json");
        let game = new V1.DefenseGame();
        game.init();
        game.startLoop();
    }
    async function load(_filename) {
        let response = await fetch("gamematrix.json");
        let text = await response.text();
        data = JSON.parse(text);
        console.log(data.toString());
    }
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class Camera extends ƒ.ComponentCamera {
        constructor() {
            super();
        }
        init(_player) {
            this.player = _player;
            this.pivot.translate(new ƒ.Vector3(4, 4, 20));
            this.pivot.lookAt(new ƒ.Vector3(4, 4, 0));
            this.backgroundColor = ƒ.Color.CSS("Maroon");
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update.bind(this));
        }
        update(_event) {
            this.updatePosition(this.player.getPosition());
        }
        updatePosition(lookAt) {
            this.pivot.translation = (ƒ.Vector3.SUM(lookAt, new ƒ.Vector3(0, 0, -20)));
            this.pivot.lookAt(lookAt);
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
            this.gcanvas = new V1.GameCanvas();
            this.gcanvas.init(this.gametree, camera);
            this.gametree.init(this.gcanvas, this);
            camera.init(this.gametree.getPlayer());
            document.querySelector("body").appendChild(this.gcanvas);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update.bind(this));
        }
        end() {
            document.querySelector("body").removeChild(this.gcanvas);
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
            this.balls = new Array();
            this.shapes = new Array();
        }
        getPlayer() {
            return this.player;
        }
        init(gameCanvis, _game) {
            let m = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
                [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
            this.generateWorldFromMatrix(m);
            this.generatePlayer(gameCanvis, m);
            this.generateGoal(m, _game);
            ƒAid.addStandardLightComponents(this, new ƒ.Color(0.6, 0.6, 0.6));
        }
        generateWorldFromMatrix(gameMatrix) {
            let shapeMatrix = [];
            for (let x = 0; x < gameMatrix.length; x++) {
                shapeMatrix[x] = [];
                for (let y = 0; y < gameMatrix[0].length; y++) {
                    if (gameMatrix[x][y] == 1) {
                        shapeMatrix[x][y] = new V1.ColliderShape(shapeMatrix, x, y, this.lineSegments);
                        this.addChild(shapeMatrix[x][y]);
                        this.shapes.push(shapeMatrix[x][y]);
                    }
                    else {
                        shapeMatrix[x][y] = null;
                    }
                }
            }
            for (let x = 0; x < gameMatrix.length; x++) {
                for (let y = 0; y < gameMatrix[0].length; y++) {
                    if (shapeMatrix[x][y] != null) {
                        shapeMatrix[x][y].setNeighbours();
                    }
                }
            }
            for (let x = 0; x < gameMatrix.length; x++) {
                for (let y = 0; y < gameMatrix[0].length; y++) {
                    if (shapeMatrix[x][y] != null) {
                        shapeMatrix[x][y].generateLineSegments();
                    }
                }
            }
        }
        generatePlayer(gameCanvis, gameMatrix) {
            for (let x = 0; x < gameMatrix.length; x++) {
                for (let y = 0; y < gameMatrix[0].length; y++) {
                    if (gameMatrix[x][y] == 2) {
                        this.player = new V1.PlayerBall(new ƒ.Vector3(x, y, 0), 0.7, this.lineSegments, this.balls, gameCanvis.getViewport());
                        this.addChild(this.player);
                    }
                }
            }
        }
        generateGoal(gameMatrix, game) {
            for (let x = 0; x < gameMatrix.length; x++) {
                for (let y = 0; y < gameMatrix[0].length; y++) {
                    if (gameMatrix[x][y] == 3) {
                        this.addChild(new V1.Goal(new ƒ.Vector3(x, y, 0), 0.8, this.balls, game));
                    }
                }
            }
        }
    }
    V1.Gametree = Gametree;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class Ball extends V1.GameObject {
        constructor(_position, _radius, _lineSegments, _balls) {
            super("Ball");
            this.mass = 1;
            this.balls = _balls;
            this.balls.push(this);
            this.forces = new Map();
            this.radius = _radius;
            this.v = new ƒ.Vector3(0, 0, 0);
            this.collisionDamping = 0.95;
            this.lineSegments = _lineSegments;
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)));
            let cmpMaterial = new ƒ.ComponentMaterial(Ball.material);
            cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
            this.addComponent(cmpMaterial);
            let cmpMesh = new ƒ.ComponentMesh(Ball.mesh);
            this.addComponent(cmpMesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(this.radius));
            this.listenerUpdate = this.update.bind(this);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.listenerUpdate);
        }
        getRadius() {
            return this.radius;
        }
        getPosition() {
            return this.mtxLocal.translation;
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
        updateAcceleration() {
            let forces = this.forces.values();
            this.a = new ƒ.Vector3(0, 0, 0);
            for (let force of forces) {
                this.a.add(ƒ.Vector3.SCALE(force, 1 / this.mass));
            }
        }
        update(_event) {
            this.updateAcceleration();
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
    Ball.material = new ƒ.Material("Ball", ƒ.ShaderFlat, new ƒ.CoatColored(new ƒ.Color(0.7, 0.8, 0.0, 1)));
    Ball.mesh = new ƒ.MeshSphere(12, 9);
    V1.Ball = Ball;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class EnemyBall extends V1.Ball {
        constructor(_position, _radius, _lineSegments, _balls) {
            super(_position, _radius, _lineSegments, _balls);
        }
    }
    V1.EnemyBall = EnemyBall;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class Goal extends V1.GameObject {
        constructor(_position, _radius, _balls, _game) {
            super("Ball");
            this.balls = _balls;
            this.radius = _radius;
            this.game = _game;
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)));
            let cmpMaterial = new ƒ.ComponentMaterial(Goal.material);
            cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
            this.addComponent(cmpMaterial);
            let cmpMesh = new ƒ.ComponentMesh(Goal.mesh);
            this.addComponent(cmpMesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(this.radius));
            this.player = this.getPlayer();
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update.bind(this));
        }
        update(_event) {
            if (ƒ.Vector3.DIFFERENCE(this.mtxLocal.translation, this.player.mtxLocal.translation).magnitude < (this.radius + this.player.getRadius()) / 2) {
                console.log("REACHED GOAL");
                this.game.end();
            }
        }
        getPlayer() {
            for (let b of this.balls) {
                if (b instanceof V1.PlayerBall) {
                    return b;
                }
            }
            return null;
        }
    }
    Goal.material = new ƒ.Material("Ball", ƒ.ShaderFlat, new ƒ.CoatColored(new ƒ.Color(0.0, 0.5, 1.0, 1)));
    Goal.mesh = new ƒ.MeshSphere(12, 9);
    V1.Goal = Goal;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class HookerBall extends V1.Ball {
        constructor(_position, _radius, _lineSegments, _balls) {
            super(_position, _radius, _lineSegments, _balls);
            this.listener = null;
            this.hook = null;
        }
        hook(direction) {
            this.ip = this.hookIntersectionPoint(direction).toVector3(0);
            if (this.ip != null) {
                this.hookNode = new V1.GameObject("Hook"); //TODO GENERATE HOOK NODE
                let cmpMaterial = new ƒ.ComponentMaterial(HookerBall.hookmaterial);
                cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
                this.hookNode.addComponent(cmpMaterial);
                let cmpMesh = new ƒ.ComponentMesh(HookerBall.hookmesh);
                this.hookNode.addComponent(cmpMesh);
                cmpMesh.pivot.scale(new ƒ.Vector3(1, 0.1, 0.1));
                this.cmpMesh = cmpMesh.pivot;
                this.hookNode.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0))));
                this.addChild(this.hookNode);
                this.updateHook(null);
                this.listener = this.updateHook.bind(this);
                ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.listener);
            }
        }
        unhook() {
            this.forces.delete("hook");
            ƒ.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, this.listener);
            this.removeChild(this.hookNode);
            this.hookNode = null;
        }
        updateHook(_event) {
            let connectionVector = ƒ.Vector3.DIFFERENCE(this.ip, this.mtxLocal.translation);
            let connectionVectorNormalized = ƒ.Vector3.NORMALIZATION(connectionVector, 1);
            this.cmpMesh.scaling = new ƒ.Vector3(connectionVector.magnitude, 0.1, 0.1);
            this.hookNode.mtxLocal.translation = ƒ.Vector3.SCALE(connectionVector, 0.5);
            let cv = connectionVector.toVector2();
            this.hookNode.mtxLocal.rotation = new ƒ.Vector3(0, 0, Math.atan2(cv.y, cv.x) * 180 / Math.PI);
            connectionVector.scale(2.0);
            connectionVectorNormalized.scale(3);
            this.forces.set("hook", ƒ.Vector3.SUM(connectionVectorNormalized, connectionVector));
        }
        hookIntersectionPoint(direction) {
            direction.normalize(0.01);
            let a = new V1.LineSegment(this.mtxLocal.translation.toVector2(), ƒ.Vector2.SUM(this.mtxLocal.translation.toVector2(), direction));
            let i = 0;
            while (this.intersectionPoint(a) == null && i < 750) {
                a.b.add(direction);
                i++;
            }
            return ƒ.Vector2.SUM(this.intersectionPoint(a), ƒ.Vector2.SCALE(direction, 5));
        }
        intersectionPoint(a) {
            let ip = null;
            for (let b of this.lineSegments) {
                if (b.getIntersectionPoint(a) != null) {
                    ip = b.getIntersectionPoint(a);
                }
            }
            return ip;
        }
    }
    HookerBall.hookmaterial = new ƒ.Material("hook", ƒ.ShaderFlat, new ƒ.CoatColored(new ƒ.Color(0.3, 0.4, 0.0, 1)));
    HookerBall.hookmesh = new ƒ.MeshCube();
    V1.HookerBall = HookerBall;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class PlayerBall extends V1.HookerBall {
        constructor(_position, _radius, _lineSegments, _balls, _viewport) {
            super(_position, _radius, _lineSegments, _balls);
            this.viewport = _viewport;
            this.forces.set("gravity", new ƒ.Vector3(0, -3.3, 0));
            this.init();
        }
        init() {
            this.viewport.activatePointerEvent("\u0192pointerdown" /* DOWN */, true);
            this.viewport.activatePointerEvent("\u0192pointerup" /* UP */, true);
            this.viewport.addEventListener("\u0192pointerdown" /* DOWN */, this.hndPointerDOWN.bind(this));
            this.viewport.addEventListener("\u0192pointerup" /* UP */, this.hndPointerUP.bind(this));
        }
        hndPointerDOWN(_event) {
            this.ray = this.viewport.getRayFromClient(new ƒ.Vector2(_event.pointerX, _event.pointerY));
            let pos = this.ray.intersectPlane(ƒ.Vector3.ZERO(), ƒ.Vector3.Z(1));
            let direction = ƒ.Vector3.SUM(ƒ.Vector3.DIFFERENCE(pos, this.mtxLocal.translation));
            super.hook(direction.toVector2());
        }
        hndPointerUP(_event) {
            super.unhook();
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
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(position.toVector3((Math.random() - 0.9) / 2))));
            let cmpMaterial = new ƒ.ComponentMaterial(new ƒ.Material("Shape", ƒ.ShaderFlat, new ƒ.CoatColored(new ƒ.Color(Math.random(), 0.2, 0.1, 1))));
            cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
            this.addComponent(cmpMaterial);
            let cmpMesh = new ƒ.ComponentMesh(ColliderShape.mesh);
            this.addComponent(cmpMesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(this.scale));
        }
        generateLineSegments() {
            if (this.topShape == null && this.topSideUnhandled) {
                this.topSideUnhandled = false;
                let currentShape = this;
                let lengthRight = 0;
                while (currentShape.rightShape != null && currentShape.rightShape.topShape == null) {
                    currentShape = currentShape.rightShape;
                    lengthRight = lengthRight + 1;
                    currentShape.topSideUnhandled = false;
                }
                currentShape = this;
                let lengthLeft = 0;
                while (currentShape.leftShape != null && currentShape.leftShape.topShape == null) {
                    currentShape = currentShape.rightShape;
                    lengthLeft = lengthLeft + 1;
                    currentShape.topSideUnhandled = false;
                }
                let a = new ƒ.Vector2(this.x - (this.scale / 2) - lengthLeft, this.y + (this.scale / 2));
                let b = new ƒ.Vector2(this.x + (this.scale / 2) + lengthRight, this.y + (this.scale / 2));
                this.lineSegments.push(new V1.LineSegment(a, b));
            }
            if (this.rightShape == null && this.rightSideUnhandled) {
                this.rightSideUnhandled = false;
                let currentShape = this;
                let lengthTop = 0;
                while (currentShape.topShape != null && currentShape.topShape.rightShape == null) {
                    currentShape = currentShape.topShape;
                    lengthTop = lengthTop + 1;
                    currentShape.rightSideUnhandled = false;
                }
                currentShape = this;
                let lengthBottom = 0;
                while (currentShape.bottomShape != null && currentShape.bottomShape.rightShape == null) {
                    currentShape = currentShape.bottomShape;
                    lengthBottom = lengthBottom + 1;
                    currentShape.rightSideUnhandled = false;
                }
                let a = new ƒ.Vector2(this.x + (this.scale / 2), this.y + (this.scale / 2) + lengthTop);
                let b = new ƒ.Vector2(this.x + (this.scale / 2), this.y - (this.scale / 2) - lengthBottom);
                this.lineSegments.push(new V1.LineSegment(a, b));
            }
            if (this.bottomShape == null && this.bottomSideUnhandled) {
                this.bottomSideUnhandled = false;
                let currentShape = this;
                let lengthRight = 0;
                while (currentShape.rightShape != null && currentShape.rightShape.bottomShape == null) {
                    currentShape = currentShape.rightShape;
                    lengthRight = lengthRight + 1;
                    currentShape.bottomSideUnhandled = false;
                }
                currentShape = this;
                let lengthLeft = 0;
                while (currentShape.leftShape != null && currentShape.leftShape.bottomShape == null) {
                    currentShape = currentShape.rightShape;
                    lengthLeft = lengthLeft + 1;
                    currentShape.bottomSideUnhandled = false;
                }
                let a = new ƒ.Vector2(this.x - (this.scale / 2) - lengthLeft, this.y - (this.scale / 2));
                let b = new ƒ.Vector2(this.x + (this.scale / 2) + lengthRight, this.y - (this.scale / 2));
                this.lineSegments.push(new V1.LineSegment(a, b));
            }
            if (this.leftShape == null && this.leftSideUnhandled) {
                this.leftSideUnhandled = false;
                let currentShape = this;
                let lengthTop = 0;
                while (currentShape.topShape != null && currentShape.topShape.leftShape == null) {
                    currentShape = currentShape.topShape;
                    lengthTop = lengthTop + 1;
                    currentShape.leftSideUnhandled = false;
                }
                currentShape = this;
                let lengthBottom = 0;
                while (currentShape.bottomShape != null && currentShape.bottomShape.leftShape == null) {
                    currentShape = currentShape.bottomShape;
                    lengthBottom = lengthBottom + 1;
                    currentShape.leftSideUnhandled = false;
                }
                let a = new ƒ.Vector2(this.x - (this.scale / 2), this.y + (this.scale / 2) + lengthTop);
                let b = new ƒ.Vector2(this.x - (this.scale / 2), this.y - (this.scale / 2) - lengthBottom);
                this.lineSegments.push(new V1.LineSegment(a, b));
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