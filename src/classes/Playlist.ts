import * as Calculations from "../helpers/Calculations";

export class Playlist {
  private player = new Audio();
  private currentTrack = 0;

  constructor(
    private playlist: string[],
    volume: number,
    private random: boolean
  ) {
    this.currentTrack = random
      ? Calculations.getRandomInt(0, playlist.length - 1)
      : 0;
    this.player.volume = volume || 0.5;
    this.player.src = playlist[this.currentTrack];
    this.player.addEventListener("ended", this.next.bind(this));
  }

  public setVolume(volume: number) {
    this.player.volume = volume;
  }

  public mute(state?: boolean) {
    // State: toggle, true or false.
    this.player.muted =
      typeof state === "undefined" ? !this.player.muted : state;
  }

  public play() {
    this.player.play();
  }

  public pause() {
    this.player.pause();
  }

  public next() {
    this.currentTrack = this.random
      ? Calculations.getRandomInt(0, this.playlist.length - 1)
      : (this.currentTrack = (this.currentTrack + 1) % this.playlist.length);

    this.player.src = this.playlist[this.currentTrack];
    this.player.play();
  }

  public isPlaying() {
    return !this.player.paused;
  }
}
