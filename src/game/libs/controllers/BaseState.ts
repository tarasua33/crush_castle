import { BaseStep, BaseStepParams } from "./steps/BaseStep";

export interface BaseStateParams extends BaseStepParams {
  // pass
}

export abstract class BaseState<T extends BaseStateParams = BaseStateParams> extends BaseStep<T> {
  public abstract start(...args: unknown[]): void;
}
