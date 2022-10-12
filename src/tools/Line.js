
// import Brush from "./Brush";
import Tool from "./Tool";

class Line extends Tool {

    constructor(canvas){
        super(canvas);
        this.listen();
    }

    listen = () => {
        this.canvas.onmousemove = this.mouseMoveHandler;
        this.canvas.onmousedown = this.mouseDownHandler;
        this.canvas.onmouseup = this.mouseUpHandler;
    }

    draw = (x,y) => {
        const img = new Image();
        img.src = this.saved;
             img.onload = () => {
                this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
                this.ctx.beginPath();
                this.ctx.moveTo(this.currentX, this.currentY );
                this.ctx.lineTo(x, y);
                this.ctx.stroke();
             }
    }

    mouseUpHandler = (e) => {
        this.mouseDown = false;
    }

    mouseDownHandler = (e) => {
        this.mouseDown = true;
        this.currentX = e.pageX - e.target.offsetLeft;
        this.currentY = e.pageY - e.target.offsetTop;
        this.ctx.beginPath();
        this.ctx.moveTo(this.currentX, this.currentY );
        this.saved = this.canvas.toDataURL();
    }

    mouseMoveHandler = (e) => {
        if (this.mouseDown) {
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
        }
    }

}

export default Line;