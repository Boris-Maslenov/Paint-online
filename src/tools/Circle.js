import Tool from './Tool';

class Circle extends Tool {
    constructor(canvas, socket, id){
        super(canvas, socket, id);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler;
        this.canvas.onmousedown = this.mouseDownHandler;
        this.canvas.onmouseup = this.mouseUpHandler;
    }

    draw(x, y, w) {
        const img = document.createElement('img');
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // полная очистка канваса
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height); // вернем старые рисунки на канвас
            this.ctx.beginPath();
            this.ctx.arc(x, y, w, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
    }

    static staticDraw(ctx, x, y, w, color, width) {
        const rectOptions = Tool.setOptions(ctx);
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.arc(x, y, w, 0, 2 * Math.PI);
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
                type: 'circle',
                x: this.startX,
                y: this.startY,
                w: this.width,
                color: this.ctx.strokeStyle,
                width: this.ctx.lineWidth,
            }
        }));

    }

    mouseDownHandler = (e) => {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.startX = e.pageX - e.target.offsetLeft; //начальное положение по горизонту
        this.startY = e.pageY - e.target.offsetTop; //начальное положение по вертикали
        this.saved = this.canvas.toDataURL(); // снимок предыдущего рисования
    }
    
    mouseMoveHandler = (e) => {
        if(this.mouseDown){
            let currentX = e.pageX - e.target.offsetLeft; // текущее положение по горизонту
            let currentY = e.pageY - e.target.offsetTop; // текущее положение по вертикали
            this.width = currentX - this.startX;  // текущее положение - стартовое = ширина
            let height = currentY - this.startY; // текущее положение - стартовое = высота
            this.draw(this.startX,  this.startY, this.width, height);
        }
    }
}

export default Circle;