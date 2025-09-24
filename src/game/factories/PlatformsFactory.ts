import { GAME_DIMENSIONS, PLATFORM_HEIGHT, PLATFORM_Y } from "../GameConfig";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";

interface IBuildConfig {
  scene: Phaser.Scene
}

export class PlatformsFactory extends AbstractStandardFactory<Phaser.GameObjects.TileSprite> {
  public buildUi({ scene }: IBuildConfig): Phaser.GameObjects.TileSprite {
    // const ground = scene.add.tileSprite(500, 600, 800, 40, "bgTile").setOrigin(0.5, 0.5);
    const ground = scene.add.tileSprite(
      GAME_DIMENSIONS.width / 2,
      PLATFORM_Y - PLATFORM_HEIGHT / 2,
      GAME_DIMENSIONS.width * 2,
      PLATFORM_HEIGHT,
      "bgTile"
    );
    ground.setOrigin(0.5);
    scene.matter.add.gameObject(ground, {
      isStatic: true,
      label: "ground"
    });

    console.log("ground", ground.y - ground.height / 2);
    return ground;
  }
}