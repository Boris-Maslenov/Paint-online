import Brush from './Brush';

class Elaser extends  Brush {

    constructor(canvas){
        super(canvas);
    }

    draw(x,y) {
        this.ctx.lineTo(x,y);
        this.ctx.strokeStyle = 'white';
        this.ctx.stroke();
    }

}

export default Elaser;