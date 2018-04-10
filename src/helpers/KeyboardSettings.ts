import { GameUserActions } from "../enums/UserActions";
import { IKeyDownBindings, IKeyUpBindings } from "../interfaces/ISettings";
import { InputController } from "./InputController";
import { SettingController } from "./SettingsController";

export const keyDownSettings: IKeyDownBindings = {};
export const keyUpSettings: IKeyUpBindings = {};

const defaultKeyDownSettings: IKeyDownBindings = {
  Fire1: "Space",
  Fire2: "ControlLeft",
  Jump: "KeyJ",
  MoveBack: "KeyS",
  MoveForward: "KeyW",
  MoveLeft: "KeyA",
  MoveRight: "KeyD",
  TurnLeft: "KeyQ",
  TurnRight: "KeyE"
};

const defaultKeyUpSettings: IKeyUpBindings = {
  VolumeDown: "NumpadSubtract",
  VolumeUp: "NumpadAdd"
};

const keysDown = InputController.getKeysDown();

export function actionKeyIsActive(action: GameUserActions) {
  return !!keysDown[keyDownSettings[action] as string];
}

export function updateKeyboardSettings() {
  Object.assign(
    keyDownSettings,
    defaultKeyDownSettings,
    SettingController.loadSetting("keyDownBindings")
  );
  Object.assign(
    keyUpSettings,
    defaultKeyUpSettings,
    SettingController.loadSetting("keyUpBindings")
  );
}

updateKeyboardSettings();
