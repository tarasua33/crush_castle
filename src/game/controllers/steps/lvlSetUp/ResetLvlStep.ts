import { SLING_SHOT_X, SLING_SHOT_Y } from "../../../GameConfig";
import { Bullet } from "../../../gameObjects/Bullet";
import { CastleBrick } from "../../../gameObjects/CastleBrick";
import { Enemy } from "../../../gameObjects/Enemy";
import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";
import { Game } from "../../../scenes/Game";
import { CongratulationScreen } from "../../../screens/CongratulationScreen";

export interface ResetLvlStepParams extends BaseStepParams {
  scene: Game;
  enemyPool: Phaser.GameObjects.Group;
  bullet: Bullet[];
  bricks: Phaser.GameObjects.Group;
  mountains: Phaser.GameObjects.TileSprite[];
  congratulationScreen: CongratulationScreen;

}

export class ResetLvlStep extends BaseStep<ResetLvlStepParams> {
  public start(params: ResetLvlStepParams): void {
    this._params = params;
    const { bullet: bullets, enemyPool, bricks, mountains, scene, congratulationScreen } = params;
    const bullet = bullets[this._models.weaponModel.weaponId]

    scene.matter.world.pause();

    for (const brick of (bricks.getChildren() as CastleBrick[])) {
      brick.hideObject();
    }

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

    bullet.hideObject();
    bullet.spawn(SLING_SHOT_X, SLING_SHOT_Y);

    // scene.matter.world.destroy();
    congratulationScreen.reset();

    this._onComplete()
  }
}