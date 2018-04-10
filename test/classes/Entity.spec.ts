import { Entity } from "../../src/classes/Entity";
import { Point } from "../../src/classes/Point";
import { RenderObject } from "../../src/classes/RenderObject";

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

  test.skip("Should set maxHealth to initial health on first update", () => {
    const entity = new Entity(imageSrc, defaultPosition);
    entity.health = 10;
    entity.update();
    expect(entity.maxHealth).toBe(10);
  });

  test("Should call destroy when health drops below 1", () => {
    const entity = new Entity(imageSrc, defaultPosition);
    const spy = jest.spyOn(entity, "destroy");
    entity.health = 0;
    entity.update();
    expect(spy).toBeCalled();
  });
});
