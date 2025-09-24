import { Scene } from 'phaser';
import { GAME_DIMENSIONS, MAX_CONSTRAIN, MAX_VELOCITY } from '../GameConfig';
import { GameViewFactory } from '../factories/GameViewFactory';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  private _bullet: Phaser.Physics.Matter.Image;
  // private _slingshotPoint: { position: { x: number, y: number }, x: number, y: number, type: string };
  private _slingshotPoint: Phaser.GameObjects.Image;
  // private _slingshotPoint: Phaser.GameObjects.Image;
  private _pointer: Phaser.Math.Vector2 | undefined;
  // private _previousPointer: Phaser.Types.Math.Vector2Like | undefined;
  private _constraint: MatterJS.ConstraintType;
  private _isDragging: boolean;

  constructor() {
    super('Game');
  }

  create() {
    this.camera = this.cameras.main;
    // this.camera.setBackgroundColor(0x00ff00);

    this.scale.on('resize', this.resize, this);
    this.resize({ width: window.innerWidth, height: window.innerHeight });

    const bg = this.add.rectangle(0, 0, GAME_DIMENSIONS.width, GAME_DIMENSIONS.height, 0xFFFFFF);
    bg.setOrigin(0);

    this._createGame();
    // this.camera = this.cameras.main;
    // this.camera.setBackgroundColor(0x00ff00);

    // this.background = this.add.image(512, 384, 'background');
    // this.background.setAlpha(0.5);

    // this.msg_text = this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
    //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
    //     stroke: '#000000', strokeThickness: 8,
    //     align: 'center'
    // });
    // this.msg_text.setOrigin(0.5);

    // this.input.once('pointerdown', () => {

    //     this.scene.start('GameOver');

    // });
  }

  private _createGame() {
    this.matter.world.setBounds(0, 0, GAME_DIMENSIONS.width, GAME_DIMENSIONS.height);
    const gameView = new GameViewFactory().buildUi({ scene: this });

    this._bullet = gameView.bullet;
    // bird.body!.plugin = { continuous: true };

    const slingshotPoint = this._slingshotPoint = gameView.slingshotPoint

    this._constraint = this.matter.add.constraint(
      this._bullet.body as MatterJS.BodyType,
      slingshotPoint as unknown as MatterJS.BodyType,
      0,
      0.02);

    this.input.on("pointerdown", this._startDrag, this);
    this.input.on("pointermove", this._doDrag, this);
    this.input.on("pointerup", this._release, this);
    this.matter.world.on("afterupdate", this._onPhysicUpdate, this);

    this._isDragging = false;
  }

  // private _createBricks(ground: Phaser.GameObjects.TileSprite): void {

  private _onPhysicUpdate(): void {
    if (this._isDragging && this._pointer) {
      this._onDrag(this._pointer);
    }
  }

  private _startDrag(pointer: Phaser.Input.Pointer) {
    const worldPoint = pointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;

    const dist = Phaser.Math.Distance.Between(worldPoint.x, worldPoint.y, this._bullet.x, this._bullet.y);
    if (dist < 100) {
      this._pointer = worldPoint;
      this._isDragging = true;
    }
  }

  private _doDrag(pointer: Phaser.Input.Pointer) {
    if (this._isDragging) {
      this._pointer = pointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;;
    }
  }

  private _onDrag(pointer: Phaser.Math.Vector2): void {
    const worldPoint = pointer;

    const slingshotPoint = this._slingshotPoint.body!.position;
    const dist = Phaser.Math.Distance.Between(slingshotPoint.x, slingshotPoint.y, worldPoint.x, worldPoint.y);

    if (dist < 100) {
      // this._previousPointer = { x: worldPoint.x, y: worldPoint.y };
      this._bullet.setPosition(worldPoint.x, worldPoint.y);

      // console.log(dist);
      // console.log(slingshotPoint);
      // console.log(worldPoint);
    }
    else {
      // const previousPointer = this._previousPointer!;
      const angle = Math.atan2(worldPoint.y - slingshotPoint.y, worldPoint.x - slingshotPoint.x);
      const y = Math.sin(angle) * MAX_CONSTRAIN;
      const x = Math.cos(angle) * MAX_CONSTRAIN;
      this._bullet.setPosition(slingshotPoint.x + x, slingshotPoint.y + y);

      // console.log(dist);
      // console.log(previousPointer.x, previousPointer.y);
    }
  }

  private _release() {
    if (this._isDragging) {
      this._isDragging = false;
      this._pointer = undefined;
      // this._previousPointer = undefined;
      this.matter.world.removeConstraint(this._constraint);

      const v = this._bullet.body!.velocity;
      // console.log(v);
      this._bullet.setVelocity(
        Phaser.Math.Clamp(v.x, -MAX_VELOCITY, MAX_VELOCITY),
        Phaser.Math.Clamp(v.y, -MAX_VELOCITY, MAX_VELOCITY)
      );
    }
  }

  resize(gameSize: Partial<Phaser.Structs.Size>) {
    const { width, height } = gameSize;

    const vw = width!;
    const vh = height!;

    const baseWidth = GAME_DIMENSIONS.width;
    const baseHeight = GAME_DIMENSIONS.height;

    const scale = Math.min(
      vw / baseWidth,
      vh / baseHeight
    );

    this.cameras.main.setZoom(scale);
    this.cameras.main.centerOn(baseWidth / 2, baseHeight / 2);
  }
}
