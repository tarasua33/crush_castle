export class TrajectoryContainer extends Phaser.GameObjects.Container {
  public points: Phaser.GameObjects.Graphics[] = [];

  private _animated = false;
  private _counter = 0;

  constructor(...arr: ConstructorParameters<typeof Phaser.GameObjects.Container>) {
    super(...arr);

    arr[0].add.existing(this);
  }

  public hide(duration: number = 200) {
    this._animated = false;

    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration,
      ease: 'Sine.easeIn',
      onComplete: this._onHide.bind(this)
    });
  }

  private _onHide(): void {
    this.setVisible(false);
    this.setActive(false);
  }

  public show(duration: number = 200) {
    for (const point of this.points) {
      this.scene.tweens.killTweensOf(point);
    }

    this.setVisible(true);
    this.setActive(true);
    this.alpha = 0;

    this._animated = true;

    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration,
      ease: 'Sine.easeIn'
    });

    this._restartTween();
  }

  private _restartTween(): void {
    if (this._animated) {
      this.scene.tweens.add({
        targets: this.points[this._counter],
        scale: { from: 1.4, to: 1 },
        // yoyo: true,
        repeat: 0,
        duration: 100,
        ease: 'Sine.easeInOut'
      });

      this._counter++
      this._counter = this._counter % this.points.length;

      this.scene.tweens.add({
        targets: this.points[this._counter],
        scale: { from: 1, to: 1.4 },
        // yoyo: true,
        repeat: 0,
        duration: 100,
        ease: 'Sine.easeInOut',
        onComplete: this._restartTween.bind(this)
      });
    }
  }
}