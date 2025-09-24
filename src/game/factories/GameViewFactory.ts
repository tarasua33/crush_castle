

interface IBuildConfig {
  scene: Phaser.Scene;
}

import { AbstractBaseFactory } from "../libs/factories/AbstractBaseFactory";
import { BulletFactory } from "./BulletFactory";
import { CastlesFactory } from "./CastlesFactory";
import { PlatformsFactory } from "./PlatformsFactory";
import { SlingshotPointFactory } from "./SlingshotPointFactory";

export interface IGameView {
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
    const castlesFactory = new CastlesFactory()

    const ground = platformFactory.buildUi({ scene });

    const view: IGameView = {
      ground,
      bullet: bulletFactory.buildUi({ scene }),
      slingshotPoint: slingshotPointFactory.buildUi({ scene }),
      bricks: castlesFactory.buildUi({ scene })
    };

    return view;
  }
}