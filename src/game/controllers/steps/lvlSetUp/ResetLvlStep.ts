import { SLING_SHOT_X, SLING_SHOT_Y } from "../../../GameConfig";
import { CastleBrick } from "../../../gameObjects/CastleBrick";
import { Enemy } from "../../../gameObjects/Enemy";
import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";
import { Game } from "../../../scenes/Game";

export interface ResetLvlStepParams extends BaseStepParams {
  scene: Game;
  enemyPool: Phaser.GameObjects.Group;
  bullet: Phaser.Physics.Matter.Image;
  bricks: Phaser.GameObjects.Group;
  mountains: Phaser.GameObjects.TileSprite[];
}

export class ResetLvlStep extends BaseStep<ResetLvlStepParams> {
  public start(params: ResetLvlStepParams): void {
    this._params = params;
    const { bullet, enemyPool, bricks, mountains, scene } = params;

    for (const brick of (bricks.getChildren() as CastleBrick[])) {
      brick.hideObject();
    }
    // for (const brick of bricks) {
    //   brick.visible = false;
    //   brick.active = false;
    //   brick.setSensor(true);
    //   brick.setIgnoreGravity(true);
    //   brick.setVelocity(0);
    //   brick.setAngularSpeed(0);
    //   brick.setAngularVelocity(0);
    //   brick.x = 0;
    //   brick.y = 0;

    //   scene.matter.world.remove(brick);
    //   scene.matter.world.remove(brick.body!);
    // }

    for (const enemy of (enemyPool.getChildren() as Enemy[])) {
      enemyPool.killAndHide(enemy);
      enemy.visible = false;
      enemy.active = false;
    }

    for (const ground of mountains) {
      ground.visible = false;
      ground.active = false;
      // scene.matter.world.remove(ground);
      scene.matter.world.remove(ground.body!);
    }

    bullet.setPosition(SLING_SHOT_X, SLING_SHOT_Y);

    // scene.matter.world.destroy();

    this._onComplete()
  }
}