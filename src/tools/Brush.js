import Tool from "./Tool";

class Brush extends Tool{

    constructor(canvas) {
        super(canvas);
        this.listen();
    }

    listen() {
        // this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        // this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        // this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler;
        this.canvas.onmousedown = this.mouseDownHandler;
        this.canvas.onmouseup = this.mouseUpHandler;
    }

    draw(x,y) {
        this.ctx.lineTo(x,y);
        this.ctx.strokeStyle = 'black';
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