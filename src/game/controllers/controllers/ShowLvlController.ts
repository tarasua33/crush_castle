import { IGameView } from "../../factories/GameViewFactory";
import { Controller, IControllerParams } from "../../libs/controllers/Controller";
import { Sequence } from "../../libs/controllers/Sequence";
import { ShowLvlStep, ShowLvlStepParams } from "../steps/lvlSetUp/ShowLvlStep";
import { SpawnLvlStep, SpawnLvlStepParams } from "../steps/lvlSetUp/SpawnLvlStep";

interface IControllerBaseParams extends IControllerParams {
  gameView: IGameView;
  scene: Phaser.Scene;
}

export class ShowLvlController extends Controller<IControllerBaseParams> {
  private _showLvlStep = new ShowLvlStep();
  private _spawnLvlStep = new SpawnLvlStep();

  public start({ gameView, scene }: IControllerBaseParams): void {

    const showSequence = new Sequence();

    showSequence.addStepByStep(this._spawnLvlStep, {
      scene: scene,
      bullet: gameView.bullet,
      enemyPool: gameView.enemies,
      bricks: gameView.bricks
    } as SpawnLvlStepParams);

    showSequence.addStepByStep(this._showLvlStep, {
      scene: scene,
      duration: 1000,
    } as ShowLvlStepParams);

    this._mng.start([showSequence]);
  }
}