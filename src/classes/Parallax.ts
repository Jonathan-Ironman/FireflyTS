import { IRenderObect } from "../interfaces/IRenderObject";
import { Point } from "./Point";
import { RenderObject } from "./RenderObject";

let renderContext: CanvasRenderingContext2D;
export class Parallax extends RenderObject {
  public static setRenderContext(ctx: CanvasRenderingContext2D) {
    renderContext = ctx;
  }
  public static setPatternForImages(imageSrc: string, pattern: CanvasPattern) {
    RenderObject.getObjectList()
      .filter((o): o is Parallax => o.image.src === imageSrc)
      .forEach(o => (o.pattern = pattern));
  }
  public pattern: CanvasPattern | undefined;
  private previousPosition = new Point(0, 0);

  constructor(private level: number, imageSrc: string) {
    super({
      imageSrc,
      initialPosition: new Point(0, 0)
    });
  }

  public update() {
    super.update();
    this.displace();
    this.previousPosition = this.center;
  }

  protected draw() {
    if (!this.pattern) {
      return;
    }
    const x = this.center.x;
    const y = this.center.y;

    renderContext.translate(x, y);
    renderContext.fillStyle = this.pattern;
    renderContext.fillRect(
      -x,
      -y,
      renderContext.canvas.width,
      renderContext.canvas.height
    );
    renderContext.translate(-x, -y);
  }

  protected onImageLoad() {
    super.onImageLoad();
    const pattern = renderContext.createPattern(this.image, "repeat");
    if (pattern) {
      this.pattern = pattern;
      Parallax.setPatternForImages(this.image.src, pattern);
    }
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
