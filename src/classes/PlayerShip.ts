import { MouseButtonMap } from "../enums/MouseButtonMap";
import { GameUserActions } from "../enums/UserActions";
import { InputController } from "../helpers/InputController";
import { actionKeyIsActive } from "../helpers/KeyboardSettings";
import { IDirection } from "../interfaces/IDirection";
import { Point } from "./Point";
import { RenderObject } from "./RenderObject";
import { Ship } from "./Ship";

export class PlayerShip extends Ship {
  public acceleration = 0.8;
  public cooldownTime = 5;
  public inaccuracy = 0;
  public turnSpeed = 6;

  constructor() {
    super(
      "images/objects/Firefly.png",
      new Point(window.innerWidth / 2 - 40, window.innerHeight / 2 - 40)
    );
    this.health = 500;
    this.shield = 10;
    this.energy = 10;
  }

  public update() {
    this.turn(InputController.getMousePosition());

    const directions: IDirection = {
      back: actionKeyIsActive(GameUserActions.MoveBack),
      forward: actionKeyIsActive(GameUserActions.MoveForward),
      left: actionKeyIsActive(GameUserActions.MoveLeft),
      right: actionKeyIsActive(GameUserActions.MoveRight)
    };
    const currentPosition = this.center;
    this.move(directions);
    const newPosition = this.center;
    RenderObject.displaceAll(currentPosition, newPosition);

    if (
      actionKeyIsActive(GameUserActions.Fire1) ||
      InputController.getMouseDownButtons()[MouseButtonMap.LEFT]
    ) {
      this.firePrimary();
    }

    if (
      actionKeyIsActive(GameUserActions.Fire2) ||
      InputController.getMouseDownButtons()[MouseButtonMap.RIGHT]
    ) {
      this.fireSecondary();
    }

    super.update();
  }
}
