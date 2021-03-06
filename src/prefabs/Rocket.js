import Phaser from 'phaser';

export default class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.movementSpeed = 2;
        this.firingSpeed = 4;
        this.isFiring = false;
        this.sfxRocket = scene.sound.add('sfx_rocket');
        this.setScale(0.2)
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.isFiring = true;
            this.sfxRocket.play();
        }

        if (this.isFiring) {

            this.y -= this.firingSpeed;
            if (this.y < 108) {
                this.isFiring = false;
                this.y = this.scene.game.config.height - borderUISize - borderPadding;
            }

        } else {

            if (keyLEFT.isDown) {
                this.x -= this.movementSpeed;
            }
            if (keyRIGHT.isDown) {
                this.x += this.movementSpeed;
            }

            this.x = Phaser.Math.Clamp(this.x, borderUISize + borderPadding, this.scene.game.config.width - borderUISize - borderPadding);
        }
    }

    reset() {
        this.y = this.y = this.scene.game.config.height - borderUISize - borderPadding;
        this.isFiring = false;
    }
}