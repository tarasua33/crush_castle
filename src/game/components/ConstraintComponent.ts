export class ConstraintComponent {
  private _constraint: MatterJS.ConstraintType;
  private _pos: Phaser.Math.Vector2;

  public createConstraint(bodyA: MatterJS.BodyType, bodyB: MatterJS.BodyType, scene: Phaser.Scene): MatterJS.ConstraintType {
    this._constraint = scene.matter.add.constraint(
      bodyA,
      bodyB,
      0,
      0.02);

    return this._constraint;
  }

  public setPosition(x: number, y: number): void {
    this._pos = new Phaser.Math.Vector2(x, y);
  }

  public getPosition(): Phaser.Math.Vector2 {
    return this._pos;
  }

  public get constraint(): MatterJS.ConstraintType {
    return this._constraint;
  }

  public pauseUpdate(): void {
    // this._constraint.bodyA.set
  }
}