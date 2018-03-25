import { MouseButtonMap } from "../enums/MouseButtonMap";
import { IDirection } from "../interfaces/IDirection";
import { InputController } from "./InputController";
import { Point } from "./Point";
import { RenderObject } from "./RenderObject";
import { Ship } from "./Ship";

export class PlayerShip extends Ship {
  public health = 500;
  public shield = 0;
  public acceleration = 0.8;
  public cooldownTime = 5;
  public inaccuracy = 0;
  public turnSpeed = 6;
  public alive = true;

  constructor() {
    super(
      "images/objects/Firefly.png",
      new Point(window.innerWidth / 2 - 40, window.innerHeight / 2 - 40)
    );
  }

  public update() {
    this.turn(InputController.getMousePosition());

    const keysDown = InputController.getKeysDown();
    const directions: IDirection = {
      back: keysDown.ArrowDown || keysDown.s,
      forward: keysDown.ArrowUp || keysDown.w,
      left: keysDown.ArrowLeft || keysDown.a,
      right: keysDown.ArrowRight || keysDown.d
    };
    const currentPosition = this.center;
    this.move(directions);
    const newPosition = this.center;
    RenderObject.displaceAll(currentPosition, newPosition);

    if (InputController.getMouseDownButtons()[MouseButtonMap.LEFT]) {
      this.firePrimary();
    }

    if (keysDown[" "]) {
      this.fireSecondary();
    }

    super.update();
  }

  public destroy() {
    this.alive = false;
    super.destroy();
  }
}
