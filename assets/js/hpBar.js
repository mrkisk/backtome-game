class HPBar extends GameObject {
    constructor(player, x, y) {
        super();
        this.player = player;
        this.x = x;
        this.y = y;
        this.width_ = 220;
        this.height_ = 30;
    }

    update() {
        // No update logic for HPBar
    }

    display() {
        this.displayIcon();
        this.displayGauge();
    }

    displayIcon() {
        let x_, y_;
        if (this.player.id === 0) {
            x_ = this.x - this.width_ / 2 - 30;
        } else {
            x_ = this.x + this.width_ / 2 + 30;
        }
        y_ = this.y;
        image(playerImage[this.player.id][0], x_, y_, this.height_ * 2, this.height_, 0, 0, this.player.width_, this.player.width_ / 2);
    }

    displayGauge() {
        fill(255);
        stroke(0);
        rect(this.x - this.width_ / 2, this.y - this.height_ / 2 - 1, this.width_ + 1, this.height_ + 1);
        const colorRate = 5;
        if (this.player.hp > 0) {
            for (let i = 0; i < this.height_; i++) {
                if (this.player.hp > 0.5) {
                    stroke(i * colorRate, i * colorRate, 255);
                } else if (this.player.hp > 0.25) {
                    stroke(255 - i * colorRate, 255 - i * colorRate, 0);
                } else {
                    stroke(255 - i * colorRate, 0, 0);
                }
                line(this.x - this.width_ / 2, this.y - this.height_ / 2 + i, this.x - this.width_ / 2 + this.width_ * this.player.hp, this.y - this.height_ / 2 + i);
            }
        }
        noStroke();
    }
}
