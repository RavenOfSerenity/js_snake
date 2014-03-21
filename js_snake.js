var KEY = {};
KEY.UP = 38;
KEY.DOWN = 40;
KEY.LEFT = 37;
KEY.RIGHT = 39;

var Game = function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.defaultGridColor = 'yellow';
    this.defaultSnakeColor = 'blue';
    this.snakeColors = [ 'blue','lime','mintcream','brown','fuchsia','turquoise'];
    this.snakeColorIndex = 0;
    this.width=25;
    this.height=25;
    this.rectangleSize=20;
    this.playerRectangle = { x:0,y:0 };
    this.canvas.setAttribute('tabindex','0');
    this.canvas.focus();
    this.cycle=0;
    var instance = this;
    $("#"+canvasId).keydown( function(event) { instance.keyDown(event.keyCode); } );
    window.setTimeout( function  callBack() { window.setTimeout(callBack,30); instance.update(); } , 30 );
}

Game.prototype.drawRectangle = function (x, y, fillColor, size) {
    this.ctx.beginPath();
    this.ctx.rect(x * size, y * size, size, size);
    this.ctx.fillStyle = fillColor;
    this.ctx.fill();
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = 'black'
    this.ctx.stroke();
}

Game.prototype.drawGrid = function () {
    for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
            this.drawRectangle(x, y, this.defaultGridColor, this.rectangleSize);
        }
    }
}

Game.prototype.animate = function () {
    this.cycle++;
    if(this.cycle >= 50) {
	this.cycle = 0;
	this.snakeColorIndex = ( this.snakeColorIndex + 1) % this.snakeColors.length;
    }
}

Game.prototype.update = function () {
    this.animate();
    this.drawGrid();
    this.drawRectangle(this.playerRectangle.x,this.playerRectangle.y,this.snakeColors[this.snakeColorIndex],this.rectangleSize);
}

Game.prototype.keyDown = function (keyCode) {
    switch(keyCode){
    case KEY.UP:
	this.playerRectangle.y -= 1;
	break;
    case KEY.DOWN:
	this.playerRectangle.y += 1;
	break;
    case KEY.LEFT:
	this.playerRectangle.x -=1;
	break;
    case KEY.RIGHT:
	this.playerRectangle.x +=1;
	break;
    }
    this.playerRectangle.x %= this.width;
    this.playerRectangle.y %= this.height;
    if(this.playerRectangle.x < 0)
	this.playerRectangle.x = this.width + this.playerRectangle.x;
    if(this.playerRectangle.y < 0)
	this.playerRectangle.y = this.height + this.playerRectangle.y;
}

