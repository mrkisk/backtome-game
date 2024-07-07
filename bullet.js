class Bullet extends GameObject {
    constructor(playerId, x, y, dir) {
        super();
        this.setParameters();
        this.playerId = playerId;
        this.x = x + dx4[dir] * this.RADIUS;
        this.y = y + dy4[dir] * this.RADIUS;
        this.dir = dir;
        this.speed = this.SPEED;
    }

    setParameters() {
        this.RADIUS = parameters["BulletRadius"];
        this.SPEED = parameters["BulletSpeed"];
        this.ACCEL = parameters["BulletAccel"];
        this.POWER = parameters["BulletPower"];
    }

    update() {
        this.speed -= this.ACCEL;
        this.x += dx4[this.dir] * this.speed;
        this.y += dy4[this.dir] * this.speed;
        this.checkOutOfScreen();
    }

    display() {
        stroke(0);
        if (this.playerId === 0) {
            fill(0, 0, 0);
        } else {
            fill(0, 255, 0);
        }
        ellipse(this.x, this.y, this.RADIUS * 2, this.RADIUS * 2);
        noStroke();
    }

    isColliding(player) {
        if (!this.getActive()) return false;
        let closestX = constrain(this.x, player.x - player.width_ / 2, player.x + player.width_ / 2);
        let closestY = constrain(this.y, player.y - player.height_ / 2, player.y + player.height_ / 2);
        return (this.x - closestX) * (this.x - closestX) + (this.y - closestY) * (this.y - closestY) < this.RADIUS * this.RADIUS;
    }

    isCollidingBullet(bullet) {
        if (!this.getActive() || !bullet.getActive()) return false;
        return (this.x - bullet.x) * (this.x - bullet.x) + (this.y - bullet.y) * (this.y - bullet.y) < this.RADIUS * this.RADIUS * 4;
    }

    checkOutOfScreen() {
        if (this.x < -width || this.x > width * 2 || this.y < -height || this.y > height * 2) {
            this.setActive(false);
        }
    }
}
