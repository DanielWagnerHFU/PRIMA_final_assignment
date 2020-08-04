namespace V1 {

  window.addEventListener("load", main);
  ƒ.RenderManager.initialize(true);

  function main(_event: Event): void {
    let game: DefenseGame = new DefenseGame();
    game.init();
    game.startLoop();


    //testLineSegment1();
    //testLineSegment2();
  }

  function testLineSegment1(): void {
    let ls: LineSegment = new LineSegment(new ƒ.Vector2(0, 0 ), new ƒ.Vector2(0, 10));
    let distance: number = ls.distanceToPoint(new ƒ.Vector2(-1.5, -1));
    let para: HTMLParagraphElement = document.createElement("p");
    let node: Text = document.createTextNode(distance.toString());
    para.appendChild(node);
    document.body.appendChild(para);
  }

  function testLineSegment2(): void {
    let ls1: LineSegment = new LineSegment(new ƒ.Vector2(-5, 0 ), new ƒ.Vector2(5, 0));
    let ls2: LineSegment = new LineSegment(new ƒ.Vector2(-5, -2 ), new ƒ.Vector2(5, 1));
    let ip: ƒ.Vector2 = ls1.getIntersectionPoint(ls2);
    let para: HTMLParagraphElement = document.createElement("p");
    let node: Text = document.createTextNode(ip.toString());
    para.appendChild(node);
    document.body.appendChild(para);
  }
}