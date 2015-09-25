
var Treasure = function (grid, position) {

    this.id = 'treasure_object';
    this.grid = grid;
    this.x;
    this.y;
    this.gridPosX;
    this.gridPosY;
    this.founded = false;

    this.setPosition(position.x, position.y);
};

Treasure.prototype.onRestart = function() {
    this.founded = false;
};

Treasure.prototype.setPosition = function(gridPosX, gridPosY) {
	var gridData = this.grid.getPosition( gridPosX, gridPosY);
	this.x = gridData.x;
	this.y = gridData.y;
	this.gridPosX = gridPosX;
	this.gridPosY = gridPosY;
};

Treasure.prototype.found = function() {
	if(!this.founded)
		this.founded = true;
};

Treasure.prototype.getCurrentPosition = function() {
	return {x:this.x, y:this.y};
};

Treasure.prototype.getCurrentGridPosition = function() {
	return {posX:this.gridPosX, posY:this.gridPosY};
};

Treasure.prototype.update = function () {
};

Treasure.prototype.draw = function () {
	
	var size = 15,
		position = this.getCurrentPosition(),
		length = 25,
		x = position.x,
		y = position.y,
		crossX = position.y - length*.5,
		crossY = position.y - length*.5;

	if(this.founded) {
	    Global.ctx.save();
	    Global.ctx.translate(x, y);
	    Global.ctx.beginPath();
	    Global.ctx.arc(0,0,size,0,2*Math.PI);
	    Global.ctx.closePath();
		Global.ctx.fillStyle = "green"; 
	    Global.ctx.fill();
	    Global.ctx.restore();
	} else {
	    Global.ctx.save();
	    Global.ctx.beginPath();
	    Global.ctx.strokeStyle="#FF0000";
	    Global.ctx.moveTo(crossX, crossY);
	    Global.ctx.lineTo(crossX+length, crossY+length);
	    Global.ctx.moveTo(crossX, crossY+length);
	    Global.ctx.lineTo(crossX+length, crossY);
	    Global.ctx.lineWidth = 8;
	    Global.ctx.stroke();
	    Global.ctx.restore();
	}


};