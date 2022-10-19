import {Tool} from "./Tool";

export class Brush extends Tool {

    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler;
        this.canvas.onmousedown = this.mouseDownHandler;
        this.canvas.onmouseup = this.mouseUpHandler;
    }


    static draw(ctx, x, y, color, width) {
        const rectOptions = Tool.setOptions(ctx);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineTo(x,y);
        ctx.stroke();
        Tool.getOptions(ctx, rectOptions);
    }

    mouseUpHandler = (e) => {
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'finish',
            }
        }));
    }
    mouseDownHandler = (e) => {
        this.mouseDown = true;
        // this.ctx.beginPath(); //начали рисовать линию
        // this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
    mouseMoveHandler = (e) => {
        if(this.mouseDown){
            // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'brush',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    color: this.ctx.strokeStyle,
                    width: this.ctx.lineWidth,
                }
            }));

        }
    }
}