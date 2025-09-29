import { ConstraintComponent } from "../../../components/ConstraintComponent";
import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";

export interface AwaitStrikeStepParams extends BaseStepParams {
  scene: Phaser.Scene;
  bullet: Phaser.Physics.Matter.Image;
  constraintComponent: ConstraintComponent;
}

export class AwaitStrikeStep extends BaseStep<AwaitStrikeStepParams> {
  public start(params: AwaitStrikeStepParams): void {
    this._params = params;
    const { scene } = params;

    scene.matter.world.on("afterupdate", this._worldUpdate, this);
  }

  private _worldUpdate(): void {
    const { bullet, constraintComponent } = this._params;
    const pos = constraintComponent.getPosition();
    bullet.setPosition(pos.x, pos.y);
  }

  protected _onComplete(): void {
    this._params.scene.matter.world.off("afterupdate", this._worldUpdate, this);
    this._worldUpdate();

    super._onComplete();

  }

  public forceComplete(): void {
    this._onComplete();
  }
}