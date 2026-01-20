import { Factions } from "../enums/factions";
import * as Calculations from "../helpers/Calculations";
import { IDirection } from "../interfaces/IDirection";
import { Entity } from "./Entity";
import { PlayerShip } from "./PlayerShip";
import { Point } from "./Point";
import { Ship } from "./Ship";

export class EnemyShip extends Ship {
  public readonly faction = Factions.Shivan;

  constructor(imageSrc = "images/objects/enemy1.png", initialPosition: Point) {
    super(imageSrc, initialPosition);
    this.health = 200;
    this.shield = 20;
    this.energy = 10;
  }

  public update() {
    this.actions();
    super.update();
  }

  private findTarget() {
    return Entity.getEntityList().find(p => p instanceof PlayerShip);
  }

  private actions() {
    if (this.findTarget()) {
      return this.attack(this.findTarget() as PlayerShip);
    }
  }

  private attack(target: Entity) {
    this.turn(target.center);

    const playerFacing = Entity.isFacing(target, this);
    let directions: IDirection = {};
    if (playerFacing) {
      directions = {
        forward: true,
        left: playerFacing > 0,
        right: playerFacing < 0
      };
    } else if (Point.getDistance(this.center, target.center) < 300) {
      directions = {
        back: true
      };
    } else if (Point.getDistance(this.center, target.center) > 1000) {
      directions = {
        forward: true
      };
    }
    this.move(directions);

    if (Calculations.chance(0.5)) {
      this.firePrimary();
    }

    if (Calculations.chance(0.5)) {
      this.fireSecondary();
    }
  }
}
