import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";
import { Game } from "../../../scenes/Game";

export interface HideLvlStepParams extends BaseStepParams {
  scene: Game;
  duration: number;
}

export class HideLvlStep extends BaseStep<HideLvlStepParams> {
  public start(params: HideLvlStepParams): void {
    this._params = params;
    const { scene, duration } = params;

    scene.camera.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, this._onComplete, this);
    scene.camera.fadeOut(duration, 6, 252, 255);
  }
}