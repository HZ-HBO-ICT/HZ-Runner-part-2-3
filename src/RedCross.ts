/// <reference path="ScoringObject.ts" />

class RedCross extends ScoringObject {

    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.image = this.loadNewImage("assets/img/objects/tilted_cross.png");
        this.points = -5;
    }
}
