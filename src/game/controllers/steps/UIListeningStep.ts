import { ConstraintComponent } from "../../components/ConstraintComponent";
import { Bullet } from "../../gameObjects/Bullet";
import { BaseStep, BaseStepParams } from "../../libs/controllers/steps/BaseStep";
import { EVENTS } from "../../libs/events/Events";

export interface UIListeningStepParams extends BaseStepParams {
  scene: Phaser.Scene;
  uiSignal: Phaser.Events.EventEmitter;
  bullet: Bullet[];
  constraintComponent: ConstraintComponent;
}

export class UIListeningStep extends BaseStep<UIListeningStepParams> {
  public start(params: UIListeningStepParams): void {
    this._params = params;
    const { uiSignal } = params;

    uiSignal.on(EVENTS.CHANGE_BULLET, this._changeBullet, this);
  }

  private _changeBullet(id: number): void {
    const weaponModel = this._models.weaponModel;
    const bullets = this._params.bullet;
    const previousBullet = bullets[weaponModel.weaponId];
    const { x, y } = previousBullet;

    const { scene, constraintComponent } = this._params;

    weaponModel.weaponId = id;

    scene.matter.world.removeConstraint(constraintComponent.constraint);
    previousBullet.hideObject();

    const bodyB = constraintComponent.constraint.bodyB!
    const newBullet = bullets[weaponModel.weaponId];
    newBullet.spawn(x, y);

    constraintComponent.createConstraint(
      newBullet.body as MatterJS.BodyType,
      bodyB,
      scene
    );

    console.log("Change Bullet", id);
  }

  protected _onComplete(): void {
    this._params.uiSignal.off(EVENTS.CHANGE_BULLET, this._changeBullet);

    super._onComplete();
  }

  public forceComplete(): void {
    this._onComplete();
  }
}