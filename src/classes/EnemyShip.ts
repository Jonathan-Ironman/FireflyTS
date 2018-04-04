import * as Calculations from "../Calculations";
import { IDirection } from "../interfaces/IDirection";
import { Entity } from "./Entity";
import { PlayerShip } from './PlayerShip';
import { Point } from './Point';
import { Ship } from "./Ship";

export class EnemyShip extends Ship {
  public health = 50;
  public shield = 0;

  constructor(imageSrc = "images/objects/enemy1.png", initialPosition: Point) {
    super(imageSrc, initialPosition);
  }

  public update() {
    this.actions();
    super.update();
  }

  private findTarget() {
    const entities = Entity.getEntityList();
    return new PlayerShip(); //entities.find(p => p instanceof PlayerShip);
  }

  private actions() {
    if (this.findTarget()) {
      return this.attack(this.findTarget() as PlayerShip);
    }
  }

  private attack(target: Entity) {
    this.turn(target.center);

    const playerFacing = Calculations.isFacing(target, this);
    let directions: IDirection = {};
    if (playerFacing) {
      directions = {
        forward: true,
        left: playerFacing > 0,
        right: playerFacing < 0
      };
    } else if (Calculations.lineDistance(this.center, target.center) < 300) {
      directions = {
        back: true
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
