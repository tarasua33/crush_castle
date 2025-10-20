interface ImageConfig {
  texture: string;
  x: number;
  y: number;
  anchor: {
    x: number;
    y: number;
  },
  scaleX?: number;
  scaleY?: number;
  tint?: number
}

interface SlingshotConfig {
  scene: Phaser.Scene;
  topPart: ImageConfig;
  bottomPart: ImageConfig;
  slingshotPointConfig: ImageConfig;
  ropeConfig: ImageConfig;
}


export class Slingshot extends Phaser.GameObjects.Container {
  private _slingshotPoint: Phaser.GameObjects.Image;
  private _rope: Phaser.GameObjects.Image;
  private _baseRopeHeight: number;
  // constructor(...arr: ConstructorParameters<typeof Phaser.GameObjects.Sprite>) {
  //   super(...arr);
  // }

  public build(config: SlingshotConfig): void {
    const { scene, topPart, bottomPart, slingshotPointConfig, ropeConfig } = config;

    const top = new Phaser.GameObjects.Image(scene, topPart.x, topPart.y, topPart.texture);
    top.setOrigin(topPart.anchor.x, topPart.anchor.y);
    top.setScale(topPart.scaleX || 1, topPart.scaleY || 1);
    this.add(top);

    const bottom = new Phaser.GameObjects.Image(scene, bottomPart.x, top.height, bottomPart.texture);
    bottom.setOrigin(bottomPart.anchor.x, bottomPart.anchor.y);
    bottom.setScale(bottomPart.scaleX || 1, bottomPart.scaleY || 1);
    this.add(bottom);

    const rope = this._rope = new Phaser.GameObjects.Image(scene, ropeConfig.x, ropeConfig.y, ropeConfig.texture);
    rope.setOrigin(ropeConfig.anchor.x, ropeConfig.anchor.y);
    this._baseRopeHeight = rope.height || 1;
    rope.setScale(ropeConfig.scaleX || 1, ropeConfig.scaleY || 1);
    this.add(rope);

    const slingshotPoint = this._slingshotPoint = scene.matter.add.image(slingshotPointConfig.x, slingshotPointConfig.y, slingshotPointConfig.texture, '', {
      isStatic: true,
      isSensor: true,
      render: { visible: true }
    });
    if (slingshotPointConfig.tint) slingshotPoint.tint = slingshotPointConfig.tint;
    slingshotPoint.setScale(slingshotPointConfig.scaleX || 1, slingshotPointConfig.scaleY || 1);
  }

  public get slingshotPoint(): Phaser.GameObjects.Image {
    return this._slingshotPoint;
  }

  public rotateSlingshotPoint(angle: number): void {
    this._slingshotPoint.angle = angle * 3;
  }

  public rotateRope(angle: number, length: number): void {
    const rope = this._rope;
    rope.angle = Phaser.Math.RadToDeg(angle) - 90;
    const scaleY = length / this._baseRopeHeight
    rope.setScale(1, scaleY);
  }
}