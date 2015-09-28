
var Treasure = function (grid, position) {

    this.id = 'treasure_object';
    this.grid = grid;
    this.x;
    this.y;
    this.gridPosX;
    this.gridPosY;
    this.found = false;

    this.setPosition(position.x, position.y);
};

Treasure.prototype.onRestart = function() {
    this.found = false;
};

Treasure.prototype.setPosition = function(gridPosX, gridPosY) {
	var gridData = this.grid.getPosition( gridPosX, gridPosY);
	this.x = gridData.x;
	this.y = gridData.y;
	this.gridPosX = gridPosX;
	this.gridPosY = gridPosY;
};

Treasure.prototype.find = function() {
	if(!this.found)
		this.found = true;
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
		crossX = position.x - length*.5,
		crossY = position.y - length*.5;

	if(this.found) {
	    App.display.ctx.save();
	    App.display.ctx.translate(x, y);
	    App.display.ctx.beginPath();
	    App.display.ctx.arc(0,0,size,0,2*Math.PI);
	    App.display.ctx.closePath();
		App.display.ctx.fillStyle = "green"; 
	    App.display.ctx.fill();
	    App.display.ctx.restore();
	} else {
	    App.display.ctx.save();
	    App.display.ctx.beginPath();
	    App.display.ctx.strokeStyle="#FF0000";
	    App.display.ctx.moveTo(crossX, crossY);
	    App.display.ctx.lineTo(crossX+length, crossY+length);
	    App.display.ctx.moveTo(crossX, crossY+length);
	    App.display.ctx.lineTo(crossX+length, crossY);
	    App.display.ctx.lineWidth = 8;
	    App.display.ctx.stroke();
	    App.display.ctx.restore();
	}


};