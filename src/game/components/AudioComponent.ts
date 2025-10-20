export enum Sounds {
  Ambient = 'ambient-spring'
}

export class AudioComponent {
  static instance: AudioComponent;
  static getComponent(scene: Phaser.Scene): AudioComponent {
    if (!AudioComponent.instance) {
      AudioComponent.instance = new AudioComponent;

      AudioComponent.instance._init(scene);
    }

    return AudioComponent.instance;
  }

  private _scene: Phaser.Scene;
  private _sounds: Record<Sounds, Phaser.Sound.NoAudioSound>;

  private _init(scene: Phaser.Scene): void {
    this._scene = scene;

    scene.sound.volume = 0.15;

    this._sounds = {
      [Sounds.Ambient]: scene.sound.add('ambient-spring') as Phaser.Sound.NoAudioSound,
    }
  }

  public play(name: Sounds, loop = false, volume: number = 1): void {
    this._sounds[name].play({ loop, volume });
  }

  public toggleAudio(enabled: boolean): void {
    this._scene.sound.mute = !enabled;
  }
}