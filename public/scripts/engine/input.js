/// <reference path="../lib/underscore.js" />

var Input = function () {

    this.inputScenes = {};
    this.inputGlobal = [];

    this.add = function (evento, callback, contexto, bind) {

        var target;

        if (_.isUndefined(bind)) bind = true;

        //Verifica se passou contexto, se não passou, o evento é global
        if (contexto) {
            if (!this.inputScenes[contexto]) target = this.inputScenes[contexto] = [];
            else target = this.inputScenes[contexto];
        } else
            target = this.inputGlobal;

        target.push({ evento: evento, callback: callback, bind: bind });

        if(!Global.touch)
            Global.canvas.bind(evento, callback);
        else
            Global.canvas.hammer().bind(evento, callback);
    };

    this.remove = function (evento, callback, contexto) {

        var target;

        if (contexto) target = this.inputScenes[contexto];
        else target = this.inputGlobal;

        var idx = target.indexOf(_.find(target, function (t) { return t.evento == evento && t.callback == callback; }));
        if (idx == -1) console.log("Não encontrou o objeto. input.removeInput");
        target.splice(idx, 1);

        if (!Global.touch)
            Global.canvas.unbind(evento, callback);
        else
            Global.canvas.hammer().unbind(evento, callback);
    };

    this.pedirExclusividade = function (contexto) {
        for (var i = 0, contextos = _.keys(this.inputScenes) ; i < contextos.length ; i++) {
            if (contextos[i] != contexto)
                for (var j = 0, ctx = contextos[i]; j < ctx.length ; j++) {
                    var evt = this.inputScenes[ctx];
                    Global.canvas.unbind(evt.evento, evt.callback);
                }
        }
    };

    this.bindContexto = function (contexto) {
        for(var i = 0, ctx = this.inputScenes[contexto] ; ctx && i < ctx.length ; i++)
            Global.canvas.bind(ctx[i].evento, ctx[i].callback);
    };

    this.unbindContexto = function (contexto) {
        for (var i = 0, ctx = this.inputScenes[contexto]; ctx && i < ctx.length ; i++)
            Global.canvas.unbind(ctx[i].evento, ctx[i].callback);
    };

    this.existeContexto = function (contexto) {
        return !_.isUndefined(this.inputScenes[contexto]);
    };

};