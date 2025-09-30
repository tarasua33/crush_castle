import { ConstraintComponent } from "../../../components/ConstraintComponent";
import { MAX_CONSTRAIN } from "../../../GameConfig";
import { Slingshot } from "../../../gameObjects/Slingshot";
import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";

export interface StartStrikeStepParams extends BaseStepParams {
  scene: Phaser.Scene;
  bullet: Phaser.Physics.Matter.Image;
  constraintComponent: ConstraintComponent;
  slingshotPoint: Slingshot;
}

export class StartStrikeStep extends BaseStep<StartStrikeStepParams> {
  private _trashHold = 3;
  private _previousDist = 150;

  public start(params: StartStrikeStepParams): void {
    this._params = params;
    const { scene, constraintComponent } = params;
    this._previousDist = MAX_CONSTRAIN + 10;
    params.scene.matter.world.removeConstraint(constraintComponent.constraint);

    scene.matter.world.on("afterupdate", this._worldUpdate, this);
  }

  private _worldUpdate(): void {
    const { bullet } = this._params;
    const slingshotContainer = this._params.slingshotPoint;
    const slingshotPoint = this._params.slingshotPoint.slingshotPoint.body!.position;

    const dist = Phaser.Math.Distance.Between(slingshotPoint.x, slingshotPoint.y, bullet.x, bullet.y);
    const angle = Math.atan2(bullet.y - slingshotPoint.y, bullet.x - slingshotPoint.x);

    if (
      (this._params.bullet.body as any).speed &&
      (this._params.bullet.body as any).speed > 0 &&
      (dist < this._trashHold || dist > this._previousDist)
    ) {
      slingshotContainer.rotateSlingshotPoint(0);
      slingshotContainer.rotateRope(0, 1);

      this._onComplete();
    }
    else {
      slingshotContainer.rotateSlingshotPoint(dist);
      slingshotContainer.rotateRope(angle, dist);
      this._previousDist = dist;
    }
    // if ((this._params.bullet.body as any).speed && (this._params.bullet.body as any).speed > 0) {
    // }
  }

  protected _onComplete(): void {
    this._params.scene.matter.world.off("afterupdate", this._worldUpdate, this);

    super._onComplete();

  }
}