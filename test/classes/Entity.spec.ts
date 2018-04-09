import { Entity } from "../../src/classes/Entity";
import { Point } from "../../src/classes/Point";

const imageSrc = "../../public/images/Test80x100.png";
const defaultPosition = new Point(10, 20);

describe("Entity", () => {
  afterEach(() => {
    Entity.getEntityList().forEach(o => o.destroy());
  });

  test("Add new entities to the entity list", () => {
    const entity = new Entity(imageSrc, defaultPosition);
    expect(Entity.getEntityList().length).toBe(1);
  });

  test("Remove entities from the entity list once destroyed", () => {
    const entity = new Entity(imageSrc, defaultPosition);
    entity.destroy();
    expect(Entity.getEntityList().length).toBe(0);
  });
});
