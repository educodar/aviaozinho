
var Scene_main = function () {

    var self = this;

	self.id = 'scene_main';
    //this.stateManager = new StateMachine(this);

    this.iniciar = function () {

    	self.grid = new Grid();
    	self.player = new Player(self.grid);

        self.limpar();

        //this.alterarEstado(Adicao.estados.TERMO1, dados);

        self.addElemento(this.grid);
        self.addElemento(this.player);
        self.addElemento(this);
    };
};
Scene_main.prototype = new Scene();


