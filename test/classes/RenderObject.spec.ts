import { Point } from "../../src/classes/Point";
import { RenderObject } from "../../src/classes/RenderObject";
import { IRenderObect } from "../../src/interfaces/IRenderObject";

const imageSrc = "../../public/images/Test80x100.png";

const objectConfig: IRenderObect = {
  imageSrc,
  initialPosition: new Point(10, 20)
};

describe("RenderObject", () => {
  afterEach(() => {
    RenderObject.getObjectList().forEach(o => o.destroy());
  });

  test("Static method 'setDimensionsForImage' should be called once image is loaded", async () => {
    const setDimensionForImageSpy = jest.spyOn(
      RenderObject,
      "setDimensionsForImage"
    );

    const renderObject = new RenderObject(objectConfig);
    renderObject.image.dispatchEvent(new Event("load"));
    await expect(setDimensionForImageSpy).toHaveBeenCalled();
  });

  test.skip("Object should get the correct dimensions once image is loaded", () => {
    const renderObject = new RenderObject(objectConfig);
    renderObject.image.dispatchEvent(new Event("load"));

    expect(renderObject.width).toBe(80);
    expect(renderObject.height).toBe(100);
  });

  test("Add new objects to the object list", () => {
    const renderObject = new RenderObject(objectConfig);
    expect(RenderObject.getObjectList().length).toBe(1);
  });

  test("Remove objects from the object list once destroyed", () => {
    const renderObject = new RenderObject(objectConfig);
    renderObject.destroy();
    expect(RenderObject.getObjectList().length).toBe(0);
  });
});
