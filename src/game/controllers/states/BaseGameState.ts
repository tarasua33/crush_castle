import { PointerComponent } from "../../components/PointerComponent";
import { IGameView } from "../../factories/GameViewFactory";
import { BaseState, BaseStateParams } from "../../libs/controllers/BaseState";
import { EVENTS } from "../../libs/events/Events";
import { StrikeController } from "../controllers/StrikeController";
import { UserActionController } from "../controllers/UserActionController";

interface IBaseGameStateParams extends BaseStateParams {
  gameView: IGameView;
  pointerComponent: PointerComponent;
  scene: Phaser.Scene;
}

export class BaseGameState extends BaseState<IBaseGameStateParams> {
  private _userActionController = new UserActionController();
  private _strikeController = new StrikeController();

  public start(params: IBaseGameStateParams): void {
    this._params = params;

    const { gameView, pointerComponent, scene } = params;
    const userActionController = this._userActionController;
    userActionController.completeStepSignal.once(EVENTS.COMPLETE, this._playStrike, this);
    userActionController.start({ gameView, pointerComponent, scene });
  }

  private _playStrike(): void {
    const strikeController = this._strikeController;
    strikeController.completeStepSignal.once(EVENTS.COMPLETE, this._playResult, this);
    const { scene, gameView } = this._params;
    this._strikeController.start({ scene, gameView });
  }

  private _playResult(): void {
    const { gameView, pointerComponent, scene } = this._params;
    const userActionController = this._userActionController;
    userActionController.completeStepSignal.once(EVENTS.COMPLETE, this._playStrike, this);
    userActionController.start({ gameView, pointerComponent, scene });
  }
}