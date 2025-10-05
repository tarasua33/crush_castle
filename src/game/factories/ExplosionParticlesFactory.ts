import { AbstractStandardFactory } from "../libs/factories/AbstractStandardFactory";

interface IBuildConfig {
  scene: Phaser.Scene
}

export class ExplosionParticlesFactory extends AbstractStandardFactory<Phaser.GameObjects.Particles.ParticleEmitter> {
  public buildUi({ scene }: IBuildConfig): Phaser.GameObjects.Particles.ParticleEmitter {
    const particles = scene.add.particles(0, 0, 'spark', {
      x: 0,
      y: 0,
      speed: { min: -300, max: 300 },
      angle: { min: 0, max: 360 },
      lifespan: 1800,
      scale: { start: 0.5, end: 0 },
      alpha: { start: 1, end: 0.75 },
      gravityY: 400,
      blendMode: 'ADD',
      // emitZone: {
      //   quantity: 0,
      //   type: 'random',
      //   source: new Phaser.Geom.Circle(400, 300, 50)
      // },
      emitting: false,
      // tint: [0xff0000, 0x00ff00, 0x0000ff],
      tint: [0xff0000],
      quantity: 50
    });
    // Phaser.GameObjects.Particles.ParticleEmitter;

    return particles;
  }
}