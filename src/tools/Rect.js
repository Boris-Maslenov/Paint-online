export class Rect {
    static draw({figure, saved}, canvas) {
        const ctx = canvas.getContext('2d');
        if(figure.type === 'FINISH') ctx.beginPath();
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