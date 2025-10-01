

interface IBuildConfig {
  scene: Phaser.Scene;
}

import { Slingshot } from "../gameObjects/Slingshot";
import { AbstractBaseFactory } from "../libs/factories/AbstractBaseFactory";
import { BulletFactory } from "./BulletFactory";
import { CastlesFactory } from "./CastlesFactory";
import { EnemiesFactory } from "./EnemiesFactory";
import { GameBgFactory } from "./GameBgFactory";
import { PlatformsFactory } from "./PlatformsFactory";
import { SlingshotPointFactory } from "./SlingshotPointFactory";

export interface IGameView {
  bg: Phaser.GameObjects.Image;
  ground: Phaser.GameObjects.TileSprite;
  bullet: Phaser.Physics.Matter.Image;
  slingshotPoint: Slingshot;
  bricks: Phaser.Physics.Matter.Image[];
  enemies: Phaser.GameObjects.Group;
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

    const view: IGameView = {
      bg: bgFactory.buildUi({ scene }),
      ground: platformFactory.buildUi({ scene }),
      bullet: bulletFactory.buildUi({ scene }),
      slingshotPoint: slingshotPointFactory.buildUi({ scene }),
      bricks: castlesFactory.buildUi({ scene }),
      enemies: enemiesFactory.buildUi({ scene })
    };

    return view;
  }
}