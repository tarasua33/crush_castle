import { BULLET_MASS, SLING_SHOT_X, SLING_SHOT_Y } from "../GameConfig";
import { Bullet } from "../gameObjects/Bullet";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";

interface IBuildConfig {
  scene: Phaser.Scene
}

export class BulletFactory extends AbstractStandardFactory<Phaser.Physics.Matter.Image> {
  public buildUi({ scene }: IBuildConfig): Phaser.Physics.Matter.Image {
    const bullet = new Bullet(scene, SLING_SHOT_X, SLING_SHOT_Y, "saw").setCircle(60).setBounce(0.4).setMass(BULLET_MASS);
    bullet.setFrictionAir(0.03);
    bullet.setScale(0.5);

    return bullet;
  }
}