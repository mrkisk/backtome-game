let parameters;

let playerImage = [];
let titleImage, blockImage, grassImage, ruleImage;
// let fonta;
const dx4 = [-1, 0, 1, 0];
const dy4 = [0, -1, 0, 1];
const GROUNDHEIGHT = 480;
let game;
let title;
let scene;

let fileLoaded = false;
let imageLoaded = false;

function setup() {
    createCanvas(720, 600);
    frameRate(60);
    imageMode(CENTER);
    textAlign(CENTER, CENTER);
    noStroke();
    // textFont('MS Gothic', 32);
    setParameterGlobal("./assets/data/config.txt");
    loadImages();
    // fonta = loadFont('AngsanaNew-Bold-120');
    scene = -1;
}

function draw() {
    keyboardCheckOnDraw();
    if (fileLoaded && imageLoaded && scene == -1) {
        scene = 0;
        loadScene(scene);
    }
    if (scene === 0) {
        title.runUpdate();
        title.runDisplay();
    } else if (scene === 1) {
        game.runUpdate();
        game.runDisplay();
    }
}

function loadScene(scene_) {
    scene = scene_;
    if (scene_ === 0) {
        title = new Title();
    } else if (scene_ === 1) {
        game = new Game();
    }
}
