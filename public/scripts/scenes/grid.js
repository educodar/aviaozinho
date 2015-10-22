
var Grid = function () {

    var self = this;

    self.id = 'scene_grid'; 
    self.xAxisSize = 7;
    self.yAxisSize = 7;
    self.blockSize = 50,
    self.marginLeft = 10,
    self.marginTop = 10;
    self.treasures = [];
    self.searchedPositions = [];

    self.treasures.push(new Treasure(self, {x:2, y:2}));
    self.treasures.push(new Treasure(self, {x:3, y:6}));
    self.treasures.push(new Treasure(self, {x:4, y:3}));
    self.treasures.push(new Treasure(self, {x:5, y:3}));
    self.treasures.push(new Treasure(self, {x:6, y:5}));

    var firstBaloon = Math.floor(Math.random() * self.treasures.length);
    var secondBaloon = Math.floor(Math.random() * self.treasures.length);
    while (firstBaloon == secondBaloon) {
        secondBaloon = Math.floor(Math.random() * self.treasures.length);
    }

    self.treasures[firstBaloon].isEmpty = false;
    self.treasures[secondBaloon].isEmpty = false;
};

Grid.prototype.onRestart = function() {
    this.searchedPositions = [];
    for(var i = 0 ; i < this.treasures.length ; i++) {
        this.treasures[i].onRestart();
    }
};

Grid.prototype.getPosition = function(posX, posY) {

    var x = this.marginLeft + ( (posX-1)*this.blockSize) + this.blockSize/2;
    var y = this.marginTop + ( (posY-1)*this.blockSize) + this.blockSize/2;

    return {x:x, y:y, treasure: _.find(this.treasures, function(t) { return t.gridPosX == posX && t.gridPosY == posY }) };
};

Grid.prototype.addSearchPosition = function(posX, posY) {
    var position = this.getPosition(posX, posY);
    this.searchedPositions.push({x: position.x, y: position.y });
};

Grid.prototype.allTreasuresFound = function() {
    var self = this;
    var allTreasuresFound = true;
    for(var i = 0 ; i < self.treasures.length ; i++) {
        if(self.treasures[i].found == false) {
            allTreasuresFound = false;
            break;
        }
    } 
    return allTreasuresFound;
};

Grid.prototype.update = function () {
};

Grid.prototype.draw = function () {
            
    App.display.ctx.save();

    App.display.ctx.rect(this.marginLeft, this.marginTop, this.blockSize*this.xAxisSize, this.blockSize*this.yAxisSize);
    App.display.ctx.fillStyle = "#259ADE";
    App.display.ctx.fill();

    for(var i = 0 ; i < this.xAxisSize ; i++ ) {
        for(var j = 0 ; j < this.yAxisSize ; j++ ) {
            App.display.ctx.beginPath();
            App.display.ctx.lineWidth = 0.5;
            App.display.ctx.rect( this.marginLeft + (i*this.blockSize), this.marginTop + (j*this.blockSize), this.blockSize, this.blockSize);
            App.display.ctx.closePath();
            App.display.ctx.strokeStyle = "#FFFFFF"
            App.display.ctx.stroke();
        }        
    }

    App.display.ctx.restore();

    for(var i = 0 ; i < this.treasures.length ; i ++) {
        this.treasures[i].update();
        this.treasures[i].draw();
    }

    for(var i = 0 ; i < this.searchedPositions.length ; i ++) {
        var length = 20,
            x = this.searchedPositions[i].x - length*.5,
            y = this.searchedPositions[i].y - length*.5;

        App.display.ctx.save();
        App.display.ctx.beginPath();
        App.display.ctx.moveTo(x,y);
        App.display.ctx.lineTo(x+length,y+length);
        App.display.ctx.moveTo(x,y+length);
        App.display.ctx.lineTo(x+length,y);
        App.display.ctx.lineWidth = 5;
        App.display.ctx.stroke();
        App.display.ctx.restore();
    }

};