import { CASTLE_BASE_X, PLATFORM_HEIGHT, PLATFORM_TILE_WIDTH, PLATFORM_Y } from "../GameConfig";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";

interface IBuildConfig {
  scene: Phaser.Scene
}

export class MountainsFactory extends AbstractStandardFactory<Phaser.GameObjects.TileSprite[]> {
  public buildUi({ scene }: IBuildConfig): Phaser.GameObjects.TileSprite[] {
    const mountains = [];

    for (let i = 0; i < 3; i++) {
      const ground = scene.add.tileSprite(
        CASTLE_BASE_X + PLATFORM_TILE_WIDTH,
        PLATFORM_Y - (PLATFORM_HEIGHT * (i + 1) + PLATFORM_HEIGHT / 2),
        PLATFORM_TILE_WIDTH * (4 - i),
        PLATFORM_HEIGHT,
        "bgTile"
      );
      ground.setOrigin(0.5);
      scene.matter.add.gameObject(ground, {
        isStatic: true,
        label: "mountains"
      });

      ground.visible = false;
      ground.active = false;
      scene.matter.world.remove(ground);
      scene.matter.world.remove(ground.body!);

      mountains.push(ground);
    }

    return mountains;
  }
}