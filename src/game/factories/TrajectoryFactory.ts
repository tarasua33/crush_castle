import { TrajectoryContainer } from "../gameObjects/TrajectoryContainer";
import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";

interface IBuildConfig {
  scene: Phaser.Scene
}

export class TrajectoryFactory extends AbstractStandardFactory<TrajectoryContainer> {
  public buildUi({ scene }: IBuildConfig): TrajectoryContainer {

    const container = new TrajectoryContainer(scene);

    for (let i = 0; i < 10; i++) {
      const trj = scene.add.graphics({});
      trj.fillStyle(0xffffff, 0.5);
      trj.fillCircle(0, 0, 20);

      container.points.push(trj);
      container.add(trj);
    }

    return container;
  }
}