import { GameUserActions, UserActions } from "../enums/UserActions";

export type IKeyDownBindings = {
  [K in GameUserActions]?: KeyboardEvent["code"]
};
export type IKeyUpBindings = { [K in UserActions]?: KeyboardEvent["code"] };

export interface IKeyDownSettings {
  keyDownBindings: IKeyDownBindings;
  [key: string]: IKeyDownBindings;
}

export interface IKeyUpSettings {
  keyUpBindings: IKeyUpBindings;
  [key: string]: IKeyUpBindings;
}

export type ISettings = IKeyDownSettings | IKeyUpSettings;
