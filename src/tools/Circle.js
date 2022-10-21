export class Circle {

        static draw( {figure, saved}, canvas ) {
            const ctx = canvas.getContext('2d');
            if(figure.type === 'FINISH') ctx.beginPath();
            ctx.fillStyle = figure.color;
            ctx.strokeStyle = figure.color;
            ctx.lineWidth = figure.width;
            const img = document.createElement('img');
            img.src = saved;
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                ctx.beginPath();
                ctx.arc(figure.startX, figure.startY, Math.abs(figure.currentX - figure.startX), 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
            }
        }
}