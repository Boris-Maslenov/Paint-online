import {Tool} from "./Tool";

export class Line extends Tool {
    constructor(canvas, socket, id){
        super(canvas, socket, id);
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

    static staticDraw = (ctx, x, y, cx, cy, color, width) => {
        const rectOptions = Tool.setOptions(ctx);
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.beginPath();
            ctx.moveTo(cx, cy );
            ctx.lineTo(x, y);
            ctx.stroke(); 
            Tool.getOptions(ctx, rectOptions);
    }

    mouseUpHandler = (e) => {
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'line',
                x: e.pageX - e.target.offsetLeft,
                y: e.pageY - e.target.offsetTop,
                currentX: this.currentX,
                currentY: this.currentY,
                color: this.ctx.fillStyle,
                width: this.ctx.lineWidth,
            }
        }));
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