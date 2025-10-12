import { CASTLE_BASE_X, CASTLE_BASE_Y, GAME_DIMENSIONS, MAX_MOUNTAINS_LVL, PLATFORM_HEIGHT, PLATFORM_TILE_WIDTH, PLATFORM_Y, SLING_SHOT_X, SLING_SHOT_Y } from "../../../GameConfig";
import { CastleBrick } from "../../../gameObjects/CastleBrick";
import { Enemy } from "../../../gameObjects/Enemy";
import { BaseStep, BaseStepParams } from "../../../libs/controllers/steps/BaseStep";
import { ILvl } from "../../../models/EnemyModel";
import { Game } from "../../../scenes/Game";

export interface SpawnLvlStepParams extends BaseStepParams {
  scene: Game;
  enemyPool: Phaser.GameObjects.Group;
  bullet: Phaser.Physics.Matter.Image;
  bricks: Phaser.GameObjects.Group;
  lvl: ILvl;
  mountains: Phaser.GameObjects.TileSprite[];
}

export class SpawnLvlStep extends BaseStep<SpawnLvlStepParams> {
  public start(params: SpawnLvlStepParams): void {
    this._params = params;
    const { bullet, scene, enemyPool, bricks, lvl, mountains } = params;

    // scene.matter.world = new Phaser.Physics.Matter.World(scene, {
    //   gravity: { y: 1, x: 0 },
    //   debug: true
    // });
    for (let i = 0; i < lvl.mountains; i++) {
      const ground = mountains[MAX_MOUNTAINS_LVL - lvl.mountains + i];
      ground.setPosition(CASTLE_BASE_X + PLATFORM_TILE_WIDTH * 0.75, PLATFORM_Y - (PLATFORM_HEIGHT * (i + 1) + PLATFORM_HEIGHT / 2));
      ground.active = true;
      ground.visible = true;
      scene.matter.world.add(ground.body!);
    }

    const castle = lvl.castle;

    for (const d of castle) {
      const brick = bricks.get() as CastleBrick;
      brick.spawn(
        CASTLE_BASE_X + d.x,
        CASTLE_BASE_Y - lvl.mountains * PLATFORM_HEIGHT + d.y,
        d.rotation
      );
    }

    const enemies = lvl.enemies;
    for (let i = 0; i < enemies.length; i++) {
      const enemyData = enemies[i];
      const enemy = enemyPool.get() as Enemy;
      enemy.spawn(
        CASTLE_BASE_X + enemyData.x,
        CASTLE_BASE_Y - lvl.mountains * PLATFORM_HEIGHT + enemyData.y,
        enemyData.type
      );
    }

    bullet.setPosition(SLING_SHOT_X, SLING_SHOT_Y);
    bullet.setStatic(true);

    // scene.matter.world.resume();
    scene.time.delayedCall(50, () => scene.matter.world.resume());

    scene.camera.stopFollow();
    scene.camera.centerOn(GAME_DIMENSIONS.width / 2, GAME_DIMENSIONS.height / 2);
    scene.setZoom(1);

    this._onComplete()
  }
}