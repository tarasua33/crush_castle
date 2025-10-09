import { SLING_SHOT_X, SLING_SHOT_Y } from "../../../GameConfig";
import { Enemy } from "../../../gameObjects/Enemy";
import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";
import { Game } from "../../../scenes/Game";

export interface ResetEnemyStepParams extends BaseStepParams {
  scene: Game;
  enemyPool: Phaser.GameObjects.Group;
  bullet: Phaser.Physics.Matter.Image;
  bricks: Phaser.Physics.Matter.Image[];
}

export class ResetEnemyStep extends BaseStep<ResetEnemyStepParams> {
  public start(params: ResetEnemyStepParams): void {
    this._params = params;
    const { bullet, enemyPool, bricks, scene } = params;

    for (const brick of bricks) {
      brick.visible = false;
      brick.active = false;
      brick.x = 0;
      brick.y = 0;
      brick.setSensor(true);
      brick.setIgnoreGravity(true);
      brick.setVelocity(0);
      brick.setAngularSpeed(0);
      brick.setAngularVelocity(0);

      scene.matter.world.remove(brick);
      scene.matter.world.remove(brick.body!);
    }

    for (const enemy of (enemyPool.getChildren() as Enemy[])) {
      enemyPool.killAndHide(enemy);
      enemy.visible = false;
      enemy.active = false;
    }

    bullet.setPosition(SLING_SHOT_X, SLING_SHOT_Y);

    // scene.matter.world.destroy();

    this._onComplete()
  }
}