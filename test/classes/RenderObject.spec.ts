import { Point } from "../../src/classes/Point";
import { RenderObject } from "../../src/classes/RenderObject";
import { IRenderObect } from "../../src/interfaces/IRenderObject";

const imageSrc = "../images/Test80x100.png";

const objectConfig: IRenderObect = {
  imageSrc,
  initialPosition: new Point(10, 20)
};

describe("RenderObject", () => {
  afterEach(() => {
    RenderObject.getObjectList().forEach(o => o.destroy());
  });

  it.skip("Object should get the correct dimensions once image is loaded", async () => {
    const renderObject = new RenderObject(objectConfig);
    await expect(RenderObject.setDimensionsForImage).toBeCalled;
    await expect(renderObject.width).toBe(80);
    await expect(renderObject.height).toBe(100);
  });

  it("Add new objects to the object list", () => {
    const renderObject = new RenderObject(objectConfig);
    expect(RenderObject.getObjectList().length).toBe(1);
  });

  it("Remove objects from the object list once destroyed", () => {
    const renderObject = new RenderObject(objectConfig);
    renderObject.destroy();
    expect(RenderObject.getObjectList().length).toBe(0);
  });
});
