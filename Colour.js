var COLOURS = {}

var Colour = function(red,green,blue) {
    this.red = red;
    this.green = green;	
    this.blue = blue;
}

COLOURS.RED = new Colour(255,0,0);
COLOURS.GREEN = new Colour(0,255,0);
COLOURS.BLUE = new Colour(0,0,255);
COLOURS.YELLOW = new Colour(255,255,0);
COLOURS.ORANGE = new Colour(255,70,0);

Colour.prototype.clone = function(colour) {
    return new Colour(colour.red,colour.green,colour.blue);
}

Colour.prototype.set = function(colour) {
    this.red = colour.red;
    this.green = colour.green;
    this.blue = colour.blue;
}

Colour.prototype.getCSS = function () {
    return "rgb(" + Math.floor(this.red) + "," + Math.floor(this.green) + "," + Math.floor(this.blue) + ")";
}