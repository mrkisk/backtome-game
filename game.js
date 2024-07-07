class Game extends GameObject {
    constructor() {
        super();
        this.RETRY = parameters["RETRY"];
        this.TITLE = parameters["TITLE"];
        this.messageSize = 90;
        this.messageY = height / 2 - 40;
        this.init();
    }

    init() {
        this.players = [
            new Player(this, 0, 0, 50, 130),
            new Player(this, 1, 0, width - 50, 130)
        ];
        this.hpBars = [
            new HPBar(this.players[0], 210, 540),
            new HPBar(this.players[1], width - 210, 540)
        ];
        this.bullets = [];
        this.stop();
        this.timers = [
            new Timer(120),
            new Timer(30),
            new Timer(45),
            new Timer(15)
        ];
        for (let i = 1; i < this.timers.length; i++) this.timers[i].setActive(false);
        this.winner = -1;
        this.phase = 0;
        this.mode = 0;
    }

    setMode(mode) {
        this.mode = mode;
        for (let player of this.players) player.setMode(mode);
    }

    start() {
        for (let player of this.players) player.setDoUpdate(true);
        for (let hpBar of this.hpBars) hpBar.setDoUpdate(true);
        for (let bullet of this.bullets) bullet.setDoUpdate(true);
    }

    stop() {
        for (let player of this.players) player.setDoUpdate(false);
        for (let hpBar of this.hpBars) hpBar.setDoUpdate(false);
        for (let bullet of this.bullets) bullet.setDoUpdate(false);
    }

    update() {
        if (keyboardd[10]) this.start();
        if (keyboardd[80]) this.stop();
        this.setPhase();
        for (let timer of this.timers) timer.runUpdate();
        for (let player of this.players) player.runUpdate();
        for (let hpBar of this.hpBars) hpBar.runUpdate();
        for (let bullet of this.bullets) bullet.runUpdate();
        this.checkCollision();
        this.removeInactiveBullets();
    }

    display() {
        this.displayStage();
        for (let player of this.players) player.runDisplay();
        for (let hpBar of this.hpBars) hpBar.runDisplay();
        for (let bullet of this.bullets) bullet.runDisplay();
        this.displayOnPhase();
    }

    setPhase() {
        if (!this.timers[0].isFinished()) {
            this.phase = 0;
        } else if (!this.timers[1].isFinished()) {
            this.timers[1].setActive(true);
            for (let player of this.players) player.setDoUpdate(true);
            this.phase = 1;
        } else if (this.winner === -1) {
            this.phase = 2;
        } else if (!this.timers[2].isFinished()) {
            this.timers[2].setActive(true);
            for (let player of this.players) player.setDoUpdate(false);
            for (let hpBar of this.hpBars) hpBar.setDoUpdate(false);
            for (let bullet of this.bullets) bullet.setDoUpdate(false);
            this.phase = 3;
        } else {
            this.timers[3].setActive(true);
            this.phase = 4;
            if (keyboardd[this.RETRY]) {
                loadScene(1);
                game.setMode(this.mode);
            } else if (keyboardd[this.TITLE]) loadScene(0);
        }
    }

    addBullet(playerId, x, y, dir) {
        this.bullets.push(new Bullet(playerId, x, y, dir));
    }

    removeInactiveBullets() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            if (!this.bullets[i].getActive()) {
                this.bullets.splice(i, 1);
            }
        }
    }

    checkCollision() {
        for (let bullet of this.bullets) {
            for (let bullet_ of this.bullets) {
                if (bullet !== bullet_ && bullet.playerId !== bullet_.playerId && bullet.isCollidingBullet(bullet_)) {
                    bullet.setActive(false);
                    bullet_.setActive(false);
                }
            }
            for (let player of this.players) {
                if (bullet.isColliding(player)) {
                    player.damage(bullet.POWER);
                    bullet.setActive(false);
                }
            }
        }
    }

    setWinner(playerId) {
        this.winner = (this.winner === -1) ? playerId : (this.winner === 1 - playerId) ? 2 : this.winner;
    }

    displayStage() {
        background(128, 255, 255);
        for (let i = 15; i < width; i += 30) {
            image(grassImage, i, 480 + 15);
            for (let j = 510 + 15; j < height; j += 30) {
                image(blockImage, i, j);
            }
        }
    }

    displayOnPhase() {
        if (this.phase === 0) {
            this.displayBlack();
            textSize(this.messageSize);
            fill(255, 0, 0);
            text("READY", width / 2, this.messageY);
        } else if (this.phase === 1) {
            textSize(this.messageSize);
            fill(255, 0, 0);
            text("GO", width / 2, this.messageY);
        } else if (this.phase === 2) {
            // Game is running, no specific display
        } else if (this.phase === 3) {
            this.displayBlack();
        } else if (this.phase === 4) {
            this.displayBlack();
            textSize(this.messageSize * (this.timers[3].getMaxTime() - this.timers[3].getTime()) / this.timers[3].getMaxTime());
            fill(255, 0, 0);
            let winnerText = (this.winner === 2) ? "DRAW" : ("PLAYER " + (this.winner + 1) + " WINS");
            text(winnerText, width / 2, this.messageY);
            if (this.timers[3].isFinished()) {
                textSize(this.messageSize / 3);
                text("R : Retry    T : Title", width / 2, this.messageY + 80);
            }
        }
    }

    displayBlack() {
        fill(0, 0, 0, 100);
        rect(0, 0, width, height);
    }
}
