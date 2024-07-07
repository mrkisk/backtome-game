let keyboard = new Array(525).fill(false);
let keyboardd = new Array(525).fill(false);
let keyboardTmp = new Array(525).fill(false);

function keyPressed() {
    if (keyCode < keyboard.length) {
        keyboard[keyCode] = true;
    }
}

function keyReleased() {
    if (keyCode < keyboard.length) {
        keyboard[keyCode] = false;
    }
}

function keyboardCheckOnDraw() {
    for (let i = 0; i < keyboard.length; i++) {
        keyboardd[i] = false;
        if (keyboardTmp[i] && keyboard[i]) {
            keyboardd[i] = true;
            keyboardTmp[i] = false;
        }
        if (!keyboard[i]) {
            keyboardTmp[i] = true;
        }
    }
}
