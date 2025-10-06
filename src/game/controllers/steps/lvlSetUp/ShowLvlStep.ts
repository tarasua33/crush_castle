import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";
import { Game } from "../../../scenes/Game";

export interface ShowLvlStepParams extends BaseStepParams {
  scene: Game;
  duration: number;
}

export class ShowLvlStep extends BaseStep<ShowLvlStepParams> {
  public start(params: ShowLvlStepParams): void {
    this._params = params;
    const { scene, duration } = params;

    scene.camera.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, this._onComplete, this);
    scene.camera.fadeIn(duration, 6, 252, 255);
  }
}