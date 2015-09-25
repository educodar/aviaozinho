/// <reference path="../lib/underscore.js" />

var Input = function () {

    this.inputScenes = {};

    this.inputGlobal = [];

    this.add = function (evento, callback, contexto, bind) {
    	/// <summary>
        /// Adicona um evento a um determinado contexto.
    	/// </summary>
        /// <param name="evento">nome do evento no hammer.js</param>
        /// <param name="callback">função callback do evento</param>
        /// <param name="contexto">identificador da scene que usa o evento. Se não passar esse parâmetro o evento é global.</param>
        /// <param name="bind">se o evento deve ser inicializado. Default: true</param>

        var target;

        if (_.isUndefined(bind)) bind = true;

        //Verifica se passou contexto, se não passou, o evento é global
        if (contexto) { //Verifica se já existe o contexto, se não cria um array.
            if (!this.inputScenes[contexto]) target = this.inputScenes[contexto] = [];
            else target = this.inputScenes[contexto];
        } else
            target = this.inputGlobal;

        //Adiciona o evento e o callback no contexto ou no global
        target.push({ evento: evento, callback: callback, bind: bind });

        //Cria um listener para o evento
        if(!Global.touch)
            Global.canvas.bind(evento, callback);
        else
            Global.canvas.hammer().bind(evento, callback);
    };

    this.remove = function (evento, callback, contexto) {
    	/// <summary>
    	/// Remove um determinado evento de um contexto.
    	/// </summary>
    	/// <param name="evento">evento no hammer.js</param>
    	/// <param name="callback">callback do método</param>
        /// <param name="contexto">identificador da scene que usa o evento. Se não passar esse parâmetro o evento é global.</param>

        var target;

        if (contexto) target = this.inputScenes[contexto];
        else target = this.inputGlobal;

        //Remove o evento do contexto
        var idx = target.indexOf(_.find(target, function (t) { return t.evento == evento && t.callback == callback; }));
        if (idx == -1) console.log("Não encontrou o objeto. input.removeInput");
        target.splice(idx, 1);

        if (!Global.touch)
            Global.canvas.unbind(evento, callback);
        else
            Global.canvas.hammer().unbind(evento, callback);
    };

    this.pedirExclusividade = function (contexto) {
    	/// <summary>
        /// Dá um unbind em todos os inputs não globais existentes, exceto os da scene passado como parâmetro.
    	/// </summary>
    	/// <param name="contexto">identificador da scene</param>

        for (var i = 0, contextos = _.keys(this.inputScenes) ; i < contextos.length ; i++) {
            if (contextos[i] != contexto)
                for (var j = 0, ctx = contextos[i]; j < ctx.length ; j++) {
                    var evt = this.inputScenes[ctx];
                    Global.canvas.unbind(evt.evento, evt.callback);
                }
        }

    };

    this.bindContexto = function (contexto) {
    	/// <summary>
    	/// Dá um bind em todos os eventos da scene
    	/// </summary>
    	/// <param name="contexto">identificador da scene</param>
        for(var i = 0, ctx = this.inputScenes[contexto] ; ctx && i < ctx.length ; i++)
            Global.canvas.bind(ctx[i].evento, ctx[i].callback);
    };

    this.unbindContexto = function (contexto) {
    	/// <summary>
        /// Dá um unbind em todos os eventos da scene
    	/// </summary>
        /// <param name="contexto">identificador da scene</param>
        for (var i = 0, ctx = this.inputScenes[contexto]; ctx && i < ctx.length ; i++)
            Global.canvas.unbind(ctx[i].evento, ctx[i].callback);
    };

    this.existeContexto = function (contexto) {
        return !_.isUndefined(this.inputScenes[contexto]);
    };

};