import { Scene } from 'phaser';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(this.scale.width / 2 - 200, this.scale.height / 2, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress: number) => {

      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + (460 * progress);

    });
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.json("lvls", "data/lvls.json");

    this.load.audio('ambient-spring', [
      'audio/ambient-spring.mp3'
    ]);

    this.load.setPath('assets');

    this.load.image('cloud1', 'game/Cloud_1.png');
    this.load.image('cloud2', 'game/Cloud_2.png');
    this.load.image('hills1', 'game/Hills_1.png');
    this.load.image('hills2', 'game/Hills_2.png');
    this.load.image('gameBg', 'game/bg_tile.png');

    this.load.image('logo', 'logo.png');
    this.load.image('bgTile', 'game/GrassCliffMid.png');
    this.load.image('saw', 'game/Saw.png');
    this.load.image('saw2', 'game/Mace_1.png');
    this.load.image('saw1', 'game/Mac_128.png');
    this.load.image('brick_tile', 'game/brick_tile.png');
    this.load.image('slingshot_bottom', 'game/slingshotPoint_b.png');
    this.load.image('slingshot_top', 'game/slingshotPoint_t.png');
    this.load.image('slingshotPoint_point', 'game/slingshotPoint_point.png');
    this.load.image('rope', 'game/rope.png');
    this.load.image('chest', 'game/chest.png');
    this.load.image('enemy', 'game/enemy.png');
    this.load.image('mace', 'game/Mace.png');
    this.load.image('spark', 'game/spark.png');
    this.load.image('star', 'game/star.png');
    this.load.image('confetti', 'game/confetti.png');
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start('MainMenu');
  }
}
