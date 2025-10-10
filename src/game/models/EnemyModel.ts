const LVL_ENEMIES = 1;
const MAX_LVL = 12;

export interface ILvl {
  targets: number;
  enemies: { x: number, y: number, type: string }[];
  castle: { x: number, y: number, rotation: number }[];
  mountains: number;
}

export class EnemyModel {
  static instance: EnemyModel;
  static getModel(): EnemyModel {
    if (!EnemyModel.instance) {
      EnemyModel.instance = new EnemyModel
    }

    return EnemyModel.instance;
  }

  private _lvl = 0;

  public readonly maxEnemies = 3;
  public lvlEnemies = LVL_ENEMIES;

  public resetLvlEnemies(targets: number): void {
    this.lvlEnemies = targets;
  }

  public increaseLvl(): void {
    this._lvl++;
    this._lvl = this._lvl % MAX_LVL;
  }

  public get lvl(): number {
    return this._lvl;
  }
}