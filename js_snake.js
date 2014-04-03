var KEY = {};
KEY.UP = 38;
KEY.DOWN = 40;
KEY.LEFT = 37;
KEY.RIGHT = 39;

var DIRECTION = {};
DIRECTION.UP = 1;
DIRECTION.DOWN = 2;
DIRECTION.LEFT = 3;
DIRECTION.RIGHT = 4;

var Segment = function(x,y) {
    this.x=x;
    this.y=y;
    this.direction = null;
}


Segment.prototype.getOppositeDirection = function (direction) {
    switch(this.direction) {
    case DIRECTION.UP :
	return DIRECTION.DOWN;
    case DIRECTION.DOWN :
	return DIRECTION.UP;
    case DIRECTION.LEFT :
	return DIRECTION.RIGHT;
    case DIRECTION.RIGHT :
	return DIRECTION.LEFT;
    }

}


Segment.prototype.requestMove = function (direction) {
    if ( direction != this.getOppositeDirection(this.direction) )
	 this.direction = direction;
}

Segment.prototype.move = function (width, height ) {
    switch(this.direction) {
    case DIRECTION.UP :
	this.y = ( this.y - 1) % height;
	break;
    case DIRECTION.DOWN :
	this.y = ( this.y + 1 ) % height;
	break;
    case DIRECTION.LEFT :
	this.x = ( this.x - 1 ) % width;
	break;
    case DIRECTION.RIGHT :
	this.x = ( this.x + 1 ) % width;
	break;
    }
    if( this.x < 0 )
	this.x = width + this.x;
    if( this.y < 0 )
	this.y = height + this.y;
}

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
    this.segments = [];
    this.initSegments();
    var instance = this;
    $("#"+canvasId).keydown( function(event) { instance.keyDown(event.keyCode); } );
    window.setTimeout( function  callBack() { window.setTimeout(callBack,30); instance.update(); } , 30 );
}

Game.prototype.initSegments = function () {
    for(var i = 0; i < 3; i ++ ) {
	this.segments.push( new Segment(12 - i , 12) );
	this.segments[i].direction = DIRECTION.RIGHT;
    }
}


Game.prototype.moveSnake = function () {
    if( this.cycle % 10 == 0 ) {
	for( var i = 0; i < this.segments.length; i++ ) {
	    this.segments[i].move( this.width , this.height );
	}
	for( var i = this.segments.length - 1; i > 0; i-- ) {
	    this.segments[i].direction = this.segments[ i - 1 ].direction;
	}
    }
}

Game.prototype.drawSnake = function () {
    for(var i = 0; i < this.segments.length; i++ ) {
	this.drawRectangle( this.segments[i].x , this.segments[i].y , this.snakeColors[this.snakeColorIndex] , this.rectangleSize );
    }
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
    if(this.cycle % 25 == 0) {
	this.snakeColorIndex = ( this.snakeColorIndex + 1) % this.snakeColors.length;
    }
}

Game.prototype.update = function () {
    this.cycle++;
    this.animate();
    this.moveSnake();
    this.drawGrid();
    this.drawSnake();
}

Game.prototype.keyDown = function (keyCode) {
    switch(keyCode) {
    case KEY.UP:
	this.segments[0].requestMove(DIRECTION.UP);
    case KEY.DOWN:
	this.segments[0].requestMove(DIRECTION.DOWN);
	break;
    case KEY.LEFT:
	this.segments[0].requestMove(DIRECTION.LEFT);
	break;
    case KEY.RIGHT:	
	this.segments[0].requestMove(DIRECTION.RIGHT);
	break;
    }
}

