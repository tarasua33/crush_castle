import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";
import { Game } from "../../../scenes/Game";

export interface MoveOnTargetStepParams extends BaseStepParams {
  scene: Game;
  duration: number;
  x: number;
  y: number;
}

export class MoveOnTargetStep extends BaseStep<MoveOnTargetStepParams> {
  public start(params: MoveOnTargetStepParams): void {
    this._params = params;
    const { scene, duration, x, y } = params;

    scene.camera.stopFollow();

    if (duration > 0) {
      scene.camera.once('camerazoomcomplete', this._onComplete, this);
      scene.camera.pan(x, y, duration, 'Sine.easeInOut');
      scene.zoomTo(1, duration, 'Sine.easeInOut');
    }
    else {
      this._onComplete()
    }
  }

  protected _onComplete(): void {
    const { scene, x, y } = this._params;
    scene.camera.off('camerazoomcomplete', this._onComplete, this);
    scene.camera.centerOn(x, y);
    scene.setZoom(1);

    super._onComplete();
  }
}