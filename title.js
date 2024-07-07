class Title extends GameObject {
    constructor() {
        super();
        this.titleY = 100;
        this.messageSize = 45;
        this.rotateSpeed = 0.04;
        this.pingPong = new PingPong(0, this.rotateSpeed);
        this.showingRule = false;
        this.selectingMode = false;
        this.selectedMenu = 0;
        this.selectedMode = 0;
        this.setParameter();
    }

    setParameter() {
        this.UP = parameters["Player1UP"];
        this.DOWN = parameters["Player1DOWN"];
        this.SHOOT = parameters["Player1SHOOT"];
    }

    update() {
        this.pingPong.runUpdate();
        if (!this.showingRule && !this.selectingMode) {
            if (keyboardd[this.UP]) this.selectedMenu = 0;
            else if (keyboardd[this.DOWN]) this.selectedMenu = 1;
            else if (keyboardd[this.SHOOT]) {
                if (this.selectedMenu === 0) this.selectingMode = true;
                else if (this.selectedMenu === 1) this.showingRule = true;
                this.selectedMenu = 0;
            }
        } else if (this.showingRule) {
            if (keyboardd[this.SHOOT]) {
                this.showingRule = false;
                this.selectingMode = true;
            }
        } else if (this.selectingMode) {
            if (keyboardd[this.UP]) this.selectedMode = 0;
            else if (keyboardd[this.DOWN]) this.selectedMode = 1;
            else if (keyboardd[this.SHOOT]) {
                loadScene(1);
                game.setMode(this.selectedMode);
            }
        }
    }

    display() {
        this.displayMain();
        
        if (!this.showingRule && !this.selectingMode) {
            this.displayMenu();
        } else if (this.showingRule) {
            this.displayRule();
        } else if (this.selectingMode) {
            this.displayMode();
        }
    }

    displayMain() {
        background(128, 255, 255);
        for (let i = 15; i < width; i += 30) {
            image(grassImage, i, 480 + 15);
            for (let j = 510 + 15; j < height; j += 30) {
                image(blockImage, i, j);
            }
        }
        image(titleImage, width / 2, this.titleY);
    }

    displayMenu() {
        const upperMessageY = height / 2 - 60;
        const lowerMessageY = height / 2 + 40;
        textSize(this.messageSize);
        fill(0);
        text("START GAME", width / 2, upperMessageY);
        text("GAME RULE", width / 2, lowerMessageY);
        if (this.selectedMenu === 0) this.displayTriangle(width / 2 - 160, upperMessageY);
        else this.displayTriangle(width / 2 - 160, lowerMessageY);
        this.displayDescription();
    }

    displayRule() {
        fill(0);
        textSize(this.messageSize / 8 * 7);
        text("GAME RULE", width / 2, height / 2 - 130);
        fill(0);
        textAlign(LEFT, TOP);
        textSize(this.messageSize / 5 * 3);
        text("Player 1\nWASD keys : Move\nQ key : Shoot\n\nPlayer 2\nArrow keys : Move\nShift key : Shoot", 70, height / 2 - 80);
        textAlign(CENTER, CENTER);
        image(ruleImage, width * 0.7, height / 2 + 40, ruleImage.width / 7 * 3, ruleImage.height / 7 * 3);
    }

    displayMode() {
        const upperMessageY = height / 2 - 60;
        const lowerMessageY = height / 2 + 40;
        textSize(this.messageSize);
        fill(0);
        text("STANDARD MODE", width / 2, upperMessageY);
        text("SPECIAL MODE", width / 2, lowerMessageY);
        if (this.selectedMode === 0) this.displayTriangle(width / 2 - 220, upperMessageY);
        else this.displayTriangle(width / 2 - 220, lowerMessageY);
        this.displayDescription();
    }

    displayDescription() {
        textSize(this.messageSize / 2);
        fill(0);
        text("W,S : Move    Q : Select", width / 2, height / 2 + 125);
    }

    displayTriangle(x, y) {
        fill(0, 0, 0, 0);
        stroke(0);
        strokeWeight(3);
        const widthTriangle = 25;
        const heightTriangle = 20 * sin(this.pingPong.get() * PI / 2);
        triangle(x, y, x - widthTriangle, y - heightTriangle, x - widthTriangle, y + heightTriangle);
        triangle(width - x, y, width - x + widthTriangle, y - heightTriangle, width - x + widthTriangle, y + heightTriangle);
        strokeWeight(1);
        noStroke();
    }
}
