import { ConstraintComponent } from "../../../components/ConstraintComponent";
import { SLING_SHOT_X, SLING_SHOT_Y } from "../../../GameConfig";
import { Bullet } from "../../../gameObjects/Bullet";
import { Slingshot } from "../../../gameObjects/Slingshot";
import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";

export interface ResetBulletStepParams extends BaseStepParams {
  bullet: Bullet[];
  constraintComponent: ConstraintComponent;
  slingshotPoint: Slingshot;
  scene: Phaser.Scene;
}

export class ResetBulletStep extends BaseStep<ResetBulletStepParams> {
  public start(params: ResetBulletStepParams): void {
    this._params = params;
    const { scene, bullet: bullets, constraintComponent, slingshotPoint } = params;
    const bullet = bullets[this._models.weaponModel.weaponId]

    bullet.spawn(SLING_SHOT_X, SLING_SHOT_Y);
    // bullet.setStatic(false);

    constraintComponent.createConstraint(
      bullet.body as MatterJS.BodyType,
      slingshotPoint.slingshotPoint as unknown as MatterJS.BodyType,
      scene);

    this._onComplete();
  }
}