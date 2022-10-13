import Tool from "./Tool";

class Rect extends Tool{

    constructor(canvas) {
        super(canvas);
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

    mouseUpHandler = (e) => {
        this.mouseDown = false;
    }

    mouseDownHandler = (e) => {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = this.canvas.toDataURL(); // снимок предыдущего рисования
        //console.log(this.saved);
    }
    mouseMoveHandler = (e) => {
        if(this.mouseDown){
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            let width = currentX - this.startX;
            let height = currentY - this.startY;
            this.draw(this.startX,  this.startY, width, height);
        }
    }
}

export default Rect;