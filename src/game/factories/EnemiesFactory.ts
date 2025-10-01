import { CASTLE_BASE_X, CASTLE_BASE_Y } from "../GameConfig";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";

interface IBuildConfig {
  scene: Phaser.Scene
}

export class EnemiesFactory extends AbstractStandardFactory<Phaser.GameObjects.Group> {
  public buildUi({ scene }: IBuildConfig): Phaser.GameObjects.Group {
    // const data: { x: number, y: number, rotation: number }[] = scene.cache.json.get("castles");

    const enemyPool = scene.add.group({
      classType: Phaser.Physics.Matter.Image,
      maxSize: 3
    });

    for (let i = 0; i < 1; i++) {
      const enemy = scene.matter.add.image(
        CASTLE_BASE_X + 48,
        CASTLE_BASE_Y - 32,
        "enemy"
      );
      enemy.setScale(-1, 1);

      enemyPool.add(enemy);
    }

    // for (let i = 0; i < 1; i++) {
    //   enemyPool.get(CASTLE_BASE_X + 24, CASTLE_BASE_Y - 32, "enemy");
    // }

    return enemyPool;
  }
}