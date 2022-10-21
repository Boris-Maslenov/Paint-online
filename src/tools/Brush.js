import {Tool} from "./Tool";

export class Brush {

    static draw({ctx, figure}) {
        console.log(figure);
        ctx.strokeStyle = figure.color;
        ctx.lineWidth = figure.width;
        ctx.lineTo(figure.currentX, figure.currentY);
        ctx.stroke();
    }

}