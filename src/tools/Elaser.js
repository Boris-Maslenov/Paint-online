import Tool from './Tool';
import Brush from './Brush';

class Elaser extends  Brush {
    constructor(canvas, socket, id){
        super(canvas, socket, id);  
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler;
        this.canvas.onmousedown = this.mouseDownHandler;
        this.canvas.onmouseup = this.mouseUpHandler;
    }

    // draw = (x,y) => {
    //     this.ctx.strokeStyle = 'white';
    //     this.ctx.lineTo(x,y);
    //     this.ctx.stroke();
    // }

    static draw(ctx, x,y, width) {
        const rectOptions = Tool.setOptions(ctx);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = width;
        ctx.lineTo(x,y);
        ctx.stroke();
        Tool.getOptions(ctx, rectOptions);
    }

    mouseMoveHandler = (e) => {
        if(this.mouseDown){
            // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'elaser',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    width: this.ctx.lineWidth,
                }
            }));

        }
    }

}

export default Elaser;