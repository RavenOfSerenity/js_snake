

var ColourTransformer = function (src,dst,rate) {
    this.src = src;
    this.dst = dst;
    this.rate = rate;
    this.init();
    this.bidirectional = false;
}

ColourTransformer.prototype.init = function () {
    this.curr = new Colour(this.src.red, this.src.green, this.src.blue);
    this.redVariance = this.getVariance(this.src.red, this.dst.red, this.rate);
    this.greenVariance = this.getVariance(this.src.green, this.dst.green, this.rate);
    this.blueVariance = this.getVariance(this.src.blue, this.dst.blue, this.rate);
}

ColourTransformer.prototype.getVariance = function (srcValue,dstValue,rate) {
    return (dstValue - srcValue) / rate;
}


ColourTransformer.prototype.areEqual = function (v1,v2) {
    return Math.floor(v1) == v2;
}

ColourTransformer.prototype.isFinished = function () {
    return this.areEqual(this.curr.red, this.dst.red) &&
	this.areEqual(this.curr.green, this.dst.green) &&
	this.areEqual(this.curr.blue, this.dst.blue);
}

ColourTransformer.prototype.getNewTickValue = function (srcValue,dstValue,variance) {
    if( Math.floor(srcValue) != dstValue )
	srcValue = Math.abs(srcValue + variance);
    return srcValue;
}

ColourTransformer.prototype.tick = function () {
    if( this.bidirectional && this.isFinished() ) {
	console.log("lol");
	var tmp = this.dst;
	this.dst = this.src;
	this.src = tmp;
	this.init();
    }
    this.curr.red = this.getNewTickValue(this.curr.red,this.dst.red,this.redVariance);
    this.curr.green = this.getNewTickValue(this.curr.green,this.dst.green,this.greenVariance);
    this.curr.blue = this.getNewTickValue(this.curr.blue,this.dst.blue,this.blueVariance);
}

ColourTransformer.prototype.reset = function () {
    this.curr.set(this.src);
}

ColourTransformer.prototype.finalState = function () {
    this.curr.set(this.dst);
}

