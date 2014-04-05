

var ColourTransformer = function (src,dst,rate) {
    this.src = src;
    this.dst = dst;
    this.curr = new Colour(0,0,0);
    this.redVariance = this.getVariance(src.red,dst.red,rate);
    this.greenVariance = this.getVariance(src.green,dst.green,rate);
    this.blueVariance = this.getVariance(src.blue,dst.blue,rate);
}

ColourTransformer.prototype.getVariance = function (srcValue,dstValue,rate) {
    return (dstValue - srcValue) / rate;
}

ColourTransformer.prototype.getNewTickValue = function (srcValue,dstValue,variance) {
    if( Math.floor(srcValue) != dstValue )
	srcValue = Math.abs(srcValue + variance);
    return srcValue;
}

ColourTransformer.prototype.tick = function () {
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

