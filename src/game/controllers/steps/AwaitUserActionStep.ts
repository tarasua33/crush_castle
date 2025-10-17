import { PointerComponent } from "../../components/PointerComponent";
import { BaseStep, BaseStepParams } from "../../libs/controllers/steps/BaseStep";

export interface AwaitUserActionStepParams extends BaseStepParams {
  scene: Phaser.Scene;
  bullet: Phaser.GameObjects.Image[];
  pointerComponent: PointerComponent;
}

export class AwaitUserActionStep extends BaseStep<AwaitUserActionStepParams> {
  private _pointerComponent: PointerComponent;
  public start(params: AwaitUserActionStepParams): void {
    this._params = params;
    const { scene, pointerComponent } = params;
    this._pointerComponent = pointerComponent;
    scene.input.on("pointerdown", this._startDrag, this);
  }

  private _startDrag(pointer: Phaser.Input.Pointer) {
    const worldPoint = pointer.positionToCamera(this._params.scene.cameras.main) as Phaser.Math.Vector2;
    const bullet = this._params.bullet[this._models.weaponModel.weaponId];

    const dist = Phaser.Math.Distance.Between(worldPoint.x, worldPoint.y, bullet.x, bullet.y);
    if (dist < 100) {
      this._pointerComponent.pointer = worldPoint;
      this._pointerComponent.startDrag();

      this._onComplete();
    }
  }

  protected _onComplete(): void {
    this._params.scene.input.off("pointerdown", this._startDrag, this);

    super._onComplete();
  }
}