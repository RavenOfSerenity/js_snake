/* 
* Represents the snake
*
*/



var Snake = function( board ) {

    this.board = board;
    this.segments = [];
    this.initSegments();

}


Snake.prototype.initSegments = function () {
    for(var i = 0; i < 3; i ++ ) {
	this.segments.push( new Segment(12 + i , 12) );
	this.segments[i].direction = DIRECTION.RIGHT;
    }
}


Snake.prototype.wrapSegment = function (segment) {
    segment.y = segment.y % this.board.height;
    if( segment.y < 0 )
	segment.y = segment.y + this.board.height;
    segment.x = segment.x % this.board.width;
    if( segment.x < 0 )
	segment.x = segment.x + this.board.width;

}


Snake.prototype.move = function () {
    for( var i = this.segments.length - 1; i >= 0; i-- ) {
	this.segments[i].move();
	this.wrapSegment( this.segments[i] );
    }
    for( var i = 0; i < this.segments.length - 1; i++ )
	this.segments[i].direction = this.segments[ i+1 ].direction;  
}


Snake.prototype.getHead = function () {
    return this.segments[this.segments.length - 1];
}

Snake.prototype.getTail = function () {
    return this.segments[0];
}

Snake.prototype.itCollides = function (segment) { 
    var lastSegment = this.getHead();
    if(lastSegment.x == segment.x && lastSegment.y == segment.y )
	return true; 
    else
	return false;

}

Snake.prototype.getRandomDirection = function() {
    var nr = Math.floor( Math.random() * 4);
    return nr+1;
}

Snake.prototype.grow = function () {
    var lastSegment = this.getHead();
    var aSegment = new Segment(lastSegment.x , lastSegment.y);
    //aSegment.direction = this.getRandomDirection();
    aSegment.direction = lastSegment.direction;
    aSegment.move();
    this.wrapSegment(aSegment);
    this.segments.push(aSegment);
}
