
var Scene_main = function () {

    var self = this;

	self.id = 'scene_main';

    this.iniciar = function () {

    	self.grid = new Grid();
    	self.player = new Player(self.grid);
        
        self.limpar();
        self.addElemento(this.grid);
        self.addElemento(this.player);
        self.addElemento(this);
    };
};
Scene_main.prototype = new Scene();


