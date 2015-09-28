var App = function (callbackEndExecution) {

    var self = {};
    self.callbackEndExecution = callbackEndExecution;

    var preload = new createjs.LoadQueue();
    var spritesToLoad = [];
    _.each(SpriteData.loadAll(), function(s) {
        spritesToLoad.push({id: s.name, src: s.data.file});
    });
    preload.loadManifest(spritesToLoad);

    function handleFileComplete(event) {
        if (event.item.type == createjs.LoadQueue.IMAGE) {
            Global.images = Global.images || [];
            Global.images[event.item.id] = event.result;
        }
    }

    function handleComplete(event) {
        self.iniciar();
        CI = new CommandInterface(callbackEndExecution);
    }

    self.iniciar = function (e) {
        
        self.stage = new Stage();
        Global.input = new Input();

        var sc = Global.scene_controle = new Scene_controle();
        var sceneMain = new Scene_main();

        sc.adicionarScene(sceneMain);
        sc.alterarScene(sceneMain.id, sceneMain.iniciar());
        
        self.draw();
    };

    self.draw = function () {
        window.requestAnimationFrame(self.draw, canvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        self.stage.update();
    };

    preload.on("complete", handleComplete, this);
    preload.on("fileload", handleFileComplete);
    
    return self;
};