
var StateMachine = function (p) {

    //Guarda uma referência ao dono do objeto
    this.parent = p;

    this.setEstadoAtual = function (e) { this.estadoAtual = e; };
    this.setEstadoGlobal = function (e) { this.estadoGlobal = e; };
    this.setEstadoAnterior = function (e) { this.estadoAnterior = e; };

    this.update = function () {
        /// <summary>
        /// Chama o update do estado atual e do estado global
        /// </summary>
        if (this.estadoGlobal) this.estadoGlobal.update(this.parent);

        if (this.estadoAtual) this.estadoAtual.update(this.parent);
    };

    this.draw = function () {
        /// <summary>
        /// Chama o draw do estado atual e do estado global
        /// </summary>
        if (this.estadoGlobal) this.estadoGlobal.draw(this.parent);

        if (this.estadoAtual) this.estadoAtual.draw(this.parent);
    };

    this.alterarEstado = function (estado, params) {

        if (this.estadoAtual) {
            this.estadoAnterior = this.estadoAtual;
            this.estadoAtual.sair(this.parent, params);
        }

        this.estadoAtual = estado;

        this.estadoAtual.iniciar(this.parent, params);
    };

    this.voltarEstadoAnterior = function () {
        if (this.estadoAnterior)
            this.alterarEstado(this.estadoAnterior);
    };

    this.igualEstadoAtual = function (e) {
        e.id == this.estadoAtual.id;
    };
};