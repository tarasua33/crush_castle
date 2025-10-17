import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";
import { Game } from "../../../scenes/Game";

export interface PreparationStrikeStepParams extends BaseStepParams {
  scene: Game;
  bullet: Phaser.Physics.Matter.Image[];
  duration: number;
}

export class PreparationStrikeStep extends BaseStep<PreparationStrikeStepParams> {
  public start(params: PreparationStrikeStepParams): void {
    this._params = params;
    const { bullet: bullets, scene, duration } = params;
    const bullet = bullets[this._models.weaponModel.weaponId]

    scene.camera.once('camerazoomcomplete', this._onComplete, this);
    scene.camera.pan(bullet.x, bullet.y, duration, 'Sine.easeInOut');
    scene.zoomTo(1.2, duration, 'Sine.easeInOut');
  }

  protected _onComplete(): void {
    const { bullet: bullets, scene } = this._params;
    const bullet = bullets[this._models.weaponModel.weaponId]
    bullet.setAngularVelocity(-0.5);
    scene.camera.off('camerazoomcomplete', this._onComplete, this);
    scene.camera.startFollow(bullet, true, 0.1, 0.1);

    super._onComplete();
  }
}