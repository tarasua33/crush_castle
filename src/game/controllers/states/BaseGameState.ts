import { ConstraintComponent } from "../../components/ConstraintComponent";
import { PointerComponent } from "../../components/PointerComponent";
import { IGameView } from "../../factories/GameViewFactory";
import { BaseState, BaseStateParams } from "../../libs/controllers/BaseState";
import { EVENTS } from "../../libs/events/Events";
import { Game } from "../../scenes/Game";
import { StrikeController } from "../controllers/StrikeController";
import { UserActionController } from "../controllers/UserActionController";

interface IBaseGameStateParams extends BaseStateParams {
  gameView: IGameView;
  pointerComponent: PointerComponent;
  constraintComponent: ConstraintComponent;
  scene: Game;
}

export class BaseGameState extends BaseState<IBaseGameStateParams> {
  private _userActionController = new UserActionController();
  private _strikeController = new StrikeController();

  public start(params: IBaseGameStateParams): void {
    this._params = params;
    const { gameView, pointerComponent, scene, constraintComponent } = params;

    constraintComponent.createConstraint(
      gameView.bullet.body as MatterJS.BodyType,
      gameView.slingshotPoint as unknown as MatterJS.BodyType,
      scene);

    const userActionController = this._userActionController;
    userActionController.completeStepSignal.once(EVENTS.COMPLETE, this._playStrike, this);
    userActionController.start({ gameView, pointerComponent, constraintComponent, scene });
  }

  private _playStrike(): void {
    const strikeController = this._strikeController;
    strikeController.completeStepSignal.once(EVENTS.COMPLETE, this._playResult, this);
    const { scene, gameView, constraintComponent } = this._params;
    this._strikeController.start({ scene, gameView, constraintComponent });
  }

  private _playResult(): void {
    const { gameView, pointerComponent, constraintComponent, scene } = this._params;

    constraintComponent.createConstraint(
      gameView.bullet.body as MatterJS.BodyType,
      gameView.slingshotPoint as unknown as MatterJS.BodyType,
      scene);

    const userActionController = this._userActionController;
    userActionController.completeStepSignal.once(EVENTS.COMPLETE, this._playStrike, this);
    userActionController.start({ gameView, pointerComponent, constraintComponent, scene });
  }
}