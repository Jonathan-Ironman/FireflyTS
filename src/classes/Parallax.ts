import { IRenderObect } from "../interfaces/IRenderObject";
import { Point } from "./Point";
import { RenderObject } from "./RenderObject";

const bgImageSrc = "images/bg.jpg";
const bgImage = new Image();
let pattern: CanvasPattern;

let renderContext: CanvasRenderingContext2D;
export class Parallax extends RenderObject {
  public static setRenderContext(ctx: CanvasRenderingContext2D) {
    renderContext = ctx;
    bgImage.src = bgImageSrc;
    bgImage.onload = () => {
      pattern = renderContext.createPattern(bgImage, "repeat");
    };
  }
  private previousPosition = new Point(0, 0);

  constructor(private level: number) {
    super({
      imageSrc: bgImageSrc,
      initialPosition: new Point(0, 0)
    });
  }

  public update() {
    super.update();
    this.displace();
    this.previousPosition = this.center;
  }

  protected draw() {
    if (!pattern) {
      return;
    }
    const x = this.center.x;
    const y = this.center.y;

    renderContext.globalAlpha = 0.5;
    renderContext.translate(x, y);
    renderContext.fillStyle = pattern;
    renderContext.fillRect(-x, -y, renderContext.canvas.width, renderContext.canvas.height);
    renderContext.translate(-x, -y);
    renderContext.globalAlpha = 1;
  }

  private displace() {
    const displaceX = (this.previousPosition.x - this.center.x) / this.level;
    const displaceY = (this.previousPosition.y - this.center.y) / this.level;
    this.center = new Point(
      this.center.x + displaceX,
      this.center.y + displaceY
    );
  }
}
