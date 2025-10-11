import { ConstraintComponent } from "../../components/ConstraintComponent";
import { IGameView } from "../../factories/GameViewFactory";
import { Controller, IControllerParams } from "../../libs/controllers/Controller";
import { Sequence } from "../../libs/controllers/Sequence";
import { AwaitStep, AwaitStepParams } from "../../libs/controllers/steps/AwaitStep";
import { EVENTS } from "../../libs/events/Events";
import { AwaitStrikeStep } from "../steps/strike/AwaitStrikeStep";
import { EndStrikeStep, EndStrikeStepParams } from "../steps/strike/EndStrikeStep";
import { PreparationStrikeStep, PreparationStrikeStepParams } from "../steps/strike/PreparationStrikeStep";
import { StartStrikeStep, StartStrikeStepParams } from "../steps/strike/StartStrikeStep";

interface IControllerBaseParams extends IControllerParams {
  gameView: IGameView;
  scene: Phaser.Scene;
  constraintComponent: ConstraintComponent;
}

export class StrikeController extends Controller<IControllerBaseParams> {
  private _endStrikeStep = new EndStrikeStep();
  private _startStrikeStep = new StartStrikeStep();
  private _awaitStep = new AwaitStep();
  private _preparationStrikeStep = new PreparationStrikeStep();
  private _awaitStrikeStep = new AwaitStrikeStep();
  private _isWin: boolean = false;

  public start({ gameView, scene, constraintComponent }: IControllerBaseParams): void {
    this._isWin = false;

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
      constraintComponent,
      slingshotPoint: gameView.slingshotPoint
    } as StartStrikeStepParams);

    const endStrikeStep = this._endStrikeStep;
    endStrikeStep.targetEnemySignal.on(EVENTS.EXPLOSION, this._onTarget, this);
    strikeSequence.addStepByStep(endStrikeStep, {
      scene: scene,
      enemyPool: gameView.enemies,
      explosionParticles: gameView.explosionParticles,
      explosionCastleParticles: gameView.explosionCastleParticles,
      castlePool: gameView.bricks
    } as EndStrikeStepParams);

    strikeSequence.addStepByStep(this._awaitStep, {
      scene: scene,
      delay: 2000
    } as AwaitStepParams);

    this._mng.start([preStrikeSequence, strikeSequence]);
  }

  private _onTarget(): void {
    this._models.enemyModel.lvlEnemies--;

    if (this._models.enemyModel.lvlEnemies <= 0) {
      this._isWin = true;
    }
  }

  protected _onComplete(): void {
    this._endStrikeStep.targetEnemySignal.off(EVENTS.EXPLOSION, this._onTarget, this);
    super._onComplete(this._isWin)
  }
}