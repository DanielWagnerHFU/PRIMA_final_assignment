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
            this.pivot.translate(new ƒ.Vector3(0, 0, 10));
            this.pivot.lookAt(ƒ.Vector3.ZERO());
            this.backgroundColor = ƒ.Color.CSS("black");
        }
    }
    V1.Camera = Camera;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    var ƒAid = FudgeAid;
    class DefenseGame {
        init() {
            this.gametree = new V1.Gametree("gametree");
            this.gametree.init();
            ƒAid.addStandardLightComponents(this.gametree, new ƒ.Color(0.6, 0.6, 0.6));
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
            this.initEventlistners();
        }
        update() {
            this.viewport.draw();
        }
        initViewport(graph, cmpCamera) {
            this.viewport = new ƒ.Viewport();
            this.viewport.initialize("Viewport", graph, cmpCamera, this);
        }
        initEventlistners() {
            this.viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
            this.viewport.addEventListener("\u0192pointermove" /* MOVE */, this.pointerEventHandler.bind(this));
        }
        pointerEventHandler(_event) {
            //TODO
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
            let ball = new V1.Ball("Ball");
            this.addChild(ball);
        }
    }
    V1.Gametree = Gametree;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class Ball extends V1.GameObject {
        constructor(_name) {
            super(name);
            this.init();
        }
        init() {
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0))));
            let cmpMaterial = new ƒ.ComponentMaterial(Ball.material);
            cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
            this.addComponent(cmpMaterial);
            let cmpMesh = new ƒ.ComponentMesh(Ball.mesh);
            this.addComponent(cmpMesh);
            //cmpMesh.pivot.scale(ƒ.Vector3.ONE(1));
        }
    }
    Ball.material = new ƒ.Material("Ball", ƒ.ShaderFlat, new ƒ.CoatColored());
    Ball.mesh = new ƒ.MeshSphere(20, 20);
    V1.Ball = Ball;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class HookerBall extends V1.Ball {
        constructor(_name) {
            super(_name);
        }
    }
    V1.HookerBall = HookerBall;
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class PlayerBall extends V1.HookerBall {
        constructor(_name) {
            super(_name);
        }
    }
    V1.PlayerBall = PlayerBall;
})(V1 || (V1 = {}));
//# sourceMappingURL=V1.js.map