/// <reference path="lib/underscore.js" />
/// <reference path="sceneHTML.js" />
/// <reference path="scene.js" />

var Stage = function () {

    this.update = function () {

        var scene = Global.scene;
        
        //Verifica se a cena atual é uma tela do canvas ou um elemento HTML. Se for HTML não precisa fazer nada.
        //Ainda não tenho certeza de como isso vai funcionar quando a cena for misturada. Mas ainda não precisei implementar
        if (scene instanceof Scene) {

            for (var i = 0 ; i < scene.remover.length ; i++) {
                var idx = scene.elementos.indexOf(scene.remover[i]);
                if (idx == -1) console.log("Não encontrou o objeto. Stage.update");
                scene.elementos.splice(idx, 1);
            }
            scene.remover = [];

            scene.elementos = _.sortBy(scene.elementos, function (e) { return e.zIndex });

            _.invoke(scene.elementos, "update");
            _.invoke(scene.elementos, "draw");
        }
    };
};
