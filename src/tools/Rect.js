import Tool from "./Tool";

class Rect extends Tool{
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler;
        this.canvas.onmousedown = this.mouseDownHandler;
        this.canvas.onmouseup = this.mouseUpHandler;
    }

    draw(x, y, w, h) {
        const img = document.createElement('img');
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // полная очистка канваса
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height); // вернем старые рисунки на канвас
            this.ctx.beginPath();
            this.ctx.rect(x, y, w, h);
            this.ctx.fill();
            this.ctx.stroke();
        }
    }

    static staticDraw(ctx, x, y, w, h, color){
        const rectOptions = Tool.setOptions(ctx);
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        Tool.getOptions(ctx, rectOptions);
    }


    mouseUpHandler = (e) => {
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'rect',
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
                color: this.ctx.fillStyle
            }
        }));
    }

    mouseDownHandler = (e) => {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = this.canvas.toDataURL();
    }
    
    mouseMoveHandler = (e) => {
        if(this.mouseDown){
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            this.draw(this.startX,  this.startY, this.width, this.height);
        }
    }
}

export default Rect;