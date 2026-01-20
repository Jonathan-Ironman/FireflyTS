import { Entity } from "../../src/classes/Entity";
import { Point } from "../../src/classes/Point";
import { RenderObject } from "../../src/classes/RenderObject";
import { Factions } from "../../src/enums/factions";
// jest.mock("../../src/classes/RenderObject");

const imageSrc = "../../public/images/Test80x100.png";
const defaultPosition = new Point(10, 20);

describe("Entity", () => {
  afterEach(() => {
    Entity.getEntityList().forEach(o => o.destroy());
  });

  test("Add new entities to the entity list", () => {
    const _ = new Entity(imageSrc, defaultPosition);
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
    expect(spy).toHaveBeenCalled();
  });

  test.skip("Status counter should be decreased by one after update", () => {
    const entity = new Entity(imageSrc, defaultPosition);
    entity.status.burning = 2;
    entity.update();
    expect(entity.status.burning).toBe(1);
  });

  test("Entity collision check: same position", () => {
    const entity1 = new Entity(imageSrc, new Point(0, 0));
    const entity2 = new Entity(imageSrc, new Point(0, 0));

    expect(Entity.testCollision(entity1, entity2)).toBe(true);
  });

  test("Entity collision check: north", () => {
    const entity1 = new Entity(imageSrc, new Point(0, 0));
    const entity2 = new Entity(imageSrc, new Point(0, 200));

    expect(Entity.testCollision(entity1, entity2)).toBe(false);
  });

  test("Entity collision check: east", () => {
    const entity1 = new Entity(imageSrc, new Point(0, 0));
    const entity2 = new Entity(imageSrc, new Point(200, 0));

    expect(Entity.testCollision(entity1, entity2)).toBe(false);
  });

  test("Entity collision check: south", () => {
    const entity1 = new Entity(imageSrc, new Point(0, 200));
    const entity2 = new Entity(imageSrc, new Point(0, 0));

    expect(Entity.testCollision(entity1, entity2)).toBe(false);
  });

  test("Entity collision check: west", () => {
    const entity1 = new Entity(imageSrc, new Point(200, 0));
    const entity2 = new Entity(imageSrc, new Point(0, 0));

    expect(Entity.testCollision(entity1, entity2)).toBe(false);
  });

  test("Entity collision check: same faction", () => {
    const entity1 = new Entity(imageSrc, defaultPosition);
    const entity2 = new Entity(imageSrc, defaultPosition);
    entity1.faction = entity2.faction = Factions.Shivan;

    expect(Entity.testCollision(entity1, entity2)).toBe(false);
  });

  test("Entity collision check: owned by", () => {
    const entity1 = new Entity(imageSrc, defaultPosition);
    const entity2 = new Entity(imageSrc, defaultPosition);
    entity1.owner = entity2;

    expect(Entity.testCollision(entity1, entity2)).toBe(false);
  });

  test("Entity collision check: same owner", () => {
    const entity1 = new Entity(imageSrc, defaultPosition);
    const entity2 = new Entity(imageSrc, defaultPosition);
    const entity3 = new Entity(imageSrc, new Point(1000, 1000));

    entity1.owner = entity2.owner = entity3;

    expect(Entity.testCollision(entity1, entity2)).toBe(false);
  });
});
