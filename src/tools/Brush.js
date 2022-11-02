export class Brush {
    static draw({figure}, canvas) {
        const ctx = canvas.getContext('2d');
        if(figure.type === 'FINISH') ctx.beginPath();
        ctx.strokeStyle = figure.color;
        ctx.lineWidth = figure.width;
        ctx.lineTo(figure.currentX, figure.currentY);
        ctx.stroke();
    }

}