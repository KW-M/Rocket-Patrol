let canvas = document.getElementById("main_canvas");

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    autoRound:true
};

var game = new Phaser.Game(config,"game");

game.state.add("start area", function (game) {
    this.preload = function () {
        game.load.image("starfield", "assets/starfield.png");
    };
    this.create = function () {
        console.debug("Setup pointer and scale");
        game.input.maxPointers = 1;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.setScreenSize(true);
        game.scale.refresh();
        adjustCanvasSize();
    };
    this.update = function () {

    }
});

game.state.start("start area");

function adjustCanvasSize() {
    var divgame = document.getElementById("game");
    divgame.style.width = window.innerWidth + "px";
    divgame.style.height = window.innerHeight + "px";
}

window.addEventListener('resize', adjustCanvasSize);