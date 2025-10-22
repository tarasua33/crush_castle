import { EVENTS } from "../libs/events/Events";

export interface CongratulationScreenConfig {
  // scene: Phaser.Scene;
  textStyle: {
    x: number;
    y: number;
    text: string | string[];
    style?: Phaser.Types.GameObjects.Text.TextStyle;
  };
  starConfigs: {
    x: number;
    y: number;
    texture: string | Phaser.Textures.Texture;
  }[];
  congratulationParticles: {
    x?: number;
    y?: number;
    texture?: string | Phaser.Textures.Texture;
    config?: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig;
  }[];
}

export class CongratulationScreen extends Phaser.GameObjects.Container {
  public readonly animationComplete = new Phaser.Events.EventEmitter();

  private _text!: Phaser.GameObjects.Text;
  private _stars: Phaser.GameObjects.Image[] = [];
  private _particles: Phaser.GameObjects.Particles.ParticleEmitter[] = [];

  public build(config: CongratulationScreenConfig): void {
    const { textStyle, starConfigs, congratulationParticles } = config;

    const congratulationText = this._text = this.scene.add.text(textStyle.x, textStyle.y, textStyle.text, textStyle.style);
    congratulationText.setOrigin(0.5);
    this.add(congratulationText);

    for (let i = 0; i < starConfigs.length; i++) {
      const conf = starConfigs[i];
      const star = this.scene.add.image(conf.x, conf.y, conf.texture);
      this.add(star);

      this._stars.push(star);
    }

    for (let i = 0; i < congratulationParticles.length; i++) {
      const conf = congratulationParticles[i];
      const particles = this.scene.add.particles(conf.x, conf.y, conf.texture, conf.config);
      this.add(particles);

      this._particles.push(particles);
    }
  }

  public show(): void {
    this._text.scale = 5;

    this.scene.tweens.add({
      targets: this._text,
      scale: 1,
      duration: 600,
      ease: 'Bounce.easeOut',
      onComplete: this._onTextShowComplete.bind(this)
    });

    const stars = this._stars;
    for (let i = 0; i < this._stars.length; i++) {
      stars[i].scale = 5;

      this.scene.tweens.add({
        targets: stars,
        scale: 1,
        duration: 600,
        delay: 500 * i,
        ease: 'Bounce.easeOut',
        onComplete: this._onStarsShowComplete.bind(this)
      });
    }
  }

  private _onTextShowComplete() {
    const particles = this._particles;

    for (let i = 0; i < particles.length; i++) {
      particles[i].explode();
    }
  }

  private _onStarsShowComplete() {
    this.animationComplete.emit(EVENTS.COMPLETE);
  }
}