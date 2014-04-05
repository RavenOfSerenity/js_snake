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

Segment.prototype.move = function () {
    switch(this.direction) {
    case DIRECTION.UP :
	this.y = this.y - 1;
	break;
    case DIRECTION.DOWN :
	this.y = this.y + 1;
	break;
    case DIRECTION.LEFT :
	this.x = this.x - 1;
	break;
    case DIRECTION.RIGHT :
	this.x = this.x + 1;
	break;
    }
}

