import { Point } from "../classes/Point";
import { GameUserActions } from "../enums/UserActions";

let mousePosition = new Point(0, 0);
const mouseDown: boolean[] = [];
let mouseDownCount = 0;
let disableContextMenu = false;
const keysDown: { [key: string]: boolean } = {};
const disabledKeys: { [key: string]: boolean } = {};
const keyUpBindings: { [key: string]: () => void } = {};

let initialized = false;

export class InputController {
  public static getMousePosition() {
    return mousePosition;
  }

  public static getMouseDownButtons() {
    return mouseDown as ReadonlyArray<boolean>;
  }

  public static bindKeyUp(key: KeyboardEvent["code"], callback: () => void) {
    keyUpBindings[key] = callback;
  }

  public static removeKeyUpBind(key: KeyboardEvent["code"]) {
    delete keyUpBindings[key];
  }

  public static getKeysDown() {
    return keysDown as Readonly<typeof keysDown>;
  }

  public static init() {
    if (initialized) {
      return;
    }

    document.addEventListener("contextmenu", event => {
      if (disableContextMenu) {
        event.preventDefault();
      }
    });

    document.addEventListener("keydown", event => {
      if (disabledKeys[event.code]) {
        return event.preventDefault();
      }
      keysDown[event.code] = true;
    });

    document.addEventListener("keyup", event => {
      keysDown[event.code] = false;
      if (disabledKeys[event.code]) {
        return event.preventDefault();
      }
      if (keyUpBindings[event.code]) {
        keyUpBindings[event.code]();
      }
    });

    document.addEventListener("mousemove", event => {
      mousePosition = new Point(event.clientX, event.clientY);
    });

    document.addEventListener("mousedown", event => {
      mouseDown[event.button] = true;
      mouseDownCount++;
    });

    document.addEventListener("mouseup", event => {
      mouseDown[event.button] = false;
      mouseDownCount--;
    });

    initialized = true;
  }

  public static disableKeys(keys: Array<KeyboardEvent["code"]>) {
    keys.forEach(key => (disabledKeys[key] = true));
  }

  public static enableKeys(keys: Array<KeyboardEvent["code"]>) {
    keys.forEach(key => delete disabledKeys[key]);
  }

  public static disableContextMenu(bool: boolean) {
    disableContextMenu = bool;
  }
}
