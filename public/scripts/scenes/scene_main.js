
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

    self.endExecution = function() {
        if(self.grid.allTreasuresFound()) {
            toastr.success('Parabéns! Você encontrou todos os tesouros.', 'Educod@r');
        } else {
            toastr.error('Ainda há tesouros a serem encontrados. Tente de novo.', 'Educod@r');
        }
    };
};
Scene_main.prototype = new Scene();


