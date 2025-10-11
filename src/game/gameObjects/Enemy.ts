import { TRANSFORM_ENEMY } from "../GameConfig";
import { EVENTS } from "../libs/events/Events";

export class Enemy extends Phaser.Physics.Matter.Image {
  public eventSignal = new Phaser.Events.EventEmitter();

  private _enemyPool: Phaser.GameObjects.Group;
  private _scene: Phaser.Scene;
  private _spawnX = 0;
  private _spawnY = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, enemyPool: Phaser.GameObjects.Group) {
    super(scene.matter.world, x, y, texture);
    this._scene = scene;
    scene.add.existing(this);
    this._enemyPool = enemyPool;

    scene.matter.world.remove(this);
    scene.matter.world.remove(this.body!);

    (this.body as MatterJS.BodyType).gameObject = this;
  }

  public spawn(x: number, y: number, type?: string): void {
    if (type) this.setTexture(type);
    this.setPosition(x, y);
    this.angle = 0;

    this._spawnX = x;
    this._spawnY = y;

    this.visible = true;
    this.active = true;

    this._scene.matter.world.add(this.body!);
  }

  public checkTransform(): void {
    if (Phaser.Math.Distance.Between(this._spawnX, this._spawnY, this.x, this.y) > TRANSFORM_ENEMY) {
      this._destroy();
    }
  }

  private _destroy(): void {
    this.eventSignal.emit(EVENTS.EXPLOSION, [this.x, this.y]);

    this.setVelocity(0);
    this.setAngularSpeed(0);
    this.setAngularVelocity(0);

    this._enemyPool.killAndHide(this);
    this.visible = false;
    this.active = false;

    const scene = this._scene;
    scene.matter.world.remove(this);
    scene.matter.world.remove(this.body!);
  }

  public hit(): void {
    if (this.active) {
      this._destroy();
    }
  }
}