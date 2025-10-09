import { BRICKS_NUMBER, CASTLE_BRICK_H, CASTLE_BRICK_W } from "../GameConfig";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";

interface IBuildConfig {
  scene: Phaser.Scene
}

export class CastlesFactory extends AbstractStandardFactory<Phaser.Physics.Matter.Image[]> {
  public buildUi({ scene }: IBuildConfig): Phaser.Physics.Matter.Image[] {
    const bricks = [];
    for (let i = 0; i < BRICKS_NUMBER; i++) {
      const brick = scene.matter.add.image(
        0,
        0,
        'brick_tile', undefined, { label: "block" }).setBody({
          type: "rectangle",
          width: CASTLE_BRICK_W,
          height: CASTLE_BRICK_H
        }, {
          isSensor: true
        });
      brick.rotation = 0;
      brick.body!.gameObject = brick

      bricks.push(brick);
    }

    return bricks;
  }
}