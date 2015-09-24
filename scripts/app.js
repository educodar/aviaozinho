var App = function () {

    var self = {};


    self.iniciar = function (e) {
        
        self.stage = new Stage();

        var sc = Global.scene_controle = new Scene_controle();
        Global.input = new Input();

        var sceneMain = new Scene_main();

        sc.adicionarScene(sceneMain);

        sc.alterarScene(sceneMain.id, sceneMain.iniciar());
        
        self.draw();
    };

    //Loop principal do aplicativo
    self.draw = function () {
        window.requestAnimationFrame(self.draw, canvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        self.stage.update();
    };
    
    return self;
};