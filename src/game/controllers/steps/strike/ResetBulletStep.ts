import { SLING_SHOT_X, SLING_SHOT_Y } from "../../../GameConfig";
import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";

export interface ResetBulletStepParams extends BaseStepParams {
  // scene: Phaser.Scene;
  bullet: Phaser.Physics.Matter.Image;
}

export class ResetBulletStep extends BaseStep<ResetBulletStepParams> {
  public start(params: ResetBulletStepParams): void {
    this._params = params;
    const { bullet } = params;

    bullet.setPosition(SLING_SHOT_X, SLING_SHOT_Y);

    this._onComplete();
  }
}