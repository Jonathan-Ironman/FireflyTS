export type IStatus = {
  [key: string]: number;
} & {
  burning?: number;
  takingFire?: number;
  firing?: number;
  firingSecondary?: number;
  colliding?: number;
};
