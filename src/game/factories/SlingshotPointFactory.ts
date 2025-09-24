import { SLING_SHOT_X, SLING_SHOT_Y } from "../GameConfig";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";

interface IBuildConfig {
  scene: Phaser.Scene
}

export class SlingshotPointFactory extends AbstractStandardFactory<Phaser.Physics.Matter.Image> {
  public buildUi({ scene }: IBuildConfig): Phaser.Physics.Matter.Image {
    const slingshotPoint = scene.matter.add.image(SLING_SHOT_X, SLING_SHOT_Y, 'slingshot_bottom', '', {
      isStatic: true,
      isSensor: true,
      render: { visible: true }
    });

    return slingshotPoint;
  }
}