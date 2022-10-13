class Tool {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.deleteEvents();
    }

    set setFillColor(color){
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
    }

    set setWidth(width){
        this.ctx.lineWidth = width;
    }

    deleteEvents = () => {
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
    }

}

export default Tool;