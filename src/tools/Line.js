export class Line {

    static draw({ figure, saved}, canvas) {
        const ctx = canvas.getContext('2d');
        if(figure.type === 'FINISH') ctx.beginPath();
        ctx.fillStyle = figure.color;
        ctx.strokeStyle = figure.color;
        ctx.lineWidth = figure.width;

        const img = new Image();
        img.src = saved;
        img.onload = () => {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(figure.currentX, figure.currentY );
            ctx.lineTo(figure.startX, figure.startY );
            ctx.stroke();
         }

    }

}