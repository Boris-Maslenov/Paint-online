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

    // static setOptions = (ctx) => {
    //     return  {
    //                 color: ctx.strokeStyle,
    //                 style: ctx.lineWidth,
    //             }
    // }

    // static getOptions = (ctx, options) => {
    //     ctx.strokeStyle = options.color;
    //     ctx.lineWidth = options.weight;
    // }

}

export default Tool;