import { BRICKS_NUMBER } from "../GameConfig";
import { CastleBrick } from "../gameObjects/CastleBrick";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";

interface IBuildConfig {
  scene: Phaser.Scene
}

export class CastlesFactory extends AbstractStandardFactory<Phaser.GameObjects.Group> {
  public buildUi({ scene }: IBuildConfig): Phaser.GameObjects.Group {

    const brickPool = scene.add.group({
      classType: CastleBrick,
      maxSize: BRICKS_NUMBER
    });

    for (let i = 0; i < BRICKS_NUMBER; i++) {
      const brick = new CastleBrick(
        scene,
        0,
        0,
        "brick_tile",
        brickPool
      );

      brickPool.add(brick);
      brickPool.killAndHide(brick);
    }

    return brickPool;
  }
}