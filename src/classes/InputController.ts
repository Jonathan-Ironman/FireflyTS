import { Point } from "./Point";

const keysDown: { [key: string]: boolean } = {};
let mousePosition = new Point(0, 0);
const mouseDown: boolean[] = [];
let mouseDownCount = 0;
let disableContextMenu = false;
const disabledKeys: { [key: string]: boolean } = {};
const bindings: { [key: string]: () => void } = {};

let initialized = false;

export class InputController {
  public static getMousePosition() {
    return mousePosition;
  }

  public static getMouseDownButtons() {
    return mouseDown as ReadonlyArray<boolean>;
  }

  public static bindKey(key: KeyboardEvent["key"], callback: () => void) {
    bindings[key] = callback;
  }

  public static removeBind(key: KeyboardEvent["key"]) {
    delete bindings[key];
  }

  public static getKeysDown() {
    // TODO: make readonly
    return keysDown;
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
      if (disabledKeys[event.key]) {
        return event.preventDefault();
      }
      keysDown[event.key] = true;
    });

    document.addEventListener("keyup", event => {
      keysDown[event.key] = false;
      if (bindings[event.key]) {
        bindings[event.key]();
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

  public static disableKeys(keys: Array<KeyboardEvent["key"]>) {
    keys.forEach(key => (disabledKeys[key] = true));
  }

  public static enableKeys(keys: Array<KeyboardEvent["key"]>) {
    keys.forEach(key => delete disabledKeys[key]);
  }

  public static disableContextMenu(bool: boolean) {
    disableContextMenu = bool;
  }
}
