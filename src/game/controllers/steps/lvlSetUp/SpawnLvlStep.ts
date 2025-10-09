import { CASTLE_BASE_X, CASTLE_BASE_Y, GAME_DIMENSIONS, SLING_SHOT_X, SLING_SHOT_Y } from "../../../GameConfig";
import { Enemy } from "../../../gameObjects/Enemy";
import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";
import { Game } from "../../../scenes/Game";

export interface SpawnLvlStepParams extends BaseStepParams {
  scene: Game;
  enemyPool: Phaser.GameObjects.Group;
  bullet: Phaser.Physics.Matter.Image;
  bricks: Phaser.Physics.Matter.Image[];
}

export class SpawnLvlStep extends BaseStep<SpawnLvlStepParams> {
  public start(params: SpawnLvlStepParams): void {
    this._params = params;
    const { bullet, scene, enemyPool, bricks } = params;
    const lvls = scene.cache.json.get("lvls")[0];

    const castle: { x: number, y: number, rotation: number }[] = lvls.castle;
    let i = 0;
    for (const d of castle) {
      const brick = bricks[i];
      brick.setPosition(CASTLE_BASE_X + d.x, CASTLE_BASE_Y + d.y);
      brick.rotation = d.rotation;
      brick.visible = true;
      brick.active = true;
      brick.setSensor(false);
      brick.setVelocity(0);
      brick.setAngularSpeed(0);
      brick.setAngularVelocity(0);

      i++;
    }

    const enemies: { x: number, y: number, type: string }[] = lvls.enemies;
    for (let i = 0; i < enemies.length; i++) {
      const enemyData = enemies[i];
      const enemy = enemyPool.get() as Enemy;
      enemy.spawn(CASTLE_BASE_X + enemyData.x, CASTLE_BASE_Y + enemyData.y, enemyData.type, enemyPool);
    }

    bullet.setPosition(SLING_SHOT_X, SLING_SHOT_Y);
    bullet.setStatic(true);

    scene.camera.stopFollow();
    scene.camera.centerOn(GAME_DIMENSIONS.width / 2, GAME_DIMENSIONS.height / 2);
    scene.setZoom(1);

    this._onComplete()
  }
}