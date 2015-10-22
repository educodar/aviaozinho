
var CommandInterface = function(callbackEndExecution) {

	var self = this;

	self.scene = App.scene_controle.getCurrentScene();
	self.player = self.scene.player;
	self.executionStack = [];
	self.readyToExecute = true;
	self.callbackEndExecution = callbackEndExecution;

	this.movePlayerForward = function(steps) {

		self.player.moveForward(steps, function() { 
			console.log('Callback final da animação de andar.');
			self.readyToExecute = true; 
			self.executeNext(); 
		});
	};

	this.rotatePlayer = function(direction) {
		if(direction == 'dir' || direction == 'esq')
			self.player.rotate(direction, function() { 
			console.log('Girou.');
			self.readyToExecute = true; 
			self.executeNext(); 
		});
		else
			toastr.error('Parâmetro inválido. Para girar escreva \'dir\' ou \'esq\' ');
	};

	this.checkTreasure = function() {
		self.player.checkTreasure(function() { 
			console.log('Checou Tesouro.');
			self.readyToExecute = true; 
			self.executeNext(); 
		});
	};

	this.turnAround = function(){
		self.player.turnAround(function() {
			console.log('Callback final da animação de meia volta.');
			self.readyToExecute = true; 
			self.executeNext();
		});
	};

	this.movePlayerCheckingTreasure = function(steps) {
		self.player.moveForwardCheckingTreasure(steps, 0, function() { 
			console.log('Callback final da animação de andar.');
			self.readyToExecute = true; 
			self.executeNext(); 
		});
	}

	this.moveAndCheckTreasureInTheEnd = function(steps) {
		self.player.moveForwardAndCheckTreasureInTheEnd(steps, function() { 
			console.log('Callback final da animação de andar.');
			self.readyToExecute = true; 
			self.executeNext(); 
		});
	}

	this.endExecution = function(commands) {
		if(this.executionStack.length == 0) {
			this.scene.endExecution();
			this.callbackEndExecution();
		}
	};

	this.executeNext = function() {

		this.readyToExecute = false;

		var andar = function(steps) { self.movePlayerForward(steps); };
		var girarParaDireita = function() { self.rotatePlayer('dir'); };
		var girarParaEsquerda = function() { self.rotatePlayer('esq'); };
		var checarTesouro = function() { self.checkTreasure(); };
		var meiaVolta = function() { self.turnAround(); };
		var andarEChecarTesouro = function(steps) { self.moveAndCheckTreasureInTheEnd(steps) };
		var andarChecandoTesouro = function(steps) { self.movePlayerCheckingTreasure(steps); };

		var nextCommand = this.executionStack.shift();

		if(nextCommand) {
			try {
			    eval(nextCommand);
			}
			catch(err) {
				if(err) {
			    	toastr.error('Erro no comando: ' + nextCommand);
			    	this.executionStack = [];
					this.readyToExecute = true;
           			this.endExecution();
				}
			}
		} else {
			this.readyToExecute = true;
            this.endExecution();
		}
	};

	this.executeCommand = function(command) {
		this.executionStack.push(command);

		if(this.executionStack.length == 1 && this.readyToExecute == true)
			this.executeNext();
	};

	this.execute = function(commands) {
        for(var i = 0 ; i < commands.length ; i++) {
            this.executeCommand(commands[i].trim());
        }
	};

};
