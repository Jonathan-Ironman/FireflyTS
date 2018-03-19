import * as Calculations from "../Calculations";
import { IDirection } from "../interfaces/IDirection";
import { Entity } from "./Entity";
import { PlayerShip } from "./PlayerShip";
import { Point } from "./Point";
import { Ship } from "./Ship";

export class EnemyShip extends Ship {
  public health = 50;
  public shield = 0;

  constructor(
    renderCtx: CanvasRenderingContext2D,
    imageSrc = "images/objects/enemy1.png",
    initialPosition = new Point(
      Calculations.chance(50)
        ? Calculations.getRandomInt(50, 300)
        : Calculations.getRandomInt(
            renderCtx.canvas.width - 250,
            renderCtx.canvas.width - 400
          ),
      Calculations.chance(50)
        ? Calculations.getRandomInt(50, 300)
        : Calculations.getRandomInt(
            renderCtx.canvas.height - 250,
            renderCtx.canvas.height - 400
          )
    )
  ) {
    super(imageSrc, initialPosition);
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
