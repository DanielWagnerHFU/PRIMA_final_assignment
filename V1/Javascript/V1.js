"use strict";
var V1;
(function (V1) {
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        let game = new V1.DefenseGame();
        game.init();
        game.startLoop();
    }
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class DefenseGame {
        init() {
            this.gametree = this.createGametree();
            let cmpCamera = new ƒ.ComponentCamera();
            cmpCamera.pivot.translate(new ƒ.Vector3(10, 5, 10));
            cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
            cmpCamera.backgroundColor = ƒ.Color.CSS("lightblue");
            this.gcanvas = new V1.GameCanvas();
            this.gcanvas.init(this.gametree, cmpCamera);
            document.querySelector("body").appendChild(this.gcanvas);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update.bind(this));
        }
        startLoop() {
            ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
        }
        update(_event) {
            this.gcanvas.update();
        }
        createGametree() {
            let tree = new V1.GameObject("gametree");
            //TODO
            return tree;
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
            ƒ.Debug.log(V1.viewport);
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
//# sourceMappingURL=V1.js.map