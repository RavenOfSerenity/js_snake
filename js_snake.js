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
    this.segments = [];
    this.food = new Segment(0,0);
    this.placeSegmentAtRandom(this.food);
    this.initSegments();
    var instance = this;
    $("#"+canvasId).keydown( function(event) { instance.keyDown(event.keyCode); } );
    window.setTimeout( function  callBack() { window.setTimeout(callBack,30); instance.update(); } , 30 );
}

Game.prototype.initSegments = function () {
    for(var i = 0; i < 3; i ++ ) {
	this.segments.push( new Segment(12 + i , 12) );
	this.segments[i].direction = DIRECTION.RIGHT;
    }
}


Game.prototype.placeSegmentAtRandom = function (segment) {
    segment.x = Math.floor( Math.random() * this.width);
    segment.y = Math.floor( Math.random() * this.height);
}

Game.prototype.wrapSegment = function (segment) {
    segment.y = segment.y % this.height;
    if( segment.y < 0 )
	segment.y = segment.y + this.height;
    segment.x = segment.x % this.width;
    if( segment.x < 0 )
	segment.x = segment.x + this.width;

}

Game.prototype.moveSnake = function () {
    if( this.cycle % 10 == 0 ) {
	for( var i = this.segments.length - 1; i >= 0; i-- ) {
	    this.segments[i].move();
	    this.wrapSegment( this.segments[i] );
	}
	for( var i = 0; i < this.segments.length - 1; i++ ) {
	    this.segments[i].direction = this.segments[ i+1 ].direction;
	}
    }
}

Game.prototype.checkFoodCollision = function () {
    var lastSegment = this.segments[this.segments.length -1 ];
    if(lastSegment.x == this.food.x && lastSegment.y == this.food.y ) {
	var aSegment = new Segment(this.food.x , this.food.y);
	aSegment.direction = lastSegment.direction;
	aSegment.move(this.width , this.height);
	this.segments.push(aSegment);
	this.food = new Segment(0,0);
	this.placeSegmentAtRandom(this.food);
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
    this.checkFoodCollision();
    this.drawGrid();
    this.drawSnake();
    this.drawRectangle( this.food.x , this.food.y , this.snakeColors[this.snakeColorIndex] , this.rectangleSize );
}

Game.prototype.keyDown = function (keyCode) {
    var lastSegment = this.segments[this.segments.length-1];
    switch(keyCode) {
    case KEY.UP:
	lastSegment.requestMove(DIRECTION.UP);
    case KEY.DOWN:
	lastSegment.requestMove(DIRECTION.DOWN);
	break;
    case KEY.LEFT:
	lastSegment.requestMove(DIRECTION.LEFT);
	break;
    case KEY.RIGHT:	
	lastSegment.requestMove(DIRECTION.RIGHT);
	break;
    }
}

