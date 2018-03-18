// http://blog.sklambert.com/html5-canvas-game-html5-audio-and-finishing-touches/#adding-html-audio
export class SoundPool {
  private pool: HTMLAudioElement[] = [];
  private currSound = 0;

  constructor(filename: string, volume: number, private maxSize: number) {
    for (let i = 0; i < maxSize; i++) {
      const sound = new Audio(filename);
      sound.volume = volume;
      this.pool[i] = sound;
    }
  }

  public setVolume(volume: number) {
    for (const player of this.pool) {
      player.volume = volume;
    }
  }

  public mute(state?: boolean) {
    for (const player of this.pool) {
      // State: toggle, true or false.
      player.muted =
        typeof state === "undefined"
          ? (player.muted = !player.muted)
          : (player.muted = state);
    }
  }

  public play() {
    if (
      this.pool[this.currSound].currentTime === 0 ||
      this.pool[this.currSound].ended
    ) {
      this.pool[this.currSound].play();
    }
    this.currSound = (this.currSound + 1) % this.maxSize;
  }
}
