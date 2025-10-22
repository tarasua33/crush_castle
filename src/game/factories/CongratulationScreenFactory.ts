import { GAME_DIMENSIONS } from "../GameConfig";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";
import { CongratulationScreen, CongratulationScreenConfig } from "../screens/CongratulationScreen";

interface IBuildConfig {
  scene: Phaser.Scene
}

export class CongratulationScreenFactory extends AbstractStandardFactory<CongratulationScreen> {
  public buildUi({ scene }: IBuildConfig): CongratulationScreen {
    const screen = new CongratulationScreen(scene, GAME_DIMENSIONS.width / 2, GAME_DIMENSIONS.height / 2);

    const starTextureName = 'star';
    const confetti = "confetti";
    const particleConfig: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
      x: 0,
      y: 0,
      speed: { min: 300, max: 700 },
      angle: { min: -115, max: -65 },
      gravityY: 900,
      // duration: 100,
      lifespan: { min: 1200, max: 2200 },
      rotate: { min: -360, max: 360 },
      alpha: { start: 1, end: 0 },
      scale: { start: 0, end: 1 },
      // blendMode: 'ADD',
      emitting: false,
      tint: [0xff0000, 0x00ff00, 0x0000ff, 0xFDD836],
      quantity: 150
    }

    const config: CongratulationScreenConfig = {
      textStyle: {
        x: 0,
        y: 0,
        text: "YOU WON!",
        style: {
          fontFamily: 'sans-serif, Arial',
          fontSize: '88px',
          fontStyle: 'bold',
          color: '#FEFF43',
          align: "center",
        }
      },
      starConfigs: [
        {
          x: -150,
          y: -150,
          texture: starTextureName
        },
        {
          x: 0,
          y: -175,
          texture: starTextureName
        },
        {
          x: 150,
          y: -150,
          texture: starTextureName
        }
      ],
      congratulationParticles: [
        {
          x: 0, y: 0,
          texture: confetti,
          config: particleConfig
        }
      ]
    };
    screen.build(config);

    scene.add.existing(screen);

    return screen;
  }
}