var State = function (id) {
	/// <summary>
    /// Todos os objetos que pretendem ser um estado controlado pela máquina de estados deve obrigatoriamente ter implementado esses métodos. Sendo assim,
    /// para evitar erros, é recomendável que esses objetos tenham o objeto State com prototype.
    /// </summary>
    this.id = id;
    this.iniciar = function () { };
    this.update = function () { };
    this.draw = function () { };
    this.sair = function () { };
};
