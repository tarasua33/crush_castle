import { Scene } from 'phaser';
import { GAME_DIMENSIONS } from '../GameConfig';
import { GameViewFactory } from '../factories/GameViewFactory';
import { BaseGameState } from '../controllers/states/BaseGameState';
import { PointerComponent } from '../components/PointerComponent';
import { ConstraintComponent } from '../components/ConstraintComponent';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  private _scale = 1;

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
  }

  private _createGame() {
    // this.matter.world.setBounds(0, 0, GAME_DIMENSIONS.width, GAME_DIMENSIONS.height);
    const gameView = new GameViewFactory().buildUi({ scene: this });

    const constraintComponent = new ConstraintComponent()
    const pointerComponent = new PointerComponent();

    const baseGame = new BaseGameState();
    baseGame.start({ gameView, pointerComponent, constraintComponent, scene: this })
  }

  resize(gameSize: Partial<Phaser.Structs.Size>) {
    const { width, height } = gameSize;

    const vw = width!;
    const vh = height!;

    const baseWidth = GAME_DIMENSIONS.width;
    const baseHeight = GAME_DIMENSIONS.height;

    const scale = this._scale = Math.min(
      vw / baseWidth,
      vh / baseHeight
    );
    this.cameras.main.setZoom(scale);
    this.cameras.main.centerOn(baseWidth / 2, baseHeight / 2);
  }

  public zoomTo(scale: number, duration: number, ease: string): void {
    this.camera.zoomTo(this._scale * scale, duration, ease);
  }

  public setZoom(scale: number): void {
    this.cameras.main.setZoom(this._scale * scale);
  }
}
