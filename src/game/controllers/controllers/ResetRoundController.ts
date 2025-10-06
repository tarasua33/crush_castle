import { ConstraintComponent } from "../../components/ConstraintComponent";
import { IGameView } from "../../factories/GameViewFactory";
import { GAME_DIMENSIONS } from "../../GameConfig";
import { Controller, IControllerParams } from "../../libs/controllers/Controller";
import { Sequence } from "../../libs/controllers/Sequence";
import { MoveOnTargetStep, MoveOnTargetStepParams } from "../steps/lvlSetUp/MoveOnTargetStep";
import { ResetBulletStep, ResetBulletStepParams } from "../steps/lvlSetUp/ResetBulletStep";

interface IControllerBaseParams extends IControllerParams {
  gameView: IGameView;
  scene: Phaser.Scene;
  constraintComponent: ConstraintComponent;
}

export class ResetRoundController extends Controller<IControllerBaseParams> {
  private _resetBulletStep = new ResetBulletStep();
  private _moveOnTargetStep = new MoveOnTargetStep();

  public start({ gameView, scene, constraintComponent }: IControllerBaseParams): void {

    const resetSequence = new Sequence();

    resetSequence.addStepByStep(this._resetBulletStep, {
      scene,
      bullet: gameView.bullet,
      constraintComponent,
      slingshotPoint: gameView.slingshotPoint

    } as ResetBulletStepParams);

    resetSequence.addStepByStep(this._moveOnTargetStep, {
      scene,
      duration: 1000,
      x: GAME_DIMENSIONS.width / 2,
      y: GAME_DIMENSIONS.height / 2
    } as MoveOnTargetStepParams);

    this._mng.start([resetSequence]);
  }
}