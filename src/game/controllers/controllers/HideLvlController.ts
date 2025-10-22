import { IGameView } from "../../factories/GameViewFactory";
import { GAME_DIMENSIONS } from "../../GameConfig";
import { Controller, IControllerParams } from "../../libs/controllers/Controller";
import { Sequence } from "../../libs/controllers/Sequence";
import { AwaitStep, AwaitStepParams } from "../../libs/controllers/steps/AwaitStep";
import { CongratulationsScreenStep, CongratulationsScreenStepParams } from "../steps/lvlSetUp/CongratulationsScreenStep";
import { HideLvlStep, HideLvlStepParams } from "../steps/lvlSetUp/HideLvlStep";
import { MoveOnTargetStep, MoveOnTargetStepParams } from "../steps/lvlSetUp/MoveOnTargetStep";
import { ResetLvlStep, ResetLvlStepParams } from "../steps/lvlSetUp/ResetLvlStep";

interface IControllerBaseParams extends IControllerParams {
  gameView: IGameView;
  scene: Phaser.Scene;
}

export class HideLvlController extends Controller<IControllerBaseParams> {
  private _hideLvlStep = new HideLvlStep();
  private _resetLvlStep = new ResetLvlStep();
  private _congratulationsScreenStep = new CongratulationsScreenStep();
  private _awaitStep = new AwaitStep();
  private _moveOnTargetStep = new MoveOnTargetStep();

  public start({ gameView, scene }: IControllerBaseParams): void {

    const hideSequence = new Sequence();

    hideSequence.addStepByStep(this._moveOnTargetStep, {
      scene,
      duration: 250,
      x: GAME_DIMENSIONS.width / 2,
      y: GAME_DIMENSIONS.height / 2
    } as MoveOnTargetStepParams);

    hideSequence.addStepByStep(this._awaitStep, {
      scene: scene,
      delay: 500
    } as AwaitStepParams);

    hideSequence.addStepByStep(this._congratulationsScreenStep, {
      congratulationScreen: gameView.congratulationScreen

    } as CongratulationsScreenStepParams);

    hideSequence.addStepByStep(this._awaitStep, {
      scene: scene,
      delay: 2000
    } as AwaitStepParams);

    hideSequence.addStepByStep(this._hideLvlStep, {
      scene: scene,
      duration: 500,
    } as HideLvlStepParams);

    hideSequence.addStepByStep(this._resetLvlStep, {
      scene: scene,
      bullet: gameView.bullet,
      enemyPool: gameView.enemies,
      bricks: gameView.bricks,
      mountains: gameView.mountains,
      congratulationScreen: gameView.congratulationScreen

    } as ResetLvlStepParams);

    this._mng.start([hideSequence]);
  }
}