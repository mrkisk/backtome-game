function loadImages() {
    let playerImg = loadImage("data/players.png", img => {
        for (let i = 0; i < 2; i++) {
            playerImage[i] = [];
            for (let j = 0; j < 3; j++) {
                playerImage[i][j] = img.get(j * 24, i * 35, 24, 35);
            }
        }
        imageLoaded = true;
    });
    grassImage = loadImage("data/grass.png");
    blockImage = loadImage("data/block.png");
    titleImage = loadImage("data/title.png");
    ruleImage = loadImage("data/rule.png");
}
