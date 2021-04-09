import Phaser from 'phaser';
import images from '../assets/*.png';
import sounds from '../assets/*.wav';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }

  preload() {
    var bg = this.add.rectangle(this.game.config.width / 2, this.game.config.height / 2, 400, 30, 0x666666).setOrigin(0.5, 0.5);
    var bar = this.add.rectangle(bg.x, bg.y, bg.width, bg.height, 0xffffff).setScale(0, 1).setOrigin(0.5, 0.5);

    console.table(images);

    this.load.image("starfield", images.starfield);
    this.load.image('spaceship', images.spaceship);
    this.load.image('rocket', images.rocket);
    this.load.spritesheet('explosion', images.explosion, { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
    this.load.audio('sfx_explosion', sounds.explosion38);
    this.load.audio('sfx_rocket', sounds.rocket_shot);

    this.load.on('progress', function (progress) {
      bar.setScale(progress, 1);
    });
  }

  update() {
    // this.scene.start('menu');
    this.scene.start('play');
    // this.scene.remove();
  }
}
