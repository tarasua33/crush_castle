import { BaseStep, BaseStepParams } from "./steps/BaseStep";
import { ISequence, IStepAndParams } from "./Sequence";
import { EVENTS } from "../events/Events";

export class StepsManager {
  public completeSteps = new Phaser.Events.EventEmitter();

  private _sequences?: ISequence[];

  private _stepByStepSteps: IStepAndParams[] = [];
  private _awaitSteps: IStepAndParams[] = [];
  private _permanentsSteps: IStepAndParams[] = [];
  private _dynamicSteps = new Set<BaseStep>();

  private _numPermanentsSteps = 0;
  private _numConsequentsSteps = 0;

  private _isForceComplete = false;

  public start(sequences: ISequence[]): void {
    this._isForceComplete = false;
    this._dynamicSteps.clear();
    this._sequences = sequences;

    this._playNextSequence();
  }

  public addDynamicStep<S extends BaseStep<P>, P extends BaseStepParams>(
    step: S,
    params: P,
  ): void {
    this._dynamicSteps.add(step);
    console.log("start", step);
    step.completeStepSignal.once(EVENTS.COMPLETE, this._onCompleteDynamicStep, this);
    step.start(params);
  }

  private _onCompleteDynamicStep(step: BaseStep): void {
    if (this._dynamicSteps.has(step)) {
      this._dynamicSteps.delete(step);
    }
  }

  private _playNextSequence(): void {
    const sequences = this._sequences;

    if (sequences && sequences.length > 0) {
      const sequence = this._sequences!.shift()!;
      this._setUpSequence(sequence);
    } else {
      this._onComplete();
    }
  }

  private _setUpSequence(sequence: ISequence): void {
    this._numPermanentsSteps = 0;
    this._stepByStepSteps = sequence.stepByStep;
    this._permanentsSteps = sequence.permanents;
    this._awaitSteps = sequence.awaitSteps;
    this._numConsequentsSteps = sequence.stepByStep.length;

    if (sequence.permanents.length > 0) {
      this._setUpPermanentsSteps(sequence.permanents);
    }

    if (sequence.awaitSteps.length > 0) {
      this._setUpAwaitSteps(sequence.awaitSteps);
    }

    this._playNextConsequentStep();
  }

  private _setUpPermanentsSteps(permanents: IStepAndParams[]): void {
    for (let i = 0; i < permanents.length; i++) {
      this._numPermanentsSteps++;

      const step = permanents[i]!.step;
      const params = permanents[i]!.params;
      console.log("start", step);
      step.completeStepSignal.once(EVENTS.COMPLETE, this._onPermanentStepComplete, this);
      step.start(params);
    }
  }

  private _setUpAwaitSteps(steps: IStepAndParams[]): void {
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]!.step;
      const params = steps[i]!.params;
      console.log("start", step);
      step.start(params);
    }
  }

  private _onPermanentStepComplete(): void {
    this._numPermanentsSteps--;

    if (this._numPermanentsSteps === 0) {
      this._tryCompleteSequence();
    }
  }

  private _playNextConsequentStep(): void {
    const stepByStepSteps = this._stepByStepSteps;

    if (this._numConsequentsSteps > 0) {
      const stepIndex = stepByStepSteps.length - this._numConsequentsSteps;
      const step = stepByStepSteps[stepIndex]!.step;
      const params = stepByStepSteps[stepIndex]!.params;

      console.log("start", step);

      step.completeStepSignal.once(EVENTS.COMPLETE, this._onConsequentStepComplete, this);
      step.start(params);
    } else {
      this._completeAwaitSteps();
      this._tryCompleteSequence();
    }
  }

  private _completeAwaitSteps(): void {
    for (const { step } of this._awaitSteps) {
      step.forceComplete();
    }

    this._awaitSteps = [];
  }

  private _onConsequentStepComplete(): void {
    if (!this._isForceComplete) {
      this._numConsequentsSteps--;

      this._playNextConsequentStep();
    }
  }

  private _tryCompleteSequence(): void {
    if (!this._isForceComplete) {
      if (this._numPermanentsSteps === 0 && this._numConsequentsSteps === 0) {
        this._playNextSequence();
      }
    }
  }

  private _onComplete(): void {
    this._sequences = [];
    this._stepByStepSteps = [];
    this._permanentsSteps = [];
    this._awaitSteps = [];

    for (const step of this._dynamicSteps) {
      step.completeStepSignal.removeAllListeners();
      step.forceComplete();
    }
    this._dynamicSteps.clear();

    this.completeSteps.emit(EVENTS.COMPLETE);
  }

  public forceComplete(): void {
    this._isForceComplete = true;

    for (const step of this._stepByStepSteps) {
      step.step.completeStepSignal.removeAllListeners();
      step.step.forceComplete();
    }

    for (const step of this._permanentsSteps) {
      step.step.completeStepSignal.removeAllListeners();
      step.step.forceComplete();
    }

    for (const step of this._awaitSteps) {
      step.step.completeStepSignal.removeAllListeners();
      step.step.forceComplete();
    }

    this._onComplete();
  }
}
