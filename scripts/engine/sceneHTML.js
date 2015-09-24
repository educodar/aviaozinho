/// <reference path="lib/jquery-2.0.2.js" />

var SceneHTML = function () {

    this.exibir = function () {

        var menu = $("#" + this.id);
        if (menu.length == 0) menu = this.criar();

        if (!menu.visible) menu.show();
    };

    this.esconder = function () {

        var menu = $("#" + this.id);
        if (menu.length == 0) menu = this.criar();

        menu.hide();
    };

};