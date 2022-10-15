class Tool {
    constructor(canvas, socket, id){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.socket = socket;
        this.id = id;
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