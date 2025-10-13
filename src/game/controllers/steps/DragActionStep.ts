import { ConstraintComponent } from "../../components/ConstraintComponent";
import { PointerComponent } from "../../components/PointerComponent";
import { MAX_CONSTRAIN, MAX_VELOCITY } from "../../GameConfig";
import { Slingshot } from "../../gameObjects/Slingshot";
import { TrajectoryContainer } from "../../gameObjects/TrajectoryContainer";
import { BaseStep, BaseStepParams } from "../../libs/controllers/steps/BaseStep";

export interface DragActionStepParams extends BaseStepParams {
  scene: Phaser.Scene;
  bullet: Phaser.GameObjects.Image;
  slingshotPoint: Slingshot;
  pointerComponent: PointerComponent;
  constraintComponent: ConstraintComponent;
  trajectory: TrajectoryContainer;
}

export class DragActionStep extends BaseStep<DragActionStepParams> {
  private _pointerComponent: PointerComponent;
  public start(params: DragActionStepParams): void {
    this._params = params;
    const { scene, pointerComponent, trajectory } = params;

    this._pointerComponent = pointerComponent;

    scene.input.on("pointermove", this._onPointerMove, this);
    scene.matter.world.on("afterupdate", this._onPhysicUpdate, this);

    trajectory.show();
    this._drawTrajectory();
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
      this._pointerComponent.pointer = pointer.positionToCamera(this._params.scene.cameras.main) as Phaser.Math.Vector2;

      this._drawTrajectory();
    }
  }

  private _drawTrajectory(): void {
    const worldPoint = this._pointerComponent.pointer!;

    const slingshotPoint = this._params.slingshotPoint.slingshotPoint.body!.position;
    const { trajectory, bullet } = this._params;

    const basePower = Phaser.Math.Distance.Between(slingshotPoint.x, slingshotPoint.y, bullet.x, bullet.y);
    const launchPower = Phaser.Math.Clamp(basePower, -MAX_VELOCITY, MAX_VELOCITY);

    const angle = Math.atan2(slingshotPoint.y - worldPoint.y, slingshotPoint.x - worldPoint.x);

    const g = 0.002 * 1;

    const points = trajectory.points as Phaser.GameObjects.Graphics[];
    let i = 0;
    for (let t = 1; t <= 10; t += 1) {
      const x = bullet.x + (launchPower * Math.cos(angle) * t);
      const y = bullet.y + (launchPower * Math.sin(angle) * t + 0.5 * g * t * t);
      points[i].active = true;
      points[i].visible = true;
      points[i].setPosition(x, y);

      i++;
    }
    // console.log(angle, launchPower);
  }

  private _onDrag(pointer: Phaser.Math.Vector2): void {
    const worldPoint = pointer;

    const slingshotContainer = this._params.slingshotPoint;
    const slingshotPoint = this._params.slingshotPoint.slingshotPoint.body!.position;
    const { bullet, constraintComponent } = this._params;
    const dist = Phaser.Math.Distance.Between(slingshotPoint.x, slingshotPoint.y, worldPoint.x, worldPoint.y);

    const angle = Math.atan2(worldPoint.y - slingshotPoint.y, worldPoint.x - slingshotPoint.x);

    if (dist < MAX_CONSTRAIN) {
      bullet.setPosition(worldPoint.x, worldPoint.y);
      constraintComponent.setPosition(worldPoint.x, worldPoint.y);

      slingshotContainer.rotateSlingshotPoint(dist);
      slingshotContainer.rotateRope(angle, dist);
    }
    else {
      // const previousPointer = this._previousPointer!;
      const y = Math.sin(angle) * MAX_CONSTRAIN;
      const x = Math.cos(angle) * MAX_CONSTRAIN;
      bullet.setPosition(slingshotPoint.x + x, slingshotPoint.y + y);
      constraintComponent.setPosition(slingshotPoint.x + x, slingshotPoint.y + y);
      slingshotContainer.rotateSlingshotPoint(MAX_CONSTRAIN);
      slingshotContainer.rotateRope(angle, MAX_CONSTRAIN);
    }
  }

  public forceComplete(): void {
    this._onComplete();
  }
}