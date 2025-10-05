import { Enemy } from "../../../gameObjects/Enemy";
import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";
import { EVENTS } from "../../../libs/events/Events";

export interface EndStrikeStepParams extends BaseStepParams {
  scene: Phaser.Scene;
  enemyPool: Phaser.GameObjects.Group;
  explosionParticles: Phaser.GameObjects.Particles.ParticleEmitter;
}

export class EndStrikeStep extends BaseStep<EndStrikeStepParams> {
  public start(params: EndStrikeStepParams): void {
    this._params = params;
    const { scene, enemyPool } = params;

    for (const enemy of (enemyPool.getChildren() as Enemy[])) {
      if (enemy.active) {
        enemy.eventSignal.on(EVENTS.EXPLOSION, this._explosion, this)
      }
    }

    scene.matter.world.on("afterupdate", this._worldUpdate, this);
  }

  private _explosion(pos: number[]): void {
    this._params.explosionParticles.explode(50, pos[0], pos[1]);
  }

  private _worldUpdate(): void {
    const bodies = (this._params.scene.matter.world.localWorld as any).bodies;
    const enemyPool = this._params.enemyPool;

    for (const enemy of (enemyPool.getChildren() as Enemy[])) {
      if (enemy.active) {
        enemy.checkTransform(enemyPool);
      }
    }

    let active = false;
    for (const body of bodies) {
      if (body.speed > 0.2) {
        active = true;
      }
    }

    if (!active) {
      this._onComplete();
    }
  }

  protected _onComplete(): void {
    this._params.scene.matter.world.off("afterupdate", this._worldUpdate, this);

    super._onComplete();
  }
}