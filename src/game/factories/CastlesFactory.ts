import { CASTLE_BASE_X, CASTLE_BASE_Y, CASTLE_BRICK_H, CASTLE_BRICK_W } from "../GameConfig";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";

interface IBuildConfig {
  scene: Phaser.Scene
}

export class CastlesFactory extends AbstractStandardFactory<Phaser.Physics.Matter.Image[]> {
  public buildUi({ scene }: IBuildConfig): Phaser.Physics.Matter.Image[] {
    const data: { x: number, y: number, rotation: number }[] = scene.cache.json.get("castles");

    const bricks = [];
    for (const d of data) {
      const brick = scene.matter.add.image(
        CASTLE_BASE_X + d.x,
        CASTLE_BASE_Y + d.y,
        'brick_tile', undefined, { label: "block" }).setBody({
          type: "rectangle",
          width: CASTLE_BRICK_W,
          height: CASTLE_BRICK_H
        });
      brick.rotation = d.rotation;

      console.log(brick.y);
      bricks.push(brick);
    }

    return bricks;
  }
}