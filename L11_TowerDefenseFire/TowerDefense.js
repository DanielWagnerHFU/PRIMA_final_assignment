"use strict";
var L11_TowerDefenseFire;
(function (L11_TowerDefenseFire) {
    class ComponentPicker extends ƒ.Component {
        constructor(_radius = 0.5) {
            super();
            this.radius = 0.5;
            this.radius = _radius;
        }
        drawPickRadius(_viewport) {
            let pickData = this.getPickData();
            let crc2 = _viewport.getContext();
            crc2.save();
            crc2.beginPath();
            crc2.arc(pickData.canvas.x, pickData.canvas.y, pickData.radius.magnitude, 0, 2 * Math.PI);
            crc2.strokeStyle = "#000000";
            crc2.fillStyle = "#ffffff80";
            crc2.stroke();
            crc2.fill();
        }
        pick(_client) {
            let pickData = this.getPickData();
            let distance = ƒ.Vector2.DIFFERENCE(_client, pickData.canvas);
            if (distance.magnitudeSquared < pickData.radius.magnitudeSquared)
                return pickData;
            return null;
        }
        getPickData() {
            let node = this.getContainer();
            let projection = L11_TowerDefenseFire.viewport.camera.project(node.mtxWorld.translation);
            let posClient = L11_TowerDefenseFire.viewport.pointClipToClient(projection.toVector2());
            let projectionRadius = ƒ.Vector3.X(this.radius * node.mtxWorld.scaling.magnitude);
            projectionRadius.transform(L11_TowerDefenseFire.viewport.camera.pivot, false);
            projectionRadius = L11_TowerDefenseFire.viewport.camera.project(ƒ.Vector3.SUM(node.mtxWorld.translation, projectionRadius));
            let posRadius = L11_TowerDefenseFire.viewport.pointClipToClient(projectionRadius.toVector2());
            return { clip: projection, canvas: posClient, radius: ƒ.Vector2.DIFFERENCE(posRadius, posClient) };
        }
    }
    L11_TowerDefenseFire.ComponentPicker = ComponentPicker;
})(L11_TowerDefenseFire || (L11_TowerDefenseFire = {}));
var L11_TowerDefenseFire;
(function (L11_TowerDefenseFire) {
    class Enemy extends ƒ.Node {
        constructor(_pos, _path) {
            super("Enemy");
            this.speed = 1 / 1000;
            this.nextWaypoint = 0;
            this.health = 1;
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_pos)));
            let cmpMaterial = new ƒ.ComponentMaterial(Enemy.material);
            cmpMaterial.clrPrimary = ƒ.Color.CSS("lightblue");
            this.addComponent(cmpMaterial);
            let cmpMesh = new ƒ.ComponentMesh(Enemy.mesh);
            this.addComponent(cmpMesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.5));
            cmpMesh.pivot.translateY(0.5);
            this.elistener = this.update.bind(this);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.elistener);
            this.isAlive = true;
            this.path = _path;
        }
        getDemaged(_demage) {
            this.health -= _demage;
        }
        update(_event) {
            let distanceToTravel = this.speed * ƒ.Loop.timeFrameGame;
            let move;
            while (true) {
                if (this.health <= 0) {
                    this.die();
                    break;
                }
                move = ƒ.Vector3.DIFFERENCE(this.path[this.nextWaypoint], this.mtxLocal.translation);
                if (move.magnitudeSquared > distanceToTravel * distanceToTravel)
                    break;
                this.nextWaypoint = ++this.nextWaypoint % (L11_TowerDefenseFire.sizeTerrain + 1);
                if (this.nextWaypoint == 0)
                    this.mtxLocal.translation = this.path[0];
            }
            this.mtxLocal.translate(ƒ.Vector3.NORMALIZATION(move, distanceToTravel));
        }
        die() {
            console.log("Enemy died");
            this.isAlive = false;
            ƒ.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, this.elistener);
            L11_TowerDefenseFire.viewport.getGraph().removeChild(this);
        }
    }
    Enemy.material = new ƒ.Material("Enemy", ƒ.ShaderFlat, new ƒ.CoatColored());
    Enemy.mesh = new ƒ.MeshSphere(4, 2);
    L11_TowerDefenseFire.Enemy = Enemy;
})(L11_TowerDefenseFire || (L11_TowerDefenseFire = {}));
var L11_TowerDefenseFire;
(function (L11_TowerDefenseFire) {
    var ƒAid = FudgeAid;
    window.addEventListener("load", hndLoad);
    L11_TowerDefenseFire.sizeTerrain = 10;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        let graph = new ƒ.Node("Graph");
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(10, 5, 10));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = ƒ.Color.CSS("lightblue");
        L11_TowerDefenseFire.viewport = new ƒ.Viewport();
        L11_TowerDefenseFire.viewport.initialize("Viewport", graph, cmpCamera, canvas);
        ƒ.Debug.log(L11_TowerDefenseFire.viewport);
        ƒAid.addStandardLightComponents(graph, new ƒ.Color(0.5, 0.5, 0.5));
        graph.addChild(new ƒAid.NodeCoordinateSystem());
        graph.addChild(createTerrain());
        L11_TowerDefenseFire.path = new Array();
        let amoutOfPaths = 3;
        for (let k = 0; k < amoutOfPaths; k++) {
            L11_TowerDefenseFire.path[k] = createPath();
        }
        //path[0] = createPath();
        graph.addChild(new L11_TowerDefenseFire.Tower("Tower1", ƒ.Vector3.Z(-1)));
        L11_TowerDefenseFire.viewport.draw();
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
        document.body.addEventListener("click", handleClick);
        document.body.addEventListener("keydown", handleKeyboard);
    }
    function handleClick(_event) {
        if (_event.button == 0) {
            let index = ƒ.Random.default.getIndex(L11_TowerDefenseFire.path);
            L11_TowerDefenseFire.viewport.getGraph().addChild(new L11_TowerDefenseFire.Enemy(L11_TowerDefenseFire.path[index][0], L11_TowerDefenseFire.path[index]));
        }
    }
    function handleKeyboard(_event) {
        let tower = L11_TowerDefenseFire.viewport.getGraph().getChildrenByName("Tower1")[0];
        tower.shoot();
    }
    function update(_event) {
        L11_TowerDefenseFire.viewport.draw();
        //path.render(viewport);
    }
    function createTerrain() {
        let mtrPlane = new ƒ.Material("Plane", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("green")));
        let meshPlane = new ƒ.MeshQuad();
        let mtxPlane = ƒ.Matrix4x4.ROTATION_X(-90);
        mtxPlane.scale(ƒ.Vector3.ONE(L11_TowerDefenseFire.sizeTerrain));
        let plane = new ƒAid.Node("Plane", mtxPlane, mtrPlane, meshPlane);
        return plane;
    }
    function createPath() {
        let path = new L11_TowerDefenseFire.Path();
        for (let i = 0; i <= L11_TowerDefenseFire.sizeTerrain; i++) {
            path.push(new ƒ.Vector3(i - L11_TowerDefenseFire.sizeTerrain / 2, 0, ƒ.Random.default.getRange(-L11_TowerDefenseFire.sizeTerrain, L11_TowerDefenseFire.sizeTerrain) / 4));
        }
        return path;
    }
})(L11_TowerDefenseFire || (L11_TowerDefenseFire = {}));
var L11_TowerDefenseFire;
(function (L11_TowerDefenseFire) {
    class Path extends Array {
        render(_viewport) {
            let crc2 = _viewport.getContext();
            let first = true;
            for (let waypoint of this) {
                let projection = L11_TowerDefenseFire.viewport.camera.project(waypoint);
                let posClient = L11_TowerDefenseFire.viewport.pointClipToClient(projection.toVector2());
                if (first)
                    crc2.moveTo(posClient.x, posClient.y);
                else
                    crc2.lineTo(posClient.x, posClient.y);
                first = false;
            }
            crc2.stroke();
        }
    }
    L11_TowerDefenseFire.Path = Path;
})(L11_TowerDefenseFire || (L11_TowerDefenseFire = {}));
var L11_TowerDefenseFire;
(function (L11_TowerDefenseFire) {
    class Projectile extends ƒ.Node {
        constructor(_start, _target) {
            super("Projectile");
            this.speed = 10 / 1000;
            this.target = _target;
            this.demage = 0.5;
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_start)));
            let cmpMaterial = new ƒ.ComponentMaterial(Projectile.material);
            cmpMaterial.clrPrimary = ƒ.Color.CSS("red");
            this.addComponent(cmpMaterial);
            let cmpMesh = new ƒ.ComponentMesh(Projectile.mesh);
            this.addComponent(cmpMesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.2));
            this.elistener = this.update.bind(this);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.elistener);
            console.log("Projectile flying");
        }
        update(_event) {
            if (this.target.isAlive) {
                let position = this.mtxLocal.translation;
                let distance = ƒ.Vector3.DIFFERENCE(this.target.mtxLocal.translation, position);
                let distanceToTravel = this.speed * ƒ.Loop.timeFrameGame;
                let travel = ƒ.Vector3.NORMALIZATION(distance, distanceToTravel);
                this.mtxLocal.translate(travel);
                if (this.hitTarget()) {
                    this.explode();
                }
            }
            else {
                this.explode();
            }
        }
        hitTarget() {
            let position = this.mtxLocal.translation;
            let distance = ƒ.Vector3.DIFFERENCE(this.target.mtxLocal.translation, position);
            let magnitude = distance.magnitude;
            if (magnitude <= 0.2) {
                console.log("Target is hit");
                return true;
            }
            else {
                return false;
            }
        }
        explode() {
            console.log("Projectile exploding");
            if (this.target.isAlive) {
                this.target.getDemaged(this.demage);
            }
            ƒ.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, this.elistener);
            L11_TowerDefenseFire.viewport.getGraph().removeChild(this);
        }
    }
    Projectile.material = new ƒ.Material("Projectile", ƒ.ShaderFlat, new ƒ.CoatColored());
    Projectile.mesh = new ƒ.MeshCube();
    L11_TowerDefenseFire.Projectile = Projectile;
})(L11_TowerDefenseFire || (L11_TowerDefenseFire = {}));
var L11_TowerDefenseFire;
(function (L11_TowerDefenseFire) {
    var ƒAid = FudgeAid;
    class Tower extends ƒ.Node {
        constructor(_name, _pos) {
            super(_name);
            //private health: number = 1;
            //private strength: number = 0.1;
            this.range = 4;
            let base = new ƒAid.Node("Base", null, Tower.material, Tower.meshBase);
            this.top = new ƒAid.Node("Top", ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(1)), Tower.material, Tower.meshTop);
            let mtxTop = this.top.getComponent(ƒ.ComponentMesh).pivot;
            mtxTop.rotateZ(90);
            this.gun = new ƒAid.Node("Base", ƒ.Matrix4x4.IDENTITY(), Tower.material, Tower.meshGun);
            let mtxGun = this.gun.getComponent(ƒ.ComponentMesh).pivot;
            mtxGun.scale(new ƒ.Vector3(0.1, 0.1, 1));
            mtxGun.translateZ(0.5);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_pos)));
            this.addChild(base);
            this.addChild(this.top);
            this.top.addChild(this.gun);
            this.target = null;
            this.elistener = this.update.bind(this);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.elistener);
        }
        shoot() {
            if (this.target != null) {
                let projectile = new L11_TowerDefenseFire.Projectile(this.top.mtxWorld.translation, this.target);
                L11_TowerDefenseFire.viewport.getGraph().addChild(projectile);
                console.log("Projectile started", projectile);
            }
        }
        followTarget() {
            if (this.target != null) {
                this.top.cmpTransform.lookAt(this.target.mtxWorld.translation, ƒ.Vector3.Y());
            }
        }
        update(_event) {
            this.updateTarget();
            this.followTarget();
        }
        updateTarget() {
            if (this.target != null) {
                if (!this.enemyIsInRange(this.target)) {
                    this.target = null;
                }
                if (!this.target.isAlive) {
                    this.target = null;
                }
            }
            else {
                let enemys = L11_TowerDefenseFire.viewport.getGraph().getChildrenByName("Enemy");
                let closestEnemy = this.closestEnemy(enemys);
                if (this.enemyIsInRange(closestEnemy)) {
                    this.target = closestEnemy;
                }
            }
        }
        closestEnemy(enemys) {
            let closestEnemy = enemys[0];
            let smallestdistanceToTower = this.range + 1;
            for (let i = 0; i < enemys.length; i++) {
                let distance = this.distanceToEnemy(enemys[i]);
                if (distance < smallestdistanceToTower) {
                    closestEnemy = enemys[i];
                    smallestdistanceToTower = distance;
                }
            }
            return closestEnemy;
        }
        distanceToEnemy(_enemy) {
            return ƒ.Vector3.DIFFERENCE(this.mtxWorld.translation, _enemy.mtxWorld.translation).magnitudeSquared;
        }
        enemyIsInRange(_enemy) {
            if (this.distanceToEnemy(_enemy) > (this.range * this.range)) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    Tower.material = new ƒ.Material("Tower", ƒ.ShaderFlat, new ƒ.CoatColored());
    Tower.meshBase = new ƒ.MeshPyramid();
    Tower.meshTop = new ƒ.MeshSphere(10, 4);
    Tower.meshGun = new ƒ.MeshCube();
    L11_TowerDefenseFire.Tower = Tower;
})(L11_TowerDefenseFire || (L11_TowerDefenseFire = {}));
//# sourceMappingURL=TowerDefense.js.map