import { TRANSFORM_ENEMY } from "../GameConfig";
import { EVENTS } from "../libs/events/Events";

export class Enemy extends Phaser.Physics.Matter.Image {
  public eventSignal = new Phaser.Events.EventEmitter();

  private _scene: Phaser.Scene;
  private _spawnX = 0;
  private _spawnY = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene.matter.world, x, y, texture);
    this._scene = scene;
    scene.add.existing(this);
  }

  public spawn(x: number, y: number): void {
    this.setPosition(x, y);
    this.angle = 0;

    this._spawnX = x;
    this._spawnY = y;

    this.visible = true;
    this.active = true;
    console.log("@@@ --- ", "SPAWN")
    this._scene.matter.world.add(this.body!);
  }

  public checkTransform(enemyPool: Phaser.GameObjects.Group): void {
    if (Phaser.Math.Distance.Between(this._spawnX, this._spawnY, this.x, this.y) > TRANSFORM_ENEMY) {
      this.eventSignal.emit(EVENTS.EXPLOSION, [this.x, this.y]);

      enemyPool.killAndHide(this);
      this.visible = false;
      this.active = false;

      this._scene.matter.world.remove(this);
      this._scene.matter.world.remove(this.body!);
    }
  }
}