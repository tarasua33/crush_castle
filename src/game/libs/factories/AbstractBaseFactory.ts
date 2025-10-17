// import { AssetsLoader } from "../utils/AssetsLoader";
import { EnemyModel } from "../../models/EnemyModel";
import { WeaponModel } from "../../models/WeaponModel";
import { IModels } from "../models/IModels";

export abstract class AbstractBaseFactory {
  // protected _assetsLoader: AssetsLoader;
  protected _models: IModels;

  constructor() {
    // this._assetsLoader = AssetsLoader.getLoader();
    this._models = {
      enemyModel: EnemyModel.getModel(),
      weaponModel: WeaponModel.getModel(),
      // platformsModel: PlatformsModel.getModel(),
      // characterModel: CharacterModel.getModel(),
      // levelModel: LevelModel.getModel(),
    };
  }
}
