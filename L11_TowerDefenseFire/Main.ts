namespace L11_TowerDefenseFire {

  import ƒAid = FudgeAid;
  window.addEventListener("load", hndLoad);

  export let viewport: ƒ.Viewport;
  export let path: Path[];
  export let sizeTerrain: number = 10;

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    let graph: ƒ.Node = new ƒ.Node("Graph");

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translate(new ƒ.Vector3(10, 5, 10));
    cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
    cmpCamera.backgroundColor = ƒ.Color.CSS("lightblue");

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", graph, cmpCamera, canvas);
    ƒ.Debug.log(viewport);

    ƒAid.addStandardLightComponents(graph, new ƒ.Color(0.5, 0.5, 0.5));
    graph.addChild(new ƒAid.NodeCoordinateSystem());

    graph.addChild(createTerrain());
    path = new Array();
    let amoutOfPaths: number = 3;
    for (let k: number = 0; k < amoutOfPaths; k++) {
      path[k] = createPath();
    }
    //path[0] = createPath();
    graph.addChild(new Tower("Tower1", ƒ.Vector3.Z(-1)));

    viewport.draw();

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);

    document.body.addEventListener("click", handleClick);
    document.body.addEventListener("keydown", handleKeyboard);
  }

  function handleClick(_event: MouseEvent): void {
    if (_event.button == 0) {
      let index: number = ƒ.Random.default.getIndex(path);
      viewport.getGraph().addChild(new Enemy(path[index][0], path[index]));
    }
  }

  function handleKeyboard(_event: KeyboardEvent): void {
    let tower: Tower = <Tower>viewport.getGraph().getChildrenByName("Tower1")[0];
    tower.shoot();
  }

  function update(_event: ƒ.Eventƒ): void {
    viewport.draw();
    //path.render(viewport);
  }

  function createTerrain(): ƒ.Node {
    let mtrPlane: ƒ.Material = new ƒ.Material("Plane", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("green")));
    let meshPlane: ƒ.MeshQuad = new ƒ.MeshQuad();
    let mtxPlane: ƒ.Matrix4x4 = ƒ.Matrix4x4.ROTATION_X(-90);
    mtxPlane.scale(ƒ.Vector3.ONE(sizeTerrain));
    let plane: ƒAid.Node = new ƒAid.Node("Plane", mtxPlane, mtrPlane, meshPlane);
    return plane;
  }

  function createPath(): Path {
    let path: Path = new Path();
    for (let i: number = 0; i <= sizeTerrain; i++) {
      path.push(new ƒ.Vector3(i - sizeTerrain / 2, 0, ƒ.Random.default.getRange(-sizeTerrain, sizeTerrain) / 4));
    }
    return path;
  }
}