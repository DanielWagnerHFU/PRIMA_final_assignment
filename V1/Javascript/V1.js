"use strict";
var V1;
(function (V1) {
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        let canvas = document.querySelector("canvas");
        let game = new V1.DefenseGame(canvas);
    }
})(V1 || (V1 = {}));
var V1;
(function (V1) {
    class DefenseGame {
        constructor(canvas) {
            let graph = new ƒ.Node("Graph");
            let cmpCamera = new ƒ.ComponentCamera();
            cmpCamera.pivot.translate(new ƒ.Vector3(10, 5, 10));
            cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
            cmpCamera.backgroundColor = ƒ.Color.CSS("lightblue");
            this.viewport = new ƒ.Viewport();
            this.viewport.initialize("Viewport", graph, cmpCamera, canvas);
            ƒ.Debug.log(this.viewport);
            ƒAid.addStandardLightComponents(graph, new ƒ.Color(0.5, 0.5, 0.5));
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update.bind(this));
            ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
        }
        update(_event) {
            this.viewport.draw();
        }
    }
    V1.DefenseGame = DefenseGame;
})(V1 || (V1 = {}));
//# sourceMappingURL=V1.js.map