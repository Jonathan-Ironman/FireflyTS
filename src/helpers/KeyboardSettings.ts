import { IKeyDownBindings, IKeyUpBindings } from "../interfaces/ISettings";
import { SettingController } from "./SettingsController";

export const keyDownSettings = {};
export const keyUpSettings = {};

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
