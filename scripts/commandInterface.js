
var CommandInterface = function() {

	var self = this;

	self.scene = Global.scene_controle.getCurrentScene();
	self.player = self.scene.player;
	self.executionStack = [];
	self.readyToExecute = true;

	this.movePlayerForward = function(steps) {

		var self = this;

		self.player.moveForward(steps, function() { 
			console.log('Callback final da animação de andar.');
			self.readyToExecute = true; 
			self.executeNext(); 
		});
	};

	this.rotatePlayer = function(angle) {
		if(angle == 90 || angle == 180 || angle == 270 || angle == 360 || angle == 0)
			self.player.rotate(angle, function() { 
			console.log('Girou.');
			self.readyToExecute = true; 
			self.executeNext(); 
		});
		else
			alert('Ângulo inválido. Os ângulos válidos são: 0, 90, 180, 270, 360');
	};

	this.checkTreasure = function() {
		self.player.checkTreasure(function() { 
			console.log('Checou Tesouro.');
			self.readyToExecute = true; 
			self.executeNext(); 
		});
	};

	this.executeNext = function() {

		this.readyToExecute = false;

		var andarPraFrente = function(steps) { self.movePlayerForward(steps); };
		var girar = function(angle) { self.rotatePlayer(angle); };
		var checarTesouro = function() {self.checkTreasure(); };

		var nextCommand = this.executionStack.shift();

		if(nextCommand) {
			try {
			    eval(nextCommand);
			}
			catch(err) {
				if(err)
			    	alert('Erro no eval: ' + nextCommand);
			}
		} else {
			this.readyToExecute = true;
		}
	};

	this.execute = function(command) {
		this.executionStack.push(command);

		if(this.executionStack.length == 1 && this.readyToExecute == true)
			this.executeNext();
	};

};
