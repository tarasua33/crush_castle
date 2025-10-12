import { CLOUDS, GAME_DIMENSIONS } from "../GameConfig";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";

interface IBuildConfig {
  scene: Phaser.Scene
}

export class GameBgFactory extends AbstractStandardFactory<Phaser.GameObjects.Container> {
  public buildUi({ scene }: IBuildConfig): Phaser.GameObjects.Container {
    const bgContainer = scene.add.container();

    const skyBg = scene.add.image(
      GAME_DIMENSIONS.width / 2,
      GAME_DIMENSIONS.height / 2,
      "gameBg"
    );
    skyBg.setScale(100, 8);
    skyBg.setOrigin(0.5, 0.7);
    bgContainer.add(skyBg);

    for (let i = 0; i < CLOUDS; i++) {
      const cloud = scene.add.image(
        - GAME_DIMENSIONS.width / 4 + (GAME_DIMENSIONS.width * 1.5) * Math.random(),
        (GAME_DIMENSIONS.height) * Math.random(),
        i % 2 === 0 ? "cloud1" : "cloud2"
      );
      bgContainer.add(cloud);
    }

    const hillBack = scene.add.tileSprite(
      GAME_DIMENSIONS.width / 2,
      GAME_DIMENSIONS.height / 2 - 500,
      GAME_DIMENSIONS.width * 2,
      511,
      "hills2"
    );
    hillBack.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    hillBack.setOrigin(0.5, 1);
    hillBack.setScale(-2);
    bgContainer.add(hillBack);

    const hillFront = scene.add.tileSprite(
      GAME_DIMENSIONS.width / 2,
      GAME_DIMENSIONS.height / 2 - 500,
      GAME_DIMENSIONS.width * 2,
      511,
      "hills1"
    );
    hillFront.setOrigin(0.5, 1);
    hillFront.setScale(-2);
    hillFront.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    bgContainer.add(hillFront);

    return bgContainer;
  }
}