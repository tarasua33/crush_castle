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
}