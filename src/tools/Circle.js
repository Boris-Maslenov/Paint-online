import Tool from './Tool';

class Circle extends Tool {
    constructor(canvas){
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
        console.log('sds');
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // полная очистка канваса
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height); // вернем старые рисунки на канвас
            this.ctx.beginPath();
            this.ctx.arc(x, y, w, 0, 2 * Math.PI);
            this.ctx.stroke();
        }

    }

    mouseUpHandler = (e) => {
        console.log('mouseUpHandler');
        this.mouseDown = false;
    }

    mouseDownHandler = (e) => {
        console.log('mouseDownHandler');
        this.mouseDown = true;
        this.ctx.beginPath();
        this.startX = e.pageX - e.target.offsetLeft; //начальное положение по горизонту
        this.startY = e.pageY - e.target.offsetTop; //начальное положение по вертикали
        this.saved = this.canvas.toDataURL(); // снимок предыдущего рисования
    }
    mouseMoveHandler = (e) => {
        if(this.mouseDown){
            console.log('mouseMoveHandler');
            let currentX = e.pageX - e.target.offsetLeft; // текущее положение по горизонту
            let currentY = e.pageY - e.target.offsetTop; // текущее положение по вертикали
            let width = currentX - this.startX;  // текущее положение - стартовое = ширина
            let height = currentY - this.startY; // текущее положение - стартовое = высота
            this.draw(this.startX,  this.startY, width, height);
        }
    }
}

export default Circle;