// Adds event support to any object
var Evento = function () {

    //Enumeração que armazena o nome dos eventos associados ao objeto que instanciou o objeto Evento;
    this.eventos = {};

    // Binds a callback on a target object to an 
    // event on this object
    this.bind = function (event, target, callback) {
        // Handle the case where there is no target provided
        if (!callback) {
            callback = target;
            target = null;
        }

        // Handle case for callback that is a string
        if (_.isString(callback)) {
            callback = target[callback];
        }

        this.listeners = this.listeners || {};
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push([target || this, callback]);

        if (target) {
            if (!target.binds) { target.binds = []; }
            target.binds.push([this, event, callback]);
        }

        //Adiciona o nome do evento na enumeração
        this.eventos[event.toUpperCase()] = event;
    };

    // Triggers an event on an object, 
    // triggering all listeners on the object
    this.trigger = function (event, data) {
        if (!data) data = event;
        if (this.listeners && this.listeners[event]) {
            for (var i = 0, len = this.listeners[event].length; i < len; i++) {
                var listener = this.listeners[event][i];
                listener[1].call(listener[0], data);
            }
        }
    };

    this.unbind = function (event, target, callback) {
        if (!target) {
            if (this.listeners[event]) {
                delete this.listeners[event];
                return;
            }
        } else {
            var l = this.listeners && this.listeners[event];
            if (l) {
                for (var i = l.length - 1; i >= 0; i--) {
                    if (l[i][0] == target) {
                        if (!callback || callback == l[i][1]) {
                            this.listeners[event].splice(i, 1);
                        }
                    }
                }
            }

        }
        if (this.eventos.event)
            delete this.eventos[event.toUpperCase()];
    };

    // Removes any bound methods from 
    // this object
    this.debind = function () {
        if (this.binds) {
            for (var i = 0, len = this.binds.length; i < len; i++) {
                var boundEvent = this.binds[i],
                    source = boundEvent[0],
                    event = boundEvent[1];
                source.unbind(event, this);
            }
        }
    }
};