import { GAME_DIMENSIONS, SLING_SHOT_X, SLING_SHOT_Y } from "../../../GameConfig";
import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";
import { Game } from "../../../scenes/Game";

export interface ResetBulletStepParams extends BaseStepParams {
  scene: Game;
  bullet: Phaser.Physics.Matter.Image;
}

export class ResetBulletStep extends BaseStep<ResetBulletStepParams> {
  public start(params: ResetBulletStepParams): void {
    this._params = params;
    const { bullet, scene } = params;

    bullet.setPosition(SLING_SHOT_X, SLING_SHOT_Y);
    const duration = 500;
    scene.camera.stopFollow();
    scene.camera.once('camerazoomcomplete', this._onComplete, this);
    scene.camera.pan(GAME_DIMENSIONS.width / 2, GAME_DIMENSIONS.height / 2, duration, 'Sine.easeInOut');
    scene.zoomTo(1, duration, 'Sine.easeInOut');
  }

  protected _onComplete(): void {
    const { scene } = this._params;
    scene.camera.off('camerazoomcomplete', this._onComplete, this);
    scene.camera.centerOn(GAME_DIMENSIONS.width / 2, GAME_DIMENSIONS.height / 2);

    super._onComplete();
  }
}