export class Rect {
    static draw({ctx, figure, saved, canvas}) {
        ctx.strokeStyle = figure.color;
        ctx.fillStyle = figure.color;
        ctx.lineWidth = figure.width;
        const img = document.createElement('img');
        img.src = saved;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.rect(figure.startX, figure.startY, figure.currentX - figure.startX, figure.currentY - figure.startY);
            ctx.fill();
            ctx.stroke();
        }
    }
}