import { BaseStep, BaseStepParams } from "./steps/BaseStep";

export interface IStepAndParams {
  step: BaseStep;
  params: BaseStepParams;
}

export interface ISequence {
  permanents: IStepAndParams[];
  stepByStep: IStepAndParams[];
  awaitSteps: IStepAndParams[];
}

export class Sequence {
  public permanents: IStepAndParams[] = [];
  public awaitSteps: IStepAndParams[] = [];
  public stepByStep: IStepAndParams[] = [];

  public addPermanent<S extends BaseStep<P>, P extends BaseStepParams>(
    step: S,
    params: P,
  ): void {
    this.permanents.push({ step, params });
  }

  public addAwaitPermanentStep<S extends BaseStep<P>, P extends BaseStepParams>(
    step: S,
    params: P,
  ): void {
    this.awaitSteps.push({ step, params });
  }

  public addStepByStep<S extends BaseStep<P>, P extends BaseStepParams>(
    step: S,
    params: P,
  ): void {
    this.stepByStep.push({ step, params });
  }
}
