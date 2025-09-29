export class PointerComponent {
  public pointer: Phaser.Math.Vector2 | undefined;
  private _isDragging = false;

  public startDrag(): void {
    this._isDragging = true;
  }

  public endDrag(): void {
    this._isDragging = false;
  }

  public get isDragging(): boolean {
    return this._isDragging;
  };
}