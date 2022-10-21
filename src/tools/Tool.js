export class Tool {
    constructor(canvas, color, width, x, y){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.beginPath();
        this.x = x;
        this.y = y;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
    }

}