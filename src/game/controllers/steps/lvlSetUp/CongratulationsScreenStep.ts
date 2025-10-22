import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";
import { EVENTS } from "../../../libs/events/Events";
import { CongratulationScreen } from "../../../screens/CongratulationScreen";

export interface CongratulationsScreenStepParams extends BaseStepParams {
  congratulationScreen: CongratulationScreen;
}

export class CongratulationsScreenStep extends BaseStep<CongratulationsScreenStepParams> {
  public start(params: CongratulationsScreenStepParams): void {
    this._params = params;
    const { congratulationScreen } = params;

    congratulationScreen.animationComplete.once(EVENTS.COMPLETE, this._onComplete, this);
    congratulationScreen.show();
  }
}