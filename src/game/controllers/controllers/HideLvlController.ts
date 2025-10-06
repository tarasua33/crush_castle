import { IGameView } from "../../factories/GameViewFactory";
import { Controller, IControllerParams } from "../../libs/controllers/Controller";
import { Sequence } from "../../libs/controllers/Sequence";
import { HideLvlStep, HideLvlStepParams } from "../steps/lvlSetUp/HideLvlStep";
import { ResetEnemyStep, ResetEnemyStepParams } from "../steps/lvlSetUp/ResetEnemyStep";

interface IControllerBaseParams extends IControllerParams {
  gameView: IGameView;
  scene: Phaser.Scene;
}

export class HideLvlController extends Controller<IControllerBaseParams> {
  private _hideLvlStep = new HideLvlStep();
  private _resetEnemyStep = new ResetEnemyStep();

  public start({ gameView, scene }: IControllerBaseParams): void {

    const hideSequence = new Sequence();

    hideSequence.addStepByStep(this._hideLvlStep, {
      scene: scene,
      duration: 500,
    } as HideLvlStepParams);

    hideSequence.addStepByStep(this._resetEnemyStep, {
      scene: scene,
      bullet: gameView.bullet,
      enemyPool: gameView.enemies,
      bricks: gameView.bricks
    } as ResetEnemyStepParams);

    this._mng.start([hideSequence]);
  }
}