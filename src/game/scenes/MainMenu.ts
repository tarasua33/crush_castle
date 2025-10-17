import { Scene, GameObjects } from 'phaser';
import { GAME_DIMENSIONS } from '../GameConfig';
import { mountUI } from '../../ui/main';

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  camera: Phaser.Cameras.Scene2D.Camera;

  constructor() {
    super('MainMenu');
  }

  create() {
    this.background = this.add.image(GAME_DIMENSIONS.width / 2, GAME_DIMENSIONS.height / 2, 'background');
    this.background.setOrigin(0.5);

    this.logo = this.add.image(GAME_DIMENSIONS.width / 2, GAME_DIMENSIONS.height / 2, 'logo');
    this.logo.setAlpha(0);
    this.logo.setOrigin(0.5);
    this.logo.setScale(0.9);


    this.camera = this.cameras.main;
    this.scale.on('resize', this.resize, this);
    this.resize({ width: window.innerWidth, height: window.innerHeight });


    this._animateLogoShow();

    mountUI();
  }

  private _animateLogoShow() {
    const baseWidth = GAME_DIMENSIONS.width;
    const baseHeight = GAME_DIMENSIONS.height;

    // Front-facing drop: start large then bounce to 1.0 scale
    this.logo.setAlpha(1);
    this.logo.setScale(5.8);
    this.logo.setPosition(baseWidth / 2, baseHeight / 2);

    this.tweens.add({
      targets: this.logo,
      scale: 1,
      duration: 600,
      ease: 'Bounce.easeOut',
      onComplete: this._onLogoShowComplete.bind(this)
    });
  }

  private _onLogoShowComplete() {
    // After a short delay, animate hide
    this._animateLogoHide()
  }

  private _animateLogoHide() {
    const baseWidth = GAME_DIMENSIONS.width;
    const baseHeight = GAME_DIMENSIONS.height;

    // Scale up to cover screen and fade out
    const maxDimension = Math.max(baseWidth, baseHeight);
    const logoSize = Math.max(this.logo.width, this.logo.height);
    const targetScale = (maxDimension * 1.2) / logoSize; // overshoot to ensure full cover

    this.tweens.add({
      targets: this.logo,
      scale: targetScale,
      delay: 1000,
      alpha: 0,
      duration: 500,
      ease: 'Sine.easeIn',
      onComplete: this._onLogoHideComplete.bind(this)
    });
  }

  private _onLogoHideComplete() {
    this.scale.off('resize', this.resize, this);
    this.scene.start('Game');
  }

  resize(gameSize: Partial<Phaser.Structs.Size>) {
    const { width, height } = gameSize;

    const vw = width!;
    const vh = height!;

    const baseWidth = GAME_DIMENSIONS.width;
    const baseHeight = GAME_DIMENSIONS.height;

    const scale = Math.min(
      vw / baseWidth,
      vh / baseHeight
    );

    this.cameras.main.setZoom(scale);
    this.cameras.main.centerOn(baseWidth / 2, baseHeight / 2);

    // Adjust background scale based on computed scale
    this.background.setScale(1 / scale);
  }
}
