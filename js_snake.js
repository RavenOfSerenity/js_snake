var KEY = {};
KEY.UP = 38;
KEY.DOWN = 40;
KEY.LEFT = 37;
KEY.RIGHT = 39;

var Game = function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.defaultGridColour = COLOURS.YELLOW;
    this.defaultSnakeColour = COLOURS.BLUE;
    this.defaultFoodColour = 'red';
    this.snakeColours = [ 'blue','lime','mintcream','brown','fuchsia','turquoise'];
    this.snakeColourIndex = 0;
    this.width=25;
    this.height=25;
    this.grid = [];
    this.initGrid();
    this.rectangleSize=20;
    this.playerRectangle = { x:0,y:0 };
    this.canvas.setAttribute('tabindex','0');
    this.canvas.focus();
    this.cycle=0;
    this.period = 45;
    this.snakeSpeed = 4.5;
    this.snake = new Snake(this);
    this.food = new Segment(0,0);
    this.placeSegmentAtRandom(this.food);
    var instance = this;
    $("#"+canvasId).keydown( function(event) { instance.keyDown(event.keyCode); } );
    window.setTimeout( function  callBack() { window.setTimeout(callBack,30); instance.update(); } , this.period );
}


Game.prototype.initGrid = function () {
    for(var x  = 0; x < this.width; x++ ) {
	this.grid[x] = [];
	for(var y = 0; y < this.height; y++ ) {
	    this.grid[x][y] = new ColourTransformer(this.defaultSnakeColour,this.defaultGridColour,100);
	    this.grid[x][y].finalState();
	}
    }
}

Game.prototype.updateGrid = function () {
    for(var x  = 0; x < this.width; x++ ) {
	for(var y = 0; y < this.height; y++ ) {
	    this.grid[x][y].tick();
	}
    }
}

Game.prototype.isTicking = function (value) {
    return this.cycle % this.getRate(value) == 0;
}

Game.prototype.getRate = function(value) {
    return Math.floor(this.period / value);
}

Game.prototype.placeSegmentAtRandom = function (segment) {
    segment.x = Math.floor( Math.random() * this.width);
    segment.y = Math.floor( Math.random() * this.height);
}


Game.prototype.moveSnake = function () {
    if(this.isTicking(this.snakeSpeed) )
	this.snake.move();
}

Game.prototype.performFoodCollision = function () {
    if ( this.snake.itCollides(this.food) ) {
	this.snake.grow();
	this.placeSegmentAtRandom(this.food);
	this.snakeSpeed += 0.1;
    }
}

Game.prototype.drawSnake = function () {
    var segments = this.snake.segments;
    for(var i = 0; i < segments.length; i++ ) {
	this.drawRectangle( segments[i].x,segments[i].y,this.defaultSnakeColour.getCSS(),this.rectangleSize );
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
            this.drawRectangle(x, y, this.grid[x][y].curr.getCSS(), this.rectangleSize);
        }
    }
}

Game.prototype.animate = function () {
    if(this.cycle % 25 == 0) {
	this.snakeColourIndex = ( this.snakeColourIndex + 1) % this.snakeColours.length;
    }
}

Game.prototype.trailEffect = function () {
    var tail = this.snake.getTail();
    this.grid[tail.x][tail.y].reset();
}

Game.prototype.update = function () {
    this.cycle++;
    this.trailEffect();
    this.updateGrid();
    //this.animate();
    this.moveSnake();
    this.performFoodCollision();
    this.drawGrid();
    this.drawSnake();
    this.drawRectangle( this.food.x , this.food.y , this.defaultFoodColour , this.rectangleSize );
}

Game.prototype.keyDown = function (keyCode) {
    var lastSegment = this.snake.getHead();
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

