import { IGameView } from "../../factories/GameViewFactory";
import { Controller, IControllerParams } from "../../libs/controllers/Controller";
import { Sequence } from "../../libs/controllers/Sequence";
import { AwaitStep, AwaitStepParams } from "../../libs/controllers/steps/AwaitStep";
import { EndStrikeStep, EndStrikeStepParams } from "../steps/strike/EndStrikeStep";
import { ResetBulletStep, ResetBulletStepParams } from "../steps/strike/ResetBulletStep";
import { StartFlyStep, StartFlyStepParams } from "../steps/strike/StartFlyStep";

interface IControllerBaseParams extends IControllerParams {
  gameView: IGameView;
  // pointerComponent: PointerComponent;
  scene: Phaser.Scene;
  // constraint: MatterJS.ConstraintType;
}

export class StrikeController extends Controller<IControllerBaseParams> {
  private _resetBulletStep = new ResetBulletStep();
  private _endStrikeStep = new EndStrikeStep();
  private _startFlyStep = new StartFlyStep();
  private _awaitStep = new AwaitStep();

  public start({ gameView, scene }: IControllerBaseParams): void {

    const flySequence = new Sequence();
    flySequence.addStepByStep(this._startFlyStep, {
      scene: scene,
      bullet: gameView.bullet,
    } as StartFlyStepParams);

    flySequence.addStepByStep(this._endStrikeStep, {
      scene: scene
    } as EndStrikeStepParams);

    flySequence.addStepByStep(this._awaitStep, {
      scene: scene,
      delay: 2000
    } as AwaitStepParams);

    flySequence.addStepByStep(this._resetBulletStep, {
      bullet: gameView.bullet,
    } as ResetBulletStepParams);

    this._mng.start([flySequence]);
  }
}