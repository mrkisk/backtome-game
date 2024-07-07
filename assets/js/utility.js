class PingPong extends GameObject {
    constructor(initialValue, speed) {
        super();
        this.value = initialValue;
        this.speed = speed;
        this.increasing = true;
    }

    update() {
        if (this.increasing) {
            this.value += this.speed;
            if (this.value >= 1) {
                this.value = 2 - this.value;
                this.increasing = false;
            }
        } else {
            this.value -= this.speed;
            if (this.value <= 0) {
                this.value = -this.value;
                this.increasing = true;
            }
        }
    }

    display() {
        // display logic if any
    }

    get() {
        return this.value;
    }
}

class Timer extends GameObject {
    constructor(time) {
        super();
        this.time = time;
        this.maxTime = time;
    }

    update() {
        if (this.time > 0) this.time--;
    }

    display() {
        // display logic if any
    }

    isFinished() {
        return this.time <= 0;
    }

    getTime() {
        return this.time;
    }

    reset() {
        this.time = this.maxTime;
    }

    getMaxTime() {
        return this.maxTime;
    }
}

