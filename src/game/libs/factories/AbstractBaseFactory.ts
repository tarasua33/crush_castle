// import { CharacterModel } from "../../models/CharacterModel";
// import { LevelModel } from "../../models/LevelModel";
// import { PlatformsModel } from "../../models/PlatformsModel";
// import { AssetsLoader } from "../utils/AssetsLoader";
import { IModels } from "../models/IModels";

export abstract class AbstractBaseFactory {
  // protected _assetsLoader: AssetsLoader;
  protected _models: IModels;

  constructor() {
    // this._assetsLoader = AssetsLoader.getLoader();
    this._models = {
      // platformsModel: PlatformsModel.getModel(),
      // characterModel: CharacterModel.getModel(),
      // levelModel: LevelModel.getModel(),
    };
  }
}
