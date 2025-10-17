export class WeaponModel {
  static instance: WeaponModel;
  static getModel(): WeaponModel {
    if (!WeaponModel.instance) {
      WeaponModel.instance = new WeaponModel
    }

    return WeaponModel.instance;
  }

  public weaponId = 0;
}