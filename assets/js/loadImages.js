function loadImages() {
    let playerImg = loadImage("./assets/images/players.png", img => {
        for (let i = 0; i < 2; i++) {
            playerImage[i] = [];
            for (let j = 0; j < 3; j++) {
                playerImage[i][j] = img.get(j * 24, i * 35, 24, 35);
            }
        }
        imageLoaded = true;
    });
    grassImage = loadImage("./assets/images/grass.png");
    blockImage = loadImage("./assets/images/block.png");
    titleImage = loadImage("./assets/images/title.png");
    ruleImage = loadImage("./assets/images/rule.png");
}
