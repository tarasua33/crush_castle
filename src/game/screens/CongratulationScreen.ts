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

    this.reset();
  }

  public show(): void {
    this.visible = true;

    const text = this._text;
    // text.alpha = 0;
    text.scale = 10;

    this.scene.tweens.add({
      targets: text,
      scale: 1,
      // alpha: 1,
      duration: 800,
      ease: 'Bounce.easeOut',
      // onComplete: this._onTextShowComplete.bind(this)
    });

    const stars = this._stars;
    for (let i = 0; i < stars.length; i++) {
      stars[i].scale = 10;
      stars[i].alpha = 0;

      this.scene.tweens.add({
        targets: stars[i],
        scale: 1,
        alpha: 1,
        duration: 400,
        delay: 800 + 250 * i,
        ease: 'Bounce.easeOut',
        onComplete: i === stars.length - 1 ? this._onStarsShowComplete.bind(this) : undefined
      });
    }
  }

  // private _onTextShowComplete() {
  //   const particles = this._particles;

  //   for (let i = 0; i < particles.length; i++) {
  //     particles[i].explode();
  //   }
  // }

  private _onStarsShowComplete() {
    this.animationComplete.emit(EVENTS.COMPLETE);
  }

  public reset(): void {
    this.visible = false;
  }
}