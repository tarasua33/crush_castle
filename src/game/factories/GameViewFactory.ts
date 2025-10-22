

interface IBuildConfig {
  scene: Phaser.Scene;
}

import { Bullet } from "../gameObjects/Bullet";
import { Slingshot } from "../gameObjects/Slingshot";
import { TrajectoryContainer } from "../gameObjects/TrajectoryContainer";
import { AbstractBaseFactory } from "../libs/factories/AbstractBaseFactory";
import { CongratulationScreen } from "../screens/CongratulationScreen";
import { BulletFactory } from "./BulletFactory";
import { CastlesFactory } from "./CastlesFactory";
import { CongratulationScreenFactory } from "./CongratulationScreenFactory";
import { EnemiesFactory } from "./EnemiesFactory";
import { ExplosionCastleParticlesFactory } from "./ExplosionCastleParticlesFactory";
import { ExplosionParticlesFactory } from "./ExplosionParticlesFactory";
import { GameBgFactory } from "./GameBgFactory";
import { MountainsFactory } from "./MountainsFactory";
import { PlatformsFactory } from "./PlatformsFactory";
import { SlingshotPointFactory } from "./SlingshotPointFactory";
import { TrajectoryFactory } from "./TrajectoryFactory";

export interface IGameView {
  bg: Phaser.GameObjects.Container;
  mountains: Phaser.GameObjects.TileSprite[];
  ground: Phaser.GameObjects.TileSprite;
  bullet: Bullet[];
  slingshotPoint: Slingshot;
  bricks: Phaser.GameObjects.Group;
  enemies: Phaser.GameObjects.Group;
  explosionCastleParticles: Phaser.GameObjects.Particles.ParticleEmitter;
  explosionParticles: Phaser.GameObjects.Particles.ParticleEmitter;
  trajectory: TrajectoryContainer;
  congratulationScreen: CongratulationScreen;
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
    const trajectoryFactory = new TrajectoryFactory();
    const congratulationScreenFactory = new CongratulationScreenFactory();

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
      trajectory: trajectoryFactory.buildUi({ scene }),
      congratulationScreen: congratulationScreenFactory.buildUi({ scene })
    };

    return view;
  }
}