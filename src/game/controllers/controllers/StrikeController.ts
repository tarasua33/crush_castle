import { ConstraintComponent } from "../../components/ConstraintComponent";
import { IGameView } from "../../factories/GameViewFactory";
import { Controller, IControllerParams } from "../../libs/controllers/Controller";
import { Sequence } from "../../libs/controllers/Sequence";
import { AwaitStep, AwaitStepParams } from "../../libs/controllers/steps/AwaitStep";
import { AwaitStrikeStep } from "../steps/strike/AwaitStrikeStep";
import { EndStrikeStep, EndStrikeStepParams } from "../steps/strike/EndStrikeStep";
import { PreparationStrikeStep, PreparationStrikeStepParams } from "../steps/strike/PreparationStrikeStep";
import { ResetBulletStep, ResetBulletStepParams } from "../steps/strike/ResetBulletStep";
import { StartStrikeStep, StartStrikeStepParams } from "../steps/strike/StartStrikeStep";

interface IControllerBaseParams extends IControllerParams {
  gameView: IGameView;
  scene: Phaser.Scene;
  constraintComponent: ConstraintComponent;
}

export class StrikeController extends Controller<IControllerBaseParams> {
  private _resetBulletStep = new ResetBulletStep();
  private _endStrikeStep = new EndStrikeStep();
  private _startStrikeStep = new StartStrikeStep();
  private _awaitStep = new AwaitStep();
  private _preparationStrikeStep = new PreparationStrikeStep();
  private _awaitStrikeStep = new AwaitStrikeStep();

  public start({ gameView, scene, constraintComponent }: IControllerBaseParams): void {

    // preStrikeSequence
    const preStrikeSequence = new Sequence();
    preStrikeSequence.addAwaitPermanentStep(this._awaitStrikeStep, {
      scene: scene,
      bullet: gameView.bullet,
      constraintComponent
    });

    preStrikeSequence.addStepByStep(this._preparationStrikeStep, {
      scene: scene,
      bullet: gameView.bullet,
      duration: 1000
    } as PreparationStrikeStepParams);

    // strikeSequence
    const strikeSequence = new Sequence();
    strikeSequence.addStepByStep(this._startStrikeStep, {
      scene: scene,
      bullet: gameView.bullet,
      constraintComponent
    } as StartStrikeStepParams);

    strikeSequence.addStepByStep(this._endStrikeStep, {
      scene: scene
    } as EndStrikeStepParams);

    strikeSequence.addStepByStep(this._awaitStep, {
      scene: scene,
      delay: 2000
    } as AwaitStepParams);

    strikeSequence.addStepByStep(this._resetBulletStep, {
      bullet: gameView.bullet,
      scene

    } as ResetBulletStepParams);

    this._mng.start([preStrikeSequence, strikeSequence]);
  }
}