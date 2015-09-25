/// <reference path="stage.js" />

var Scene = function (id) {

    this.remover = [];
    this.elementos = [];

    this.addElemento = function (e, tipo) {
        if (!e.update) e.update = function () { };
        if (!e.draw) e.draw = function () { };
        if (!e.zIndex) e.zIndex = 0;
        if (!tipo && !e.tipo)e.tipo = "obj";

        this.elementos.push(e);
    };

    this.removeElemento = function (e) {
        this.remover.push(e);
    };

    this.obterElementosPorTipo = function (tipo) {
        return _.filter(this.elementos, function (el) { return el.tipo == tipo });
    };

    this.obterElementosPorNome = function (id) {
        return _.filter(this.elementos, function (el) { return el.id == id });
    };

    this.limpar = function () {
        this.remover = [];
        this.elementos = [];
    };
};
