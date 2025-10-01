import { AbstractBaseFactory } from "./AbstractBaseFactory";

interface IBuildConfig {
  // 
}

export abstract class AbstractStandardFactory<
  T extends | Phaser.GameObjects.GameObject
  | Phaser.GameObjects.GameObject[]
  | Phaser.GameObjects.Group
// | Map<string | number, IGameObject>
// | Map<string | number, IGameObject[]>
// | Map<string | number, Map<string | number, IGameObject[]>> = IGameObject,
> extends AbstractBaseFactory {
  public abstract buildUi(params: IBuildConfig): T;
}
