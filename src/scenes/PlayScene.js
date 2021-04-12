import Phaser from 'phaser';
import Rocket from '../prefabs/rocket';
import Ship from '../prefabs/ship';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'play',
      physics: {
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      }
    });
  }
  preload() {
    //preloads happen in boot
    window.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    window.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    window.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    window.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

  }
  create() {

    window.borderUISize = 20
    window.borderPadding = 50
    let width = (this.game.config.width) * 1
    let height = (this.game.config.height) * 1

    // var emitter = this.add.particles('explosion')
    //   .createEmitter({
    //     speed: 100,
    //     scale: { start: 1, end: 0 },
    //     blendMode: 'ADD'
    //   });

    // var logo = this.physics.add.image(400, 100, 'rocket')
    //   .setVelocity(100, 200)
    //   .setBounce(1, 1)
    //   .setCollideWorldBounds(true);

    // emitter.startFollow(logo);

    this.gameOver = false;

    this.p1Score = 0;

    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
      frameRate: 30
    });

    this.starfield = this.add.tileSprite(
      0, 0, 640, 480, 'starfield'
    ).setOrigin(0, 0);

    this.p1Rocket = new Rocket(
      this,
      width / 2,
      height - borderUISize - borderPadding,
      'rocket'
    );

    this.ship1 = new Ship(this, 100, 120, 'spaceship', 0, 1).setOrigin(0, 0);
    this.ship2 = new Ship(this, 200, 200, 'spaceship', 0, 1).setOrigin(0, 0);
    this.ship3 = new Ship(this, 300, 240, 'spaceship', 0, 1).setOrigin(0, 0);

    // this.input.keyboard
    //   .on('keydown-R', function () {
    //     this.scene.restart();
    //   }, this)
    //   .on('keydown-Q', function () {
    //     this.scene.stop().run('menu');
    //   }, this)
    //   .on('keydown-K', function () {
    //     this.scene.stop().run('end');
    //   }, this);

    this.add.rectangle(
      0,
      borderUISize + borderPadding,
      width,
      borderUISize * 2,
      0x00FF00,
    ).setOrigin(0, 0);
    // white borders
    this.add.rectangle(0, 0, width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, height - borderUISize, width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, 0, borderUISize, height, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(width - borderUISize, 0, borderUISize, height, 0xFFFFFF).setOrigin(0, 0);

    // score
    let scoreConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 100
    };

    this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

    // 60-second play clock
    scoreConfig.fixedWidth = 0;
    this.clock = this.time.delayedCall(6000, () => {
      this.add.text(width / 2, height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
      this.add.text(width / 2, height / 2 + 64, '(R)estart', scoreConfig).setOrigin(0.5);
      this.gameOver = true;
    }, null, this);

  }
  update() {
    this.starfield.tilePositionX -= 4;

    if (!this.gameOver) {
      this.p1Rocket.update();
      this.ship1.update();
      this.ship2.update();
      this.ship3.update();
    }
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(window.keyR)) {
      this.scene.restart();
    }

    let r = this.p1Rocket;
    for (let s of [this.ship1, this.ship2, this.ship3]) {
      if (r.x < s.x + s.width &&
        r.x + r.width > s.x &&
        r.y < s.y + s.height &&
        r.y + r.height > s.y) {
        r.reset();
        this.destroyShip(s);
      }
    }
  }

  destroyShip(ship) {
    this.sound.play('sfx_explosion');
    ship.alpha = 0;
    let boom = this.add.sprite(ship.x, ship.y, 'explosion');
    boom.anims.play('explode');
    boom.on('animationcomplete', () => {
      ship.reset();
      ship.alpha = 1;
      boom.destroy();
    });
    this.p1Score += ship.pointValue;
    this.scoreLeft.setText(this.p1Score);
  }
}
