var App = new function () {

    var self = {};
    self.callbackEndExecution = null;

    function handleFileComplete(event) {
        if (event.item.type == createjs.LoadQueue.IMAGE) {
            App.images = App.images || [];
            App.images[event.item.id] = event.result;
        }
    }

    function handleComplete(event) {
        self.iniciar();
        App.CommandInterface = new CommandInterface(self.callbackEndExecution);
    }

    self.loadImages = function() {
        var preload = new createjs.LoadQueue();
        var spritesToLoad = [];
        _.each(SpriteData.loadAll(), function(s) {
            spritesToLoad.push({id: s.name, src: s.data.file});
        });
        preload.loadManifest(spritesToLoad);


        preload.on("complete", handleComplete, this);
        preload.on("fileload", handleFileComplete);
    }

    self.iniciar = function (e) {
        
        self.stage = new Stage();
        App.input = new Input();

        var sc = App.scene_controle = new Scene_controle();
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
    
    return self;
};