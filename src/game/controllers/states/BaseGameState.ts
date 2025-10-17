import { ConstraintComponent } from "../../components/ConstraintComponent";
import { PointerComponent } from "../../components/PointerComponent";
import { IGameView } from "../../factories/GameViewFactory";
import { BaseState, BaseStateParams } from "../../libs/controllers/BaseState";
import { EVENTS } from "../../libs/events/Events";
import { ILvl } from "../../models/EnemyModel";
import { Game } from "../../scenes/Game";
import { HideLvlController } from "../controllers/HideLvlController";
import { ResetRoundController } from "../controllers/ResetRoundController";
import { ShowLvlController } from "../controllers/ShowLvlController";
import { StrikeController } from "../controllers/StrikeController";
import { UserActionController } from "../controllers/UserActionController";

interface IBaseGameStateParams extends BaseStateParams {
  gameView: IGameView;
  pointerComponent: PointerComponent;
  constraintComponent: ConstraintComponent;
  uiSignal: Phaser.Events.EventEmitter;
  scene: Game;
}

export class BaseGameState extends BaseState<IBaseGameStateParams> {
  private _userActionController = new UserActionController();
  private _strikeController = new StrikeController();
  private _showLvlController = new ShowLvlController();
  private _resetRoundController = new ResetRoundController();
  private _hideLvlController = new HideLvlController();
  private _firstRound = true;

  public start(params: IBaseGameStateParams): void {
    this._params = params;
    this._playShowLvl();
  }

  private _playShowLvl(): void {
    const lvl = (this._params.scene.cache.json.get("lvls") as ILvl[])[this._models.enemyModel.lvl];

    this._models.enemyModel.resetLvlEnemies(lvl.targets);
    const { gameView, scene } = this._params;
    this._firstRound = true;
    const showLvlController = this._showLvlController;
    showLvlController.completeStepSignal.once(EVENTS.COMPLETE, this._playNextRound, this);
    showLvlController.start({ gameView, scene, lvl });
  }

  private _playStrike(): void {
    this._firstRound = false;
    const strikeController = this._strikeController;
    strikeController.completeStepSignal.once(EVENTS.COMPLETE, this._playResult, this);
    const { scene, gameView, constraintComponent } = this._params;
    strikeController.start({ scene, gameView, constraintComponent });
  }

  private _playResult(win: boolean): void {
    if (win) {
      this._hideLvl();
    }
    else {
      this._resetRound();
    }
  }

  private _hideLvl(): void {
    console.log("WIN");
    this._models.enemyModel.increaseLvl();

    const { gameView, scene } = this._params;

    const hideLvlController = this._hideLvlController;
    hideLvlController.completeStepSignal.once(EVENTS.COMPLETE, this._playShowLvl, this);
    hideLvlController.start({ gameView, scene });
  }

  private _resetRound(): void {
    const { gameView, scene, constraintComponent } = this._params;

    const resetRoundController = this._resetRoundController;
    resetRoundController.completeStepSignal.once(EVENTS.COMPLETE, this._playNextRound, this);
    resetRoundController.start({ gameView, constraintComponent, scene });
  }

  private _playNextRound(): void {
    const { gameView, pointerComponent, constraintComponent, uiSignal, scene } = this._params;

    const userActionController = this._userActionController;
    userActionController.completeStepSignal.once(EVENTS.COMPLETE, this._playStrike, this);
    userActionController.start({
      gameView,
      uiSignal,
      pointerComponent,
      constraintComponent,
      scene,
      isFirst: this._firstRound
    });
  }
}