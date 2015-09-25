
var Grid = function () {

    var self = this;

    self.id = 'scene_grid'; 
    self.xAxisSize = 7;
    self.yAxisSize = 7;
    self.blockSize = 50,
    self.marginLeft = 10,
    self.marginTop = 10;
    self.treasureQtd = 4;
    self.treasures = [];
    self.searchedPositions = [];

    for(var i = 0 ; i < self.treasureQtd ; i++) {
        var treasure = new Treasure(self, {x:i+2, y:i+2});
        self.treasures.push(treasure);
    }

    //this.alterarEstado(Adicao.estados.TERMO1, dados);

    //this.stateManager = new StateMachine(this);

};

Grid.prototype.onRestart = function() {
    this.searchedPositions = [];
    for(var i = 0 ; i < this.treasureQtd ; i++) {
        this.treasures[i].onRestart();
    }
};

Grid.prototype.getPosition = function(posX, posY) {

    var x = this.marginLeft + ( (posX-1)*this.blockSize) + this.blockSize*.5;
    var y = this.marginTop + ( (posY-1)*this.blockSize) + this.blockSize*.5;

    return {x:x, y:y, treasure: _.find(this.treasures, function(t) { return t.gridPosX == posX && t.gridPosY == posY }) };
};

Grid.prototype.addSearchPosition = function(posX, posY) {
    var position = this.getPosition(posX, posY);
    this.searchedPositions.push({x: position.x, y: position.y });
};

Grid.prototype.update = function () {
    //this.stateMachine.update();
};

Grid.prototype.draw = function () {
            
    Global.ctx.save();

    for(var i = 0 ; i < this.xAxisSize ; i++ ) {
        for(var j = 0 ; j < this.yAxisSize ; j++ ) {
            Global.ctx.beginPath();
            Global.ctx.rect( this.marginLeft + (i*this.blockSize), this.marginTop + (j*this.blockSize), this.blockSize, this.blockSize);
            Global.ctx.closePath();
            Global.ctx.stroke();
        }        
    }

    for(var i = 0 ; i < this.treasures.length ; i ++) {
        this.treasures[i].update();
        this.treasures[i].draw();
    }

    for(var i = 0 ; i < this.searchedPositions.length ; i ++) {
        var length = 20,
            x = this.searchedPositions[i].x - length*.5,
            y = this.searchedPositions[i].y - length*.5;

        Global.ctx.save();
        Global.ctx.beginPath();
        Global.ctx.moveTo(x,y);
        Global.ctx.lineTo(x+length,y+length);
        Global.ctx.moveTo(x,y+length);
        Global.ctx.lineTo(x+length,y);
        Global.ctx.lineWidth = 5;
        Global.ctx.stroke();
        Global.ctx.restore();
    }


    //this.stateMachine.draw();

};