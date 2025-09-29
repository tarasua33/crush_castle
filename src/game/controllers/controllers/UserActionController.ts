import { PointerComponent } from "../../components/PointerComponent";
import { IGameView } from "../../factories/GameViewFactory";
import { Controller, IControllerParams } from "../../libs/controllers/Controller";
import { Sequence } from "../../libs/controllers/Sequence";
import { AwaitUserActionStep, AwaitUserActionStepParams } from "../steps/AwaitUserActionStep";
import { DragActionStep, DragActionStepParams } from "../steps/DragActionStep";
import { EndDragStep } from "../steps/EndDragStep";

interface IControllerBaseParams extends IControllerParams {
  gameView: IGameView;
  pointerComponent: PointerComponent;
  scene: Phaser.Scene;
}

export class UserActionController extends Controller<IControllerBaseParams> {
  private _awaitUserActionStep = new AwaitUserActionStep();
  private _endDragStep = new EndDragStep();
  private _dragActionStep = new DragActionStep();

  public start({ gameView, pointerComponent, scene }: IControllerBaseParams): void {

    const constraint = scene.matter.add.constraint(
      gameView.bullet.body as MatterJS.BodyType,
      gameView.slingshotPoint as unknown as MatterJS.BodyType,
      0,
      0.02);

    const waitActionSequence = new Sequence();
    waitActionSequence.addStepByStep(this._awaitUserActionStep, {
      scene: scene,
      bullet: gameView.bullet,
      pointerComponent
    } as AwaitUserActionStepParams);

    const dragSequence = new Sequence();
    dragSequence.addAwaitPermanentStep(this._dragActionStep, {
      scene,
      bullet: gameView.bullet,
      slingshotPoint: gameView.slingshotPoint,
      pointerComponent
    } as DragActionStepParams);
    dragSequence.addStepByStep(this._endDragStep, {
      scene,
      bullet: gameView.bullet,
      pointerComponent,
      constraint
    });

    this._mng.start([waitActionSequence, dragSequence]);
  }
}