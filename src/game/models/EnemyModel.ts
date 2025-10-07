const LVL_ENEMIES = 3;

export class EnemyModel {
  static instance: EnemyModel
  static getModel(): EnemyModel {
    if (!EnemyModel.instance) {
      EnemyModel.instance = new EnemyModel
    }

    return EnemyModel.instance;
  }

  public readonly maxEnemies = 3;
  public lvlEnemies = LVL_ENEMIES;

  public resetLvlEnemies(): void {
    this.lvlEnemies = LVL_ENEMIES;
  }
}