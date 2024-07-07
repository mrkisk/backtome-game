class GameObject {
    constructor() {
        this.active = true;
        this.doUpdate = true;
        this.doDisplay = true;
    }

    update() {
        throw new Error("You have to implement the method update!");
    }

    display() {
        throw new Error("You have to implement the method display!");
    }

    setActive(active) {
        this.active = active;
    }

    getActive() {
        return this.active;
    }

    setDoUpdate(doUpdate) {
        this.doUpdate = doUpdate;
    }

    setDoDisplay(doDisplay) {
        this.doDisplay = doDisplay;
    }

    getDoUpdate() {
        return this.doUpdate;
    }

    getDoDisplay() {
        return this.doDisplay;
    }

    runUpdate() {
        if (this.active && this.doUpdate) {
            this.update();
        }
    }

    runDisplay() {
        if (this.active && this.doDisplay) {
            this.display();
        }
    }
}
