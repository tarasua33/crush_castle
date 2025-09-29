import { ConstraintComponent } from "../../../components/ConstraintComponent";
import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";

export interface StartStrikeStepParams extends BaseStepParams {
  scene: Phaser.Scene;
  bullet: Phaser.Physics.Matter.Image;
  constraintComponent: ConstraintComponent;
}

export class StartStrikeStep extends BaseStep<StartStrikeStepParams> {
  public start(params: StartStrikeStepParams): void {
    this._params = params;
    const { scene, constraintComponent } = params;

    params.scene.matter.world.removeConstraint(constraintComponent.constraint);

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