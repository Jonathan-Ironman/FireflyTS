import { ISettings } from "../interfaces/ISettings";
import { updateKeyboardSettings } from "./KeyboardSettings";

// TODO: updateKeySettings everywhere is terribly inefficient
export class SettingController {
  public static saveSetting(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value));
    updateKeyboardSettings();
  }

  public static saveSettings(settings: ISettings) {
    Object.keys(settings).forEach(key =>
      SettingController.saveSetting(key, settings[key])
    );
  }

  public static loadSetting(name: string) {
    return JSON.parse(localStorage.getItem(name) as string);
  }

  public static clearSetting(name: string) {
    localStorage.removeItem(name);
    updateKeyboardSettings();
  }

  public static resetDefault(name: string) {
    localStorage.clear();
    updateKeyboardSettings();
  }
}
