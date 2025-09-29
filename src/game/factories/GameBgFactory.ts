import { GAME_DIMENSIONS } from "../GameConfig";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";

interface IBuildConfig {
  scene: Phaser.Scene
}

export class GameBgFactory extends AbstractStandardFactory<Phaser.GameObjects.Image> {
  public buildUi({ scene }: IBuildConfig): Phaser.GameObjects.Image {
    const skyBg = scene.add.image(
      GAME_DIMENSIONS.width / 2,
      GAME_DIMENSIONS.height / 2,
      "gameBg"
    );
    skyBg.setScale(2);
    skyBg.setOrigin(0.5);

    return skyBg;
  }
}