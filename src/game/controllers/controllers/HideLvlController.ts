import { IGameView } from "../../factories/GameViewFactory";
import { Controller, IControllerParams } from "../../libs/controllers/Controller";
import { Sequence } from "../../libs/controllers/Sequence";
import { HideLvlStep, HideLvlStepParams } from "../steps/lvlSetUp/HideLvlStep";
import { ResetLvlStep, ResetLvlStepParams } from "../steps/lvlSetUp/ResetLvlStep";

interface IControllerBaseParams extends IControllerParams {
  gameView: IGameView;
  scene: Phaser.Scene;
}

export class HideLvlController extends Controller<IControllerBaseParams> {
  private _hideLvlStep = new HideLvlStep();
  private _resetLvlStep = new ResetLvlStep();

  public start({ gameView, scene }: IControllerBaseParams): void {

    const hideSequence = new Sequence();

    hideSequence.addStepByStep(this._hideLvlStep, {
      scene: scene,
      duration: 500,
    } as HideLvlStepParams);

    hideSequence.addStepByStep(this._resetLvlStep, {
      scene: scene,
      bullet: gameView.bullet,
      enemyPool: gameView.enemies,
      bricks: gameView.bricks,
      mountains: gameView.mountains
    } as ResetLvlStepParams);

    this._mng.start([hideSequence]);
  }
}