
var StatePlayerMoving = function () {

	this.callback;

    this.iniciar = function (owner, params) {
    	console.log('Entrou no estado Moving.')
		this.callback = params.callback;
    };

    this.update = function (owner, params) {

        var dx = owner.targetX - owner.x,
	        dy = owner.targetY - owner.y,
	        angle = Math.atan2(dy,dx),
	        vx = Math.cos(angle) * owner.speed,
	        vy = Math.sin(angle) * owner.speed;

        if(vx > 0.1 || vy > 0.1) {
			owner.x += vx;
			owner.y += vy;
		} else {
			owner.alterarEstado(Player.states.IDLE, {callback: this.callback});
		}

    };

    this.sair = function (owner, params) {
    	console.log('Saiu do estado Moving.');
    };
};

StatePlayerMoving.prototype = new State("player_moving");