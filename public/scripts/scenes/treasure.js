
var Treasure = function (grid, position) {

    this.id = 'treasure_object';
    this.grid = grid;
    this.x;
    this.y;
    this.gridPosX;
    this.gridPosY;
    this.found = false;
    this.isEmpty = true;

    this.stateMachine = new StateMachine(this);

    this.spriteSheet = new Spritesheet(SpriteData.load('cloud_sprite'));
    this.spriteSheet.setSequence('idle');

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
	if(this.found) {
		if (!this.isEmpty){
			this.spriteSheet = new Spritesheet(SpriteData.load('baloon_sprite'));
			this.spriteSheet.draw(this);
		}
	} else {
	    this.spriteSheet = new Spritesheet(SpriteData.load('cloud_sprite'));
	    this.spriteSheet.draw(this);
	}
	


};