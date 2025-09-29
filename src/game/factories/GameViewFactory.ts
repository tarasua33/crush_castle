

interface IBuildConfig {
  scene: Phaser.Scene;
}

import { AbstractBaseFactory } from "../libs/factories/AbstractBaseFactory";
import { BulletFactory } from "./BulletFactory";
import { CastlesFactory } from "./CastlesFactory";
import { GameBgFactory } from "./GameBgFactory";
import { PlatformsFactory } from "./PlatformsFactory";
import { SlingshotPointFactory } from "./SlingshotPointFactory";

export interface IGameView {
  bg: Phaser.GameObjects.Image;
  ground: Phaser.GameObjects.TileSprite;
  bullet: Phaser.Physics.Matter.Image;
  slingshotPoint: Phaser.Physics.Matter.Image;
  bricks: Phaser.Physics.Matter.Image[];
}

export class GameViewFactory extends AbstractBaseFactory {
  public buildUi(params: IBuildConfig): IGameView {
    const { scene } = params;

    const platformFactory = new PlatformsFactory();
    const bulletFactory = new BulletFactory();
    const slingshotPointFactory = new SlingshotPointFactory();
    const castlesFactory = new CastlesFactory();
    const bgFactory = new GameBgFactory();

    const view: IGameView = {
      bg: bgFactory.buildUi({ scene }),
      ground: platformFactory.buildUi({ scene }),
      bullet: bulletFactory.buildUi({ scene }),
      slingshotPoint: slingshotPointFactory.buildUi({ scene }),
      bricks: castlesFactory.buildUi({ scene })
    };

    return view;
  }
}