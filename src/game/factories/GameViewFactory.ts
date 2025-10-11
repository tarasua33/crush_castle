

interface IBuildConfig {
  scene: Phaser.Scene;
}

import { Slingshot } from "../gameObjects/Slingshot";
import { AbstractBaseFactory } from "../libs/factories/AbstractBaseFactory";
import { BulletFactory } from "./BulletFactory";
import { CastlesFactory } from "./CastlesFactory";
import { EnemiesFactory } from "./EnemiesFactory";
import { ExplosionCastleParticlesFactory } from "./ExplosionCastleParticlesFactory";
import { ExplosionParticlesFactory } from "./ExplosionParticlesFactory";
import { GameBgFactory } from "./GameBgFactory";
import { MountainsFactory } from "./MountainsFactory";
import { PlatformsFactory } from "./PlatformsFactory";
import { SlingshotPointFactory } from "./SlingshotPointFactory";

export interface IGameView {
  bg: Phaser.GameObjects.Image;
  mountains: Phaser.GameObjects.TileSprite[];
  ground: Phaser.GameObjects.TileSprite;
  bullet: Phaser.Physics.Matter.Image;
  slingshotPoint: Slingshot;
  bricks: Phaser.GameObjects.Group;
  enemies: Phaser.GameObjects.Group;
  explosionCastleParticles: Phaser.GameObjects.Particles.ParticleEmitter;
  explosionParticles: Phaser.GameObjects.Particles.ParticleEmitter;
}

export class GameViewFactory extends AbstractBaseFactory {
  public buildUi(params: IBuildConfig): IGameView {
    const { scene } = params;

    const platformFactory = new PlatformsFactory();
    const bulletFactory = new BulletFactory();
    const slingshotPointFactory = new SlingshotPointFactory();
    const castlesFactory = new CastlesFactory();
    const bgFactory = new GameBgFactory();
    const enemiesFactory = new EnemiesFactory();
    const explosionParticlesFactory = new ExplosionParticlesFactory();
    const explosionParticlesCastleFactory = new ExplosionCastleParticlesFactory();
    const mountains = new MountainsFactory();

    const view: IGameView = {
      bg: bgFactory.buildUi({ scene }),
      ground: platformFactory.buildUi({ scene }),
      mountains: mountains.buildUi({ scene }),
      bullet: bulletFactory.buildUi({ scene }),
      slingshotPoint: slingshotPointFactory.buildUi({ scene }),
      bricks: castlesFactory.buildUi({ scene }),
      enemies: enemiesFactory.buildUi({ scene }),
      explosionParticles: explosionParticlesFactory.buildUi({ scene }),
      explosionCastleParticles: explosionParticlesCastleFactory.buildUi({ scene }),
    };

    return view;
  }
}