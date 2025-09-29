import { PointerComponent } from "../../components/PointerComponent";
import { MAX_CONSTRAIN } from "../../GameConfig";
import { BaseStep, BaseStepParams } from "../../libs/controllers/steps/BaseStep";

export interface DragActionStepParams extends BaseStepParams {
  scene: Phaser.Scene;
  bullet: Phaser.GameObjects.Image;
  slingshotPoint: Phaser.GameObjects.Image;
  pointerComponent: PointerComponent;
}

export class DragActionStep extends BaseStep<DragActionStepParams> {
  private _pointerComponent: PointerComponent;
  public start(params: DragActionStepParams): void {
    this._params = params;
    const { scene, pointerComponent } = params;

    this._pointerComponent = pointerComponent;

    scene.input.on("pointermove", this._onPointerMove, this);
    scene.matter.world.on("afterupdate", this._onPhysicUpdate, this);
  }

  protected _onComplete(): void {
    const scene = this._params.scene;
    scene.input.off("pointermove", this._onPointerMove, this);
    scene.matter.world.off("afterupdate", this._onPhysicUpdate, this);

    super._onComplete();
  }

  private _onPhysicUpdate(): void {
    if (this._pointerComponent.isDragging && this._pointerComponent.pointer) {
      this._onDrag(this._pointerComponent.pointer);
    }
  }

  private _onPointerMove(pointer: Phaser.Input.Pointer) {
    if (this._pointerComponent.isDragging) {
      this._pointerComponent.pointer = pointer.positionToCamera(this._params.scene.cameras.main) as Phaser.Math.Vector2;;
    }
  }

  private _onDrag(pointer: Phaser.Math.Vector2): void {
    const worldPoint = pointer;

    const slingshotPoint = this._params.slingshotPoint.body!.position;
    const bullet = this._params.bullet;
    const dist = Phaser.Math.Distance.Between(slingshotPoint.x, slingshotPoint.y, worldPoint.x, worldPoint.y);

    if (dist < 100) {
      bullet.setPosition(worldPoint.x, worldPoint.y);
    }
    else {
      // const previousPointer = this._previousPointer!;
      const angle = Math.atan2(worldPoint.y - slingshotPoint.y, worldPoint.x - slingshotPoint.x);
      const y = Math.sin(angle) * MAX_CONSTRAIN;
      const x = Math.cos(angle) * MAX_CONSTRAIN;
      bullet.setPosition(slingshotPoint.x + x, slingshotPoint.y + y);
    }
  }

  public forceComplete(): void {
    this._onComplete();
  }
}