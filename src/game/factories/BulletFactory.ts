import { SLING_SHOT_X, SLING_SHOT_Y } from "../GameConfig";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";

interface IBuildConfig {
  scene: Phaser.Scene
}

export class BulletFactory extends AbstractStandardFactory<Phaser.Physics.Matter.Image> {
  public buildUi({ scene }: IBuildConfig): Phaser.Physics.Matter.Image {
    const bullet = scene.matter.add.image(SLING_SHOT_X, SLING_SHOT_Y, "saw").setCircle(60).setBounce(0.4);
    bullet.setFrictionAir(0.03);
    bullet.setScale(0.5);

    return bullet;
  }
}