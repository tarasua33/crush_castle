import { BULLET_MASS, SLING_SHOT_X, SLING_SHOT_Y } from "../GameConfig";
import { Bullet } from "../gameObjects/Bullet";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";

interface IBuildConfig {
  scene: Phaser.Scene
}

export class BulletFactory extends AbstractStandardFactory<Bullet[]> {
  public buildUi({ scene }: IBuildConfig): Bullet[] {
    const bullet = new Bullet(scene, SLING_SHOT_X, SLING_SHOT_Y, "saw").setCircle(60).setBounce(0.4).setMass(BULLET_MASS[0]);
    bullet.setFrictionAir(0.02);
    bullet.setScale(0.5);
    bullet.hideObject();

    const bullet1 = new Bullet(scene, SLING_SHOT_X, SLING_SHOT_Y, "saw1").setBody({
      type: "rectangle",
      width: 90,
      height: 90
    }).setBounce(0).setMass(BULLET_MASS[1]);
    bullet1.setFrictionAir(0.02);
    bullet1.setScale(0.5);
    bullet1.hideObject();

    const bullet2 = new Bullet(scene, SLING_SHOT_X, SLING_SHOT_Y, "saw2").setCircle(75).setBounce(0.2).setMass(BULLET_MASS[2]);
    bullet2.setFrictionAir(0.02);
    bullet2.setScale(0.6);
    bullet2.hideObject();

    return [bullet, bullet1, bullet2];
  }
}