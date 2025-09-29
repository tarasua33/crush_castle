import { PointerComponent } from "../../components/PointerComponent";
import { MAX_VELOCITY } from "../../GameConfig";
import { BaseStep, BaseStepParams } from "../../libs/controllers/steps/BaseStep";

export interface EndDragStepParams extends BaseStepParams {
  scene: Phaser.Scene;
  bullet: Phaser.Physics.Matter.Image;
  pointerComponent: PointerComponent;
  constraint: MatterJS.ConstraintType;
}

export class EndDragStep extends BaseStep<EndDragStepParams> {
  private _pointerComponent: PointerComponent;

  public start(params: EndDragStepParams): void {
    this._params = params;
    const { scene, pointerComponent } = params;
    this._pointerComponent = pointerComponent;

    scene.input.on("pointerup", this._release, this);
  }

  private _release() {
    if (this._pointerComponent.isDragging) {
      const params = this._params;
      const bullet = params.bullet;
      this._pointerComponent.endDrag();
      this._pointerComponent.pointer = undefined;

      // const scene = params.scene;
      params.scene.matter.world.removeConstraint(this._params.constraint);

      const v = bullet.body!.velocity;
      // console.log(v);
      bullet.setVelocity(
        Phaser.Math.Clamp(v.x, -MAX_VELOCITY, MAX_VELOCITY),
        Phaser.Math.Clamp(v.y, -MAX_VELOCITY, MAX_VELOCITY)
      );
      // this.camera.startFollow(bullet, true, 0.1, 0.1);
      // this.camera.zoomTo(this._scale * 1.4, 1000, 'Sine.easeInOut');

      this._onComplete();
    }
  }

  protected _onComplete(): void {
    this._params.scene.input.off("pointerup", this._release, this);

    super._onComplete();
  }
}