import { CastleBrick } from "../../../gameObjects/CastleBrick";
import { Enemy } from "../../../gameObjects/Enemy";
import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";
import { EVENTS } from "../../../libs/events/Events";

export interface EndStrikeStepParams extends BaseStepParams {
  scene: Phaser.Scene;
  enemyPool: Phaser.GameObjects.Group;
  castlePool: Phaser.GameObjects.Group;
  explosionParticles: Phaser.GameObjects.Particles.ParticleEmitter;
  explosionCastleParticles: Phaser.GameObjects.Particles.ParticleEmitter;
}

const THRESHOLD = 0.2

export class EndStrikeStep extends BaseStep<EndStrikeStepParams> {
  public targetEnemySignal = new Phaser.Events.EventEmitter();

  public start(params: EndStrikeStepParams): void {
    this._params = params;
    const { scene, enemyPool, castlePool } = params;

    for (const enemy of (enemyPool.getChildren() as Enemy[])) {
      if (enemy.active) {
        enemy.eventSignal.once(EVENTS.EXPLOSION, this._explosion, this)
      }
    }

    for (const brick of (castlePool.getChildren() as CastleBrick[])) {
      if (brick.active) {
        brick.eventSignal.once(EVENTS.EXPLOSION, this._explosionBrick, this)
      }
    }

    scene.matter.world.on("afterupdate", this._worldUpdate, this);
  }

  private _explosion(pos: number[]): void {
    this.targetEnemySignal.emit(EVENTS.EXPLOSION);

    this._params.explosionParticles.explode(50, pos[0], pos[1]);
  }

  private _explosionBrick(pos: number[]): void {
    this._params.explosionCastleParticles.explode(50, pos[0], pos[1]);
  }

  private _worldUpdate(): void {
    const bodies = (this._params.scene.matter.world.localWorld as any).bodies;
    const { enemyPool, castlePool } = this._params;

    for (const enemy of (enemyPool.getChildren() as Enemy[])) {
      if (enemy.active) {
        enemy.checkTransform();
      }
    }

    for (const brick of (castlePool.getChildren() as Enemy[])) {
      if (brick.active) {
        brick.checkTransform();
      }
    }

    let active = false;
    for (const body of bodies) {
      if (body.speed > THRESHOLD) {
        active = true;
      }
    }

    if (!active) {
      this._onComplete();
    }
  }

  protected _onComplete(): void {
    const { enemyPool, castlePool } = this._params;
    for (const enemy of (enemyPool.getChildren() as Enemy[])) {
      enemy.eventSignal.off(EVENTS.EXPLOSION, this._explosion, this);
    }

    for (const brick of (castlePool.getChildren() as Enemy[])) {
      brick.eventSignal.off(EVENTS.EXPLOSION, this._explosion, this);
    }

    this._params.scene.matter.world.off("afterupdate", this._worldUpdate, this);

    super._onComplete();
  }
}