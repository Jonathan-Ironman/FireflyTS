import { IRenderObect } from "../interfaces/IRenderObject";
import { Point } from "./Point";

const images: { [imagePath: string]: HTMLImageElement } = {};

let renderContext: CanvasRenderingContext2D;
const objectList: RenderObject[] = [];
export class RenderObject {
  public static setRenderContext(ctx: CanvasRenderingContext2D) {
    renderContext = ctx;
  }
  public static getObjectList() {
    return objectList as ReadonlyArray<RenderObject>;
  }
  public static setDimensionsForImage(imageSrc: string) {
    objectList
      .filter(o => o.image.src.endsWith(imageSrc))
      .forEach(o => o.setDimensions());
  }
  public static displaceAll(pointA: Point, pointB: Point) {
    const displaceX = pointA.x - pointB.x;
    const displaceY = pointA.y - pointB.y;
    objectList.forEach(o => {
      o.center = new Point(o.center.x + displaceX, o.center.y + displaceY);
    });
  }
  public center: Point = new Point(0, 0);
  public angle: number;
  public width: number = 1;
  public height: number = 1;
  protected readonly image: HTMLImageElement;
  protected maxLifeSpan: number;
  private frameIndex: number = 0;
  private lifeSpan: number = 0;
  private ticksCurrentFrame: number = 0;

  constructor(private options: IRenderObect) {
    objectList.push(this);

    this.angle = options.angle || 0;
    this.maxLifeSpan = options.lifeSpan || Infinity;

    if (!images[options.imageSrc]) {
      this.image = new Image();
      this.image.src = options.imageSrc;
      this.image.onload = () =>
        RenderObject.setDimensionsForImage(options.imageSrc);
      images[options.imageSrc] = this.image;
    } else {
      this.image = images[options.imageSrc];
      this.setDimensions();
    }

    if (this.options.sprite && !this.options.sprite.loop) {
      this.maxLifeSpan =
        this.options.sprite.frames * this.options.sprite.ticksPerFrame;
    }

    this.center = options.initialPosition;
  }

  public update() {
    if (this.lifeSpan > this.maxLifeSpan) {
      return this.destroy();
    }

    this.lifeSpan++;
    this.spriteActions();
    this.draw();
  }

  public destroy() {
    const index = objectList.indexOf(this);
    objectList.splice(index, 1);
  }

  protected draw() {
    const x = this.center.x;
    const y = this.center.y;
    const degrees = this.angle + 90;
    const angleInRadians = degrees * Math.PI / 180;

    renderContext.translate(x, y);
    renderContext.rotate(angleInRadians);

    if (this.options.sprite) {
      renderContext.drawImage(
        this.image,
        this.frameIndex * this.width,
        0,
        this.width,
        this.height,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
    } else {
      renderContext.drawImage(this.image, -this.width / 2, -this.height / 2);
    }

    renderContext.rotate(-angleInRadians);
    renderContext.translate(-x, -y);
  }

  private setDimensions() {
    this.width = this.options.sprite
      ? this.image.width / this.options.sprite.frames
      : this.image.width;
    this.height = this.image.height;
  }

  private spriteActions() {
    if (!this.options.sprite) {
      return;
    }

    this.ticksCurrentFrame++;

    if (this.ticksCurrentFrame > this.options.sprite.ticksPerFrame) {
      this.ticksCurrentFrame = 0;
      if (this.frameIndex < this.options.sprite.frames - 1) {
        this.frameIndex++;
      } else {
        this.frameIndex = 0;
      }
    }
  }
}
