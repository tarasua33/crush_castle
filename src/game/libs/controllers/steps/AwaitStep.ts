import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";

export interface AwaitStepParams extends BaseStepParams {
  scene: Phaser.Scene;
  delay: number;
}

export class AwaitStep extends BaseStep<AwaitStepParams> {
  public start(params: AwaitStepParams): void {
    this._params = params;
    const { scene, delay } = params;

    scene.time.delayedCall(delay, this._onComplete, undefined, this);
  }
}