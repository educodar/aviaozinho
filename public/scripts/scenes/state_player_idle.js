
var StatePlayerIdle = function () {

    this.iniciar = function (owner, params) {
    	console.log('Entrou no estado IDLE.');
    	owner.spriteSheet.setSequence('idle');
    	if(params && params.callback)
    		params.callback();
    };

    this.update = function (owner, params) {
    };

    this.draw = function (owner, params) {
    	owner.spriteSheet.draw(owner);
    };

    this.sair = function (owner, params) {
    	console.log('Saiu do estado IDLE.')
    };
};

StatePlayerIdle.prototype = new State("player_idle");