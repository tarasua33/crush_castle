import { CASTLE_BASE_X, CASTLE_BASE_Y } from "../GameConfig";
import { Enemy } from "../gameObjects/Enemy";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";

interface IBuildConfig {
  scene: Phaser.Scene
}

export class EnemiesFactory extends AbstractStandardFactory<Phaser.GameObjects.Group> {
  public buildUi({ scene }: IBuildConfig): Phaser.GameObjects.Group {
    const maxEnemies = this._models.enemyModel.maxEnemies;

    const enemyPool = scene.add.group({
      classType: Enemy,
      maxSize: maxEnemies
    });

    for (let i = 0; i < maxEnemies; i++) {
      // const enemy = scene.matter.add.image(
      const enemy = new Enemy(
        scene,
        0,
        0,
        "enemy"
      );
      enemy.setScale(-1, 1);
      enemy.setPosition(CASTLE_BASE_X + 48, CASTLE_BASE_Y - 32);
      // enemy.spawn(CASTLE_BASE_X + 48, CASTLE_BASE_Y - 32);

      enemyPool.add(enemy);
      enemyPool.killAndHide(enemy);
    }

    // for (let i = 0; i < 1; i++) {
    //   enemyPool.get(CASTLE_BASE_X + 24, CASTLE_BASE_Y - 32, "enemy");
    // }

    return enemyPool;
  }
}