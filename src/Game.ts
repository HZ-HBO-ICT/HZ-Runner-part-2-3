class Game {

    // The canvas
    private canvas: HTMLCanvasElement;

    // The player on the canvas
    private player: Player;

    // The objects on the canvas
    private scoringObjects: ScoringObject[];

    // Score
    private totalScore: number;

    // Current frame number
    private frameIndex: number;

    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;

        // Resize the canvas so it looks more like a Runner game
        this.canvas.width = window.innerWidth / 3;
        this.canvas.height = window.innerHeight;

        // Create scoring objects
        this.scoringObjects = [];
        this.createRandomScoringObject();

        // Set the player at the center
        this.player = new Player(this.canvas);

        // Score is zero at start
        this.totalScore = 0;

        // So is frameIndex
        this.frameIndex = 0;

        // Start the animation
        console.log('start animation');
        requestAnimationFrame(this.step);
    }

    /**
     * This MUST be an arrow method in order to keep the `this` variable
     * working correctly. It will be overwritten by another object otherwise
     * caused by javascript scoping behaviour.
     */
    step = () => {

        this.frameIndex++;

        if (this.frameIndex % 100 === 0) {
            this.createRandomScoringObject();
        }

        this.player.move();

        // Could also be a regular for loop
        this.scoringObjects.forEach(scoringObject => {
            scoringObject.move();

            if (this.player.collidesWith(scoringObject)) {
                this.totalScore += scoringObject.getPoints();
                this.removeItemFromScoringObjects(scoringObject);
            } else if (scoringObject.collidesWithCanvasBottom()) {
                this.removeItemFromScoringObjects(scoringObject);
            }
        });

        this.draw();

        // Call this method again on the next animation frame
        // The user must hit F5 to reload the game
        requestAnimationFrame(this.step);
    }

    /**
     * Render the items on the canvas
     */
    private draw() {
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');
        // Clear the entire canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.writeTextToCanvas(ctx, "UP arrow = middle | LEFT arrow = left | RIGHT arrow = right", this.canvas.width / 2, 40, 14);

        this.drawScore(ctx);

        this.player.draw(ctx);

        // Could also be a regular for loop
        this.scoringObjects.forEach(scoringObject => {
            scoringObject.draw(ctx);
        });
    }

    /**
     * Draw the score on a canvas
     * @param ctx
     */
    private drawScore(ctx: CanvasRenderingContext2D): void {
        this.writeTextToCanvas(ctx, `Score: ${this.totalScore}`, this.canvas.width / 2, 80, 16);
    }

    /**
     * Create a random scoring object and clear the other scoring objects by setting them to `null`.
     */
    private createRandomScoringObject(): void {
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

    /**
   * Writes text to the canvas
   * @param {string} text - Text to write
   * @param {number} fontSize - Font size in pixels
   * @param {number} xCoordinate - Horizontal coordinate in pixels
   * @param {number} yCoordinate - Vertical coordinate in pixels
   * @param {string} alignment - Where to align the text
   * @param {string} color - The color of the text
   */
    public writeTextToCanvas(
        ctx: CanvasRenderingContext2D,
        text: string,
        xCoordinate: number,
        yCoordinate: number,
        fontSize: number = 20,
        color: string = "red",
        alignment: CanvasTextAlign = "center"
    ) {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }

    /**
    * Generates a random integer number between min and max
    *
    * @param {number} min - minimal time
    * @param {number} max - maximal time
    */
    private randomInteger(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    /**
     * Removes an item from the this.scoringObjects array.
     * Could also be written using a filter
     * @param item To be removed
     */
    private removeItemFromScoringObjects(item: ScoringObject): void {
        const index = this.scoringObjects.indexOf(item);
        this.scoringObjects.splice(index, 1);
    }
}
