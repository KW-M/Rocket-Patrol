import Phaser from 'phaser';
import images_starfield from 'url:../assets/starfield.png';
import images_spaceship from 'url:../assets/spaceship.png';
import images_rocket from 'url:../assets/lettuce.webp';
import images_explosion from 'url:../assets/explosion.png';
import sounds_explosion38 from 'url:../assets/explosion38.wav';
import sounds_rocket_shot from 'url:../assets/rocket_shot.wav';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }

  preload() {
    var bg = this.add.rectangle(this.game.config.width / 2, this.game.config.height / 2, 400, 30, 0x666666).setOrigin(0.5, 0.5);
    var bar = this.add.rectangle(bg.x, bg.y, bg.width, bg.height, 0xffffff).setScale(0, 1).setOrigin(0.5, 0.5);

    // console.table(images);

    this.load.image("starfield", images_starfield);
    this.load.image('spaceship', images_spaceship);
    this.load.image('rocket', images_rocket);
    this.load.spritesheet('explosion', images_explosion, { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
    this.load.audio('sfx_explosion', sounds_explosion38);
    this.load.audio('sfx_rocket', sounds_rocket_shot);

    this.load.on('progress', function (progress) {
      bar.setScale(progress, 1);
    });
  }

  update() {
    this.scene.start('menu');
    // this.scene.start('play');
    // this.scene.remove();
  }
}
