
var Spritesheet = function(spriteData) {

	this.name = spriteData.name;
	this.frames = spriteData.data.frames;
	this.sequences = spriteData.data.sequences;
	this.sizeAdjustFactor = spriteData.data.sizeAdjustFactor;

	this.currentSequence = null;

	this.setSequence = function(sequenceName) {
		this.currentSequence = _.find(this.sequences, function(s) { return s.name == sequenceName});
	};

	this.draw = function(displayObject) {

		var width = this.frames[0].width * this.sizeAdjustFactor;
		var height = this.frames[0].height * this.sizeAdjustFactor;
		var position = displayObject.getCurrentPosition();

		Global.ctx.save();
	    Global.ctx.translate(position.x, position.y);
	    Global.ctx.rotate((displayObject.direction-90)*Math.PI/180);
	    Global.ctx.translate(-position.x, -position.y);
	    Global.ctx.translate(position.x - width*.5, position.y - height*.5);
		Global.ctx.drawImage(
			Global.images[this.name],
			0, //sx
			0, //sy
			this.frames[0].width, //swidth
			this.frames[0].height, //sheight
			0, //x
			0, //y
			width, //width
			height //height
		);
		Global.ctx.restore();
	};

};