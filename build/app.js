class Game {
    constructor(canvas) {
        this.step = () => {
            this.frameIndex++;
            if (this.frameIndex % 100 === 0) {
                this.createRandomScoringObject();
            }
            this.player.move();
            this.scoringObjects.forEach(scoringObject => {
                scoringObject.move();
                if (this.player.collidesWith(scoringObject)) {
                    this.totalScore += scoringObject.getPoints();
                    this.removeItemFromScoringObjects(scoringObject);
                }
                else if (scoringObject.collidesWithCanvasBottom()) {
                    this.removeItemFromScoringObjects(scoringObject);
                }
            });
            this.draw();
            requestAnimationFrame(this.step);
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth / 3;
        this.canvas.height = window.innerHeight;
        this.scoringObjects = [];
        this.createRandomScoringObject();
        this.player = new Player(this.canvas);
        this.totalScore = 0;
        this.frameIndex = 0;
        console.log('start animation');
        requestAnimationFrame(this.step);
    }
    draw() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "UP arrow = middle | LEFT arrow = left | RIGHT arrow = right", this.canvas.width / 2, 40, 14);
        this.drawScore(ctx);
        this.player.draw(ctx);
        this.scoringObjects.forEach(scoringObject => {
            scoringObject.draw(ctx);
        });
    }
    drawScore(ctx) {
        this.writeTextToCanvas(ctx, `Score: ${this.totalScore}`, this.canvas.width / 2, 80, 16);
    }
    createRandomScoringObject() {
        const random = this.randomInteger(1, 4);
        if (random === 1) {
            this.scoringObjects.push(new GoldTrophy(this.canvas));
        }
        if (random === 2) {
            this.scoringObjects.push(new SilverTrophy(this.canvas));
        }
        if (random === 3) {
            this.scoringObjects.push(new RedCross(this.canvas));
        }
        if (random === 4) {
            this.scoringObjects.push(new LightningBolt(this.canvas));
        }
    }
    writeTextToCanvas(ctx, text, xCoordinate, yCoordinate, fontSize = 20, color = "red", alignment = "center") {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    removeItemFromScoringObjects(item) {
        const index = this.scoringObjects.indexOf(item);
        this.scoringObjects.splice(index, 1);
    }
}
class ScoringObject {
    constructor(canvas) {
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 4;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = this.canvas.width / 4 * 3;
        const random = this.randomInteger(1, 3);
        if (random === 1) {
            this.positionX = this.leftLane;
        }
        if (random === 2) {
            this.positionX = this.middleLane;
        }
        if (random === 3) {
            this.positionX = this.rightLane;
        }
        this.positionY = 60;
        this.speed = 5;
    }
    move() {
        this.positionY += this.speed;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.positionY);
    }
    collidesWithCanvasBottom() {
        if (this.positionY + this.image.height > this.canvas.height) {
            return true;
        }
        return false;
    }
    getPositionX() {
        return this.positionX;
    }
    getPositionY() {
        return this.positionY;
    }
    getImageWidth() {
        return this.image.width;
    }
    getImageHeight() {
        return this.image.height;
    }
    getPoints() {
        return this.points;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
class GoldTrophy extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/gold_trophy.png");
        this.points = 10;
    }
}
class KeyListener {
    constructor() {
        this.keyCodeStates = new Array();
        this.keyCodeTyped = new Array();
        this.previousState = new Array();
        window.addEventListener("keydown", (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        });
        window.addEventListener("keyup", (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        });
    }
    onFrameStart() {
        this.keyCodeTyped = new Array();
        this.keyCodeStates.forEach((val, key) => {
            if (this.previousState[key] != val && !this.keyCodeStates[key]) {
                this.keyCodeTyped[key] = true;
                this.previousState[key] = val;
            }
        });
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] == true;
    }
    isKeyTyped(keyCode) {
        return this.keyCodeTyped[keyCode] == true;
    }
}
KeyListener.KEY_ENTER = 13;
KeyListener.KEY_SHIFT = 16;
KeyListener.KEY_CTRL = 17;
KeyListener.KEY_ALT = 18;
KeyListener.KEY_ESC = 27;
KeyListener.KEY_SPACE = 32;
KeyListener.KEY_LEFT = 37;
KeyListener.KEY_UP = 38;
KeyListener.KEY_RIGHT = 39;
KeyListener.KEY_DOWN = 40;
KeyListener.KEY_DEL = 46;
KeyListener.KEY_1 = 49;
KeyListener.KEY_2 = 50;
KeyListener.KEY_3 = 51;
KeyListener.KEY_4 = 52;
KeyListener.KEY_5 = 53;
KeyListener.KEY_6 = 54;
KeyListener.KEY_7 = 55;
KeyListener.KEY_8 = 56;
KeyListener.KEY_9 = 57;
KeyListener.KEY_0 = 58;
KeyListener.KEY_A = 65;
KeyListener.KEY_B = 66;
KeyListener.KEY_C = 67;
KeyListener.KEY_D = 68;
KeyListener.KEY_E = 69;
KeyListener.KEY_F = 70;
KeyListener.KEY_G = 71;
KeyListener.KEY_H = 72;
KeyListener.KEY_I = 73;
KeyListener.KEY_J = 74;
KeyListener.KEY_K = 75;
KeyListener.KEY_L = 76;
KeyListener.KEY_M = 77;
KeyListener.KEY_N = 78;
KeyListener.KEY_O = 79;
KeyListener.KEY_P = 80;
KeyListener.KEY_Q = 81;
KeyListener.KEY_R = 82;
KeyListener.KEY_S = 83;
KeyListener.KEY_T = 84;
KeyListener.KEY_U = 85;
KeyListener.KEY_V = 86;
KeyListener.KEY_W = 87;
KeyListener.KEY_X = 88;
KeyListener.KEY_Y = 89;
KeyListener.KEY_Z = 90;
class LightningBolt extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/titled_yellow_power_icon.png");
        this.points = -10;
    }
}
class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 4;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = this.canvas.width / 4 * 3;
        this.keyListener = new KeyListener();
        this.image = this.loadNewImage("./assets/img/players/character_robot_walk0.png");
        this.positionX = this.canvas.width / 2;
    }
    move() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) && this.positionX !== this.leftLane) {
            this.positionX = this.leftLane;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_UP) && this.positionX !== this.middleLane) {
            this.positionX = this.middleLane;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) && this.positionX !== this.rightLane) {
            this.positionX = this.rightLane;
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.canvas.height - 150);
    }
    collidesWith(scoringObject) {
        if (this.positionX < scoringObject.getPositionX() + scoringObject.getImageWidth()
            && this.positionX + this.image.width > scoringObject.getPositionX()
            && this.canvas.height - 150 < scoringObject.getPositionY() + scoringObject.getImageHeight()
            && this.canvas.height - 150 + this.image.height > scoringObject.getPositionY()) {
            return true;
        }
        return false;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class RedCross extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/tilted_cross.png");
        this.points = -5;
    }
}
class SilverTrophy extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/silver_trophy.png");
        this.points = 5;
    }
}
console.log("Javascript is working!");
window.addEventListener('load', () => {
    console.log("Handling the Load event");
    const game = new Game(document.getElementById('canvas'));
});
//# sourceMappingURL=app.js.map