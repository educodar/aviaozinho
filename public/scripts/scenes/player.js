

var Player = function (grid) {

    this.id = 'player_object';
    this.grid = grid;
    this.x;
    this.y;
    this.gridPosX;
    this.gridPosY;
    this.direction = 90;
    this.stateMachine = new StateMachine(this);

    this.speed = 2;
    this.targetX;
    this.targetY;

    this.spriteSheet = new Spritesheet(SpriteData.load('player_sprite'));

    this.setPosition(1,1);

	this.alterarEstado(Player.states.IDLE);
    
};

Player.states = {
    IDLE: "idle",
    MOVING: "moving"
};

Player.prototype.onRestart = function() {
    this.setPosition(1,1);
    this.direction = 90;
    this.targetX = null;
    this.targetY = null;
    this.alterarEstado(Player.states.IDLE);
};

Player.prototype.alterarEstado = function (state, params) {

    var newState;

    switch(state) {
        case Player.states.IDLE:
            newState = new StatePlayerIdle();
            break;
        case Player.states.MOVING:
            newState = new StatePlayerMoving();
            break;
    }

    this.stateMachine.alterarEstado(newState, params);
};

Player.prototype.isValidPosition = function(gridPosX, gridPosY) {
    return (gridPosX <= this.grid.xAxisSize) && (gridPosY <= this.grid.yAxisSize);
};

Player.prototype.setPosition = function(gridPosX, gridPosY) {

    if(this.isValidPosition(gridPosX, gridPosY)) {

    	var gridData = this.grid.getPosition( gridPosX, gridPosY);

    	this.x = gridData.x;
    	this.y = gridData.y;

    	this.gridPosX = gridPosX;
    	this.gridPosY = gridPosY;
    } else {
        toastr.error('Posição: ' + gridPosX + ', ' + gridPosY + ' inválida');
    }
};

Player.prototype.moveForward = function(steps, callback) {
    
    var nextPosition = this.getNextPosition(steps);

    if(this.isValidPosition(nextPosition.posX, nextPosition.posY)) {

        var gridData = this.grid.getPosition( nextPosition.posX, nextPosition.posY);

        console.log('Movendo para a posição: ' + nextPosition.posX + ', ' + nextPosition.posY)

        this.gridPosX = nextPosition.posX;
        this.gridPosY = nextPosition.posY;

        this.targetX = gridData.x;
        this.targetY = gridData.y;
        
        this.alterarEstado(Player.states.MOVING, {callback: callback});
    } else {
        toastr.error('Não é possível mover '+steps+' espaços de onde o avião está');
        callback();
    }
};

Player.prototype.rotate = function(direction, callback) {
    var self = this;
    var angle;

    if(direction == 'dir') angle = 90
    else if(direction == 'esq') angle = 270

    setTimeout(function() {   
        self.direction = (self.direction + angle)%360;  
        setTimeout(function() { 
            callback();
        }, 500);
    }, 500);  
    
    
    //TODO: Tratar erro de "out of bounds"
};

Player.prototype.getCurrentPosition = function() {
	return {x:this.x, y:this.y};
};

Player.prototype.getCurrentGridPosition = function() {
	return {posX:this.gridPosX, posY:this.gridPosY};
};

Player.prototype.getNextPosition = function(steps) {

    steps = steps || 1;
    var posX, posY;
    var currentPosition = this.getCurrentGridPosition();

    if(this.direction == 0 || this.direction == 360) {
        posX = currentPosition.posX;  
        posY = currentPosition.posY - steps;
    } else if(this.direction == 90) {
        posX = currentPosition.posX + steps;  
        posY = currentPosition.posY;
    } else if(this.direction == 180) {
        posX = currentPosition.posX;  
        posY = currentPosition.posY + steps;
    } else if(this.direction == 270) {
        posX = currentPosition.posX - steps;  
        posY = currentPosition.posY;
    }

    return {posX: posX, posY: posY}
};

Player.prototype.checkTreasure = function(callback) {

    var self = this;
    setTimeout(function() {   

        var nextPosition = self.getNextPosition();
        var position = self.grid.getPosition(nextPosition.posX, nextPosition.posY);
        var founded = false

        if (position) {
            if(position.treasure) {
                position.treasure.find();
                founded = true;
            } else {
                self.grid.addSearchPosition(nextPosition.posX, nextPosition.posY);
            }
        }

        setTimeout(function() {   
            callback();
        }, 500);

    }, 500);
};

Player.prototype.update = function () {
    this.stateMachine.update();
};

Player.prototype.draw = function () {

    this.stateMachine.draw();

};