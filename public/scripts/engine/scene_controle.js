﻿
var Scene_controle = function () {

    this.scenes = [];

    this.idSceneAtual = null;

    this.alterarScene = function (idScene, metodo, args) {

        if (this.idSceneAtual) {
            if (App.scene instanceof Scene)
                App.input.unbindContexto(App.scene_controle.idSceneAtual);
            else if (App.scene instanceof SceneHTML)
                App.scene.esconder();
        }

        //Altera a cena atual e a inicializa.
        var item = _.find(this.scenes, function (s) { return s.id == idScene });
        if (item) {
            this.idSceneAtual = idScene;
            App.scene = item.scene;

            if (_.isString(metodo)) metodo = item.scene[metodo];
            if (_.isFunction(metodo)) metodo.call(item.scene, args);
        }

    };

    this.adicionarScene = function (scene, id) {
        this.scenes.push({ id: scene.id ? scene.id : id, scene: scene });
    };

    this.removerScene = function (scene, id) {
        //TODO
    };

    this.reiniciarScene = function (recriate) {
        if(recriate) {
            // TODO
        } else {
            var currentScene = this.getCurrentScene();
            _.invoke(currentScene.elementos, "onRestart");

        }
    };

    this.getCurrentScene = function() {

        var self = this;

        var scene = _.find(self.scenes, function (s) { 
            return s.id == self.idSceneAtual 
        });

        return (scene && scene.scene) ? scene.scene : null;
    };

};