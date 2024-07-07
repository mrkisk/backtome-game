class Player extends GameObject {
    constructor(game, id, mode, x, y) {
        super();
        this.game = game;
        this.id = id;
        this.mode = mode;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.hp = 1;
        this.setParameter();
        this.width_ = playerImage[id][0].width;
        this.height_ = playerImage[id][0].height;
        this.onGround = false;
    }

    setParameter() {
        this.UP = parameters["Player" + (this.id + 1) + "UP"];
        this.DOWN = parameters["Player" + (this.id + 1) + "DOWN"];
        this.LEFT = parameters["Player" + (this.id + 1) + "LEFT"];
        this.RIGHT = parameters["Player" + (this.id + 1) + "RIGHT"];
        this.SHOOT = parameters["Player" + (this.id + 1) + "SHOOT"];
        this.SPEED = parameters["Speed"];
        this.JUMPSPEED = parameters["JumpSpeed"];
        this.GRAVITY = parameters["Gravity"];
        this.SPECIALJUMPRATE = parameters["SpecialJumpRate"];
        this.SPECIALDAMAGE = parameters["SpecialDamage"];
    }

    update() {
        this.setVelocity();
        this.setPosition();
        this.specialDamage();
        this.shoot();
    }

    display() {
        let imageid = (this.vx === 0) ? 0 : this.onGround ? 1 : 2;
        translate(this.x, this.y);
        let flip = (this.vx < 0);
        if (flip) {
            push();
            scale(-1, 1);
        }
        image(playerImage[this.id][imageid], 0, 0);
        if (flip) {
            pop();
        }
        translate(-this.x, -this.y);
    }

    setMode(mode) {
        this.mode = mode;
    }

    setVelocity() {
        if (this.mode === 0) {
            this.setVelocityMode0();
        } else if (this.mode === 1) {
            this.setVelocityMode1();
        }
    }

    setVelocityMode0() {
        if (!this.onGround) {
            this.vy += this.GRAVITY;
        }
        if (keyboard[this.LEFT] && !keyboard[this.RIGHT]) {
            this.vx = -this.SPEED;
        } else if (!keyboard[this.LEFT] && keyboard[this.RIGHT]) {
            this.vx = this.SPEED;
        } else {
            this.vx = 0;
        }
        if (keyboard[this.UP] && this.onGround) {
            this.onGround = false;
            this.vy = -this.JUMPSPEED;
        }
    }

    setVelocityMode1() {
        if (!this.onGround) {
            this.vy += this.GRAVITY;
        }
        if (keyboard[this.LEFT] && !keyboard[this.RIGHT]) {
            this.vx = -this.SPEED;
        } else if (!keyboard[this.LEFT] && keyboard[this.RIGHT]) {
            this.vx = this.SPEED;
        } else {
            this.vx = 0;
        }
        if (keyboard[this.UP]) {
            this.onGround = false;
            this.vy -= this.JUMPSPEED * this.SPECIALJUMPRATE;
        }
        if (this.vy < -this.JUMPSPEED) {
            this.vy = -this.JUMPSPEED;
        }
    }

    setPosition() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < this.width_ / 2 || this.x > width - this.width_ / 2) {
            this.vx = 0;
        }
        this.x = constrain(this.x, this.width_ / 2, width - this.width_ / 2);
        if (this.y > GROUNDHEIGHT - this.height_ / 2) {
            this.y = GROUNDHEIGHT - this.height_ / 2;
            this.vy = 0;
            this.onGround = true;
        } else if (this.y < this.height_ / 2) {
            this.y = this.height_ / 2;
            this.vy = 3; // 後で修正
        }
    }

    specialDamage() {
        if (this.mode === 1 && this.onGround) {
            this.damage(this.SPECIALDAMAGE);
        }
    }

    shoot() {
        let dir = -1;
        if (keyboard[this.LEFT] && !keyboard[this.UP] && !keyboard[this.RIGHT] && !keyboard[this.DOWN]) {
            dir = 0;
        } else if (!keyboard[this.LEFT] && keyboard[this.UP] && !keyboard[this.RIGHT] && !keyboard[this.DOWN]) {
            dir = 1;
        } else if (!keyboard[this.LEFT] && !keyboard[this.UP] && keyboard[this.RIGHT] && !keyboard[this.DOWN]) {
            dir = 2;
        } else if (!keyboard[this.LEFT] && !keyboard[this.UP] && !keyboard[this.RIGHT] && keyboard[this.DOWN]) {
            dir = 3;
        }
        if (dir !== -1 && keyboardd[this.SHOOT]) {
            this.game.addBullet(this.id, this.x + this.width_ * dx4[dir] / 2, this.y + this.height_ * dy4[dir] / 2, dir);
        }
    }

    damage(power) {
        this.hp -= power;
        if (this.hp < 0) {
            this.hp = 0;
            this.game.setWinner(1 - this.id);
        }
    }
}
