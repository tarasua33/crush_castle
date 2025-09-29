import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";

export interface StartFlyStepParams extends BaseStepParams {
  scene: Phaser.Scene;
  bullet: Phaser.Physics.Matter.Image;
}

export class StartFlyStep extends BaseStep<StartFlyStepParams> {
  public start(params: StartFlyStepParams): void {
    this._params = params;
    const { scene } = params;

    scene.matter.world.on("afterupdate", this._worldUpdate, this);
  }

  private _worldUpdate(): void {
    if ((this._params.bullet.body as any).speed && (this._params.bullet.body as any).speed > 0) {
      this._onComplete();
    }
  }

  protected _onComplete(): void {
    this._params.scene.matter.world.off("afterupdate", this._worldUpdate, this);

    super._onComplete();

  }
}