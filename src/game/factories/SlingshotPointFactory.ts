import { SLING_SHOT_X, SLING_SHOT_Y } from "../GameConfig";
import { Slingshot } from "../gameObjects/Slingshot";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";

interface IBuildConfig {
  scene: Phaser.Scene
}

export class SlingshotPointFactory extends AbstractStandardFactory<Slingshot> {
  public buildUi({ scene }: IBuildConfig): Slingshot {
    const container = new Slingshot(scene, SLING_SHOT_X, SLING_SHOT_Y);
    scene.add.existing(container);
    container.build({
      scene,
      topPart: {
        texture: "slingshot_top",
        x: 0,
        y: 0,
        anchor: {
          x: 0.5,
          y: 0,
        }
      },
      bottomPart: {
        texture: "slingshot_bottom",
        x: 0,
        y: 0,
        anchor: {
          x: 0.5,
          y: 0,
        },
        scaleY: 3.7
      },
      ropeConfig: {
        texture: "rope",
        x: 0,
        y: 0,
        anchor: {
          x: 0.5,
          y: 0,
        },
        scaleY: 0
      },
      slingshotPointConfig: {
        texture: "slingshotPoint_point",
        x: SLING_SHOT_X,
        y: SLING_SHOT_Y,
        anchor: {
          x: 0.5,
          y: 0.5,
        },
        scaleX: 2,
        scaleY: 2
      }
    });

    return container;
  }
}