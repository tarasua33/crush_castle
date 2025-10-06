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
    const { bullet, enemyPool, bricks } = params;

    for (const brick of bricks) {
      brick.visible = false;
    }

    for (const enemy of (enemyPool.getChildren() as Enemy[])) {
      enemyPool.killAndHide(enemy);
      enemy.visible = false;
      enemy.active = false;
    }

    bullet.setPosition(SLING_SHOT_X, SLING_SHOT_Y);

    this._onComplete()
  }
}