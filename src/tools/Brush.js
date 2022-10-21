import {Tool} from "./Tool";

export class Brush {

    static draw({ctx, figure}) {
        ctx.strokeStyle = figure.color;
        ctx.lineWidth = figure.width;
        ctx.lineTo(figure.currentX, figure.currentY);
        ctx.stroke();
    }

}