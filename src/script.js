import Phaser from 'phaser'
import BootScene from "./scenes/BootScene"
import EndScene from './scenes/EndScene';
import MenuScene from "./scenes/MenuScene"
import PlayScene from "./scenes/PlayScene"

let size = Math.min(window.innerWidth, window.innerHeight)

let gameConfig = {
    type: Phaser.AUTO,
    width: size,
    height: size,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    autoRound: true,
    banner: { text: 'white', background: ['#FD7400', '#FFE11A', '#BEDB39', '#1F8A70', '#004358'] },
    scene: [BootScene, MenuScene, PlayScene, EndScene]
};

function newGame() {
    if (game) return;
    game = new Phaser.Game(gameConfig);
    // game.state.add("start area", function (game) {
    //     this.preload = function () {

    //     };
    //     this.create = function () {
    //         console.debug("Setup pointer and scale");
    //         game.input.maxPointers = 1;
    //         game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //         game.scale.pageAlignHorizontally = true;
    //         game.scale.pageAlignVertically = true;
    //         game.scale.setScreenSize(true);
    //         game.scale.refresh();
    //         adjustCanvasSize();
    //     };
    //     this.update = function () {

    //     }
    // });

    // game.state.start("start area");
}

function destroyGame() {
    if (!game) return;
    game.destroy(true);
    game.runDestroy();
    game = null;
}

let game;

if (module.hot) {
    module.hot.dispose(destroyGame);
    module.hot.accept(newGame);
}

if (!game) newGame();

function adjustCanvasSize() {
    var divgame = document.getElementsByTagName("canvas")[0];
    let size = Math.min(window.innerWidth, window.innerHeight)
    divgame.style.width = size + "px";
    divgame.style.height = size + "px";
}

window.addEventListener('resize', adjustCanvasSize);