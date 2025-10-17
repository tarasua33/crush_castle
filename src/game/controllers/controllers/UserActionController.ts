import { ConstraintComponent } from "../../components/ConstraintComponent";
import { PointerComponent } from "../../components/PointerComponent";
import { IGameView } from "../../factories/GameViewFactory";
import { Controller, IControllerParams } from "../../libs/controllers/Controller";
import { Sequence } from "../../libs/controllers/Sequence";
import { AwaitUserActionStep, AwaitUserActionStepParams } from "../steps/AwaitUserActionStep";
import { DragActionStep, DragActionStepParams } from "../steps/DragActionStep";
import { EndDragStep } from "../steps/EndDragStep";
import { ResetBulletStep, ResetBulletStepParams } from "../steps/lvlSetUp/ResetBulletStep";
import { UIListeningStep, UIListeningStepParams } from "../steps/UIListeningStep";

interface IControllerBaseParams extends IControllerParams {
  gameView: IGameView;
  pointerComponent: PointerComponent;
  scene: Phaser.Scene;
  constraintComponent: ConstraintComponent;
  isFirst: boolean;
  uiSignal: Phaser.Events.EventEmitter;
}

export class UserActionController extends Controller<IControllerBaseParams> {
  private _awaitUserActionStep = new AwaitUserActionStep();
  private _uiListeningStep = new UIListeningStep();
  private _endDragStep = new EndDragStep();
  private _dragActionStep = new DragActionStep();
  private _resetBulletStep = new ResetBulletStep();


  public start({ gameView, uiSignal, pointerComponent, constraintComponent, isFirst, scene }: IControllerBaseParams): void {
    const sequence = [];

    if (isFirst) {
      const resetSequence = new Sequence();
      sequence.push(resetSequence);

      resetSequence.addStepByStep(this._resetBulletStep, {
        scene,
        bullet: gameView.bullet,
        constraintComponent,
        slingshotPoint: gameView.slingshotPoint

      } as ResetBulletStepParams);
    }

    const waitActionSequence = new Sequence();
    sequence.push(waitActionSequence);

    waitActionSequence.addAwaitPermanentStep(this._uiListeningStep, {
      scene,
      bullet: gameView.bullet,
      constraintComponent,
      uiSignal

    } as UIListeningStepParams);

    waitActionSequence.addStepByStep(this._awaitUserActionStep, {
      scene: scene,
      bullet: gameView.bullet,
      pointerComponent
    } as AwaitUserActionStepParams);

    const dragSequence = new Sequence();
    sequence.push(dragSequence);

    dragSequence.addAwaitPermanentStep(this._dragActionStep, {
      scene,
      bullet: gameView.bullet,
      slingshotPoint: gameView.slingshotPoint,
      pointerComponent,
      constraintComponent,
      trajectory: gameView.trajectory
    } as DragActionStepParams);
    dragSequence.addStepByStep(this._endDragStep, {
      scene,
      pointerComponent,
      trajectory: gameView.trajectory
    });

    this._mng.start(sequence);
  }
}