import { CASTLE_BRICK_H, CASTLE_BRICK_W, TRANSFORM_BRICK } from "../GameConfig";
import { EVENTS } from "../libs/events/Events";

export class CastleBrick extends Phaser.Physics.Matter.Image {
  public eventSignal = new Phaser.Events.EventEmitter();

  private _brickPool: Phaser.GameObjects.Group;
  private _scene: Phaser.Scene;
  private _spawnX = 0;
  private _spawnY = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, brickPool: Phaser.GameObjects.Group) {
    super(scene.matter.world, x, y, texture);
    this._scene = scene;
    scene.add.existing(this);
    this._brickPool = brickPool;

    this.setBody({
      type: "rectangle",
      width: CASTLE_BRICK_W,
      height: CASTLE_BRICK_H
    }, {
      isSensor: true
    });

    this.visible = false;
    this.active = false;
    this.setSensor(true);
    this.setIgnoreGravity(true);
    this.rotation = 0;

    scene.matter.world.remove(this);
    scene.matter.world.remove(this.body!);

    (this.body as MatterJS.BodyType).gameObject = this;
  }

  public spawn(x: number, y: number, rotation: number, type?: string): void {
    if (type) this.setTexture(type);

    this.rotation = rotation;
    this.setPosition(x, y);
    // this.angle = 0;

    this._spawnX = x;
    this._spawnY = y;

    this.visible = true;
    this.active = true;

    this.setSensor(false);
    this.setIgnoreGravity(false);

    this._scene.matter.world.add(this.body!);
  }

  public checkTransform(): void {
    if (Phaser.Math.Distance.Between(this._spawnX, this._spawnY, this.x, this.y) > TRANSFORM_BRICK) {
      this._destroy();
    }
  }

  private _destroy(): void {
    this.eventSignal.emit(EVENTS.EXPLOSION, [this.x, this.y]);

    this.hideObject();
  }

  public hit(): void {
    // if (this.active) {
    //   this._destroy();
    // }
  }

  public hideObject(): void {
    const scene = this._scene;
    scene.matter.world.remove(this);
    scene.matter.world.remove(this.body!);

    this.setSensor(true);
    this.setIgnoreGravity(true);
    this.setVelocity(0);
    this.setAngularSpeed(0);
    this.setAngularVelocity(0);
    this.x = 0;
    this.y = 0;

    this._brickPool.killAndHide(this);
    this.visible = false;
    this.active = false;
  }
}