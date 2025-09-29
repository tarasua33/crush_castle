import { EVENTS } from "../../events/Events";
import { IModels } from "../../models/IModels";

export interface BaseStepParams {
  // pass
}

export abstract class BaseStep<T extends BaseStepParams = BaseStepParams> {
  public completeStepSignal = new Phaser.Events.EventEmitter();

  protected _params!: T;
  protected _models: IModels;

  constructor() {
    this._models = {
      // 
    };
  }

  public abstract start(params: T): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected _onComplete(...args: any[]): void {
    console.log("complete", this);
    this.completeStepSignal.emit(EVENTS.COMPLETE, ...args);
  }

  public forceComplete(): void {
    // pass
  }
}
