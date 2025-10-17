import { Enemy } from "./Enemy";

export class Bullet extends Phaser.Physics.Matter.Image {
  public eventSignal = new Phaser.Events.EventEmitter();
  // private _scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene.matter.world, x, y, texture);
    // this._scene = scene;
    scene.add.existing(this);

    scene.matter.world.once('afterupdate', () => {
      this.setOnCollide(this._hit.bind(this));
    });
  }

  private _hit(data: Phaser.Types.Physics.Matter.MatterCollisionData): void {
    const { bodyA, bodyB } = data;

    const gameObjectB = bodyB.gameObject;
    const gameObjectA = bodyA.gameObject;

    if (gameObjectB instanceof Enemy) {
      gameObjectB.hit();
    } else if (gameObjectA instanceof Enemy) {
      gameObjectA.hit();
    }
  }

  public hideObject(): void {
    // const scene = this._scene;
    // scene.matter.world.remove(this);
    // scene.matter.world.remove(this.body!);

    this.setSensor(true);
    this.setIgnoreGravity(true);
    this.setStatic(true);
    this.setAngle(0);
    this.setVelocity(0);
    this.setAngularSpeed(0);
    this.setAngularVelocity(0);
    this.x = 0;
    this.y = 0;

    this.visible = false;
    this.active = false;
  }

  public spawn(x: number, y: number, type?: string): void {
    if (type) this.setTexture(type);
    this.setPosition(x, y);
    this.angle = 0;

    // this._spawnX = x;
    // this._spawnY = y;

    this.setSensor(false);
    this.setIgnoreGravity(false);
    this.setStatic(false);

    this.visible = true;
    this.active = true;

    // this._scene.matter.world.add(this.body!);
  }
}