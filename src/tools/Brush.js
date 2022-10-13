import Tool from "./Tool";

class Brush extends Tool{

    constructor(canvas) {
        super(canvas);
        // this.ctx.strokeStyle = color;
        // this.ctx.fillStyle = color;
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler;
        this.canvas.onmousedown = this.mouseDownHandler;
        this.canvas.onmouseup = this.mouseUpHandler;
    }

    draw(x,y) {
        this.ctx.lineTo(x,y);
        //this.ctx.strokeStyle = 'black';
        // console.log(this.ctx.strokeStyle, this.ctx.fillStyle);
        this.ctx.stroke();
    }

    mouseUpHandler = (e) => {
        this.mouseDown = false;
    }
    mouseDownHandler = (e) => {
        this.mouseDown = true;
        this.ctx.beginPath(); //начали рисовать линию
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
    mouseMoveHandler = (e) => {
        if(this.mouseDown){
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
        }
    }
}

export default Brush;