
var SpriteData = new function() {

	this.spritesData = [];

	this.add = function(name, data) {
		this.spritesData.push({name: name, data: data});
	};

	this.load = function(name) {
		return _.find(this.spritesData, function(s) {return s.name == name}); 
	};

	this.loadAll = function() { return this.spritesData; };

};