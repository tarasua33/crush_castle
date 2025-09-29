import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";

export interface EndStrikeStepParams extends BaseStepParams {
  scene: Phaser.Scene;
}

export class EndStrikeStep extends BaseStep<EndStrikeStepParams> {
  public start(params: EndStrikeStepParams): void {
    this._params = params;
    const { scene } = params;

    scene.matter.world.on("afterupdate", this._worldUpdate, this);
  }

  private _worldUpdate(): void {
    const bodies = (this._params.scene.matter.world.localWorld as any).bodies;

    let active = false;
    for (const body of bodies) {
      if (body.speed > 0.2) {
        active = true;
      }
    }

    if (!active) {
      this._onComplete();
    }
  }

  protected _onComplete(): void {
    this._params.scene.matter.world.off("afterupdate", this._worldUpdate, this);

    super._onComplete();
  }
}