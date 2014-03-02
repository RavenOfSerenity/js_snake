var canvas;
var ctx;
var defaultGridColor = 'yellow';
var defaultSnakeColor = 'blue';


function setCanvas(canvasId) {
    canvas = document.getElementById(canvasId);
    ctx = canvas.getContext("2d")
}

function drawRectangle(ctx, x, y, fillColor, size) {
    ctx.beginPath();
    ctx.rect(x * size, y * size, size, size);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black'
    ctx.stroke();
}

function drawGrid() {

    for (var x = 0; x < 25; x++) {
        for (var y = 0; y < 25; y++) {
            drawRectangle(ctx, x, y, 'yellow', 20);
        }
    }
}

function update(){
	drawGrid();
}

