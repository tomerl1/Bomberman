
requirejs.config({

    baseUrl: "js",

    paths: {
        lib: "./lib",
        map: "./map"
    }
});


require(["lib/game", "bomberman"], function (Game, Bomberman) {

    var App = Game.extend({

        init: function () {
            // general settings
            canvas.width = 228;
            canvas.height = 262;
            canvas.scale = 2;

            // load resources
            content.load("sprites", "res/14bomberman.png");

            // key bindings
            input.bindKey("left", [input.Keys.LEFT_ARROW, input.Keys.A]);
            input.bindKey("top", [input.Keys.UP_ARROW, input.Keys.W]);
            input.bindKey("right", [input.Keys.RIGHT_ARROW, input.Keys.D]);
            input.bindKey("bottom", [input.Keys.DOWN_ARROW, input.Keys.S]);
            input.bindKey("context", [input.Buttons.RIGHT]);
            // input.bindKey("space", input.Keys.SPACE);

            this.hasLoaded = false;
        },

        tick: function () {
            if (this.hasLoaded) {
                this.Bomberman.update(input);
                this.Bomberman.draw(canvas.ctx);
            }
            else {
                this.hasLoaded = content.progress() === 1;

                // finished loading resources
                if (this.hasLoaded) {
                    this.Bomberman = new Bomberman();
                }
            }
        }
    });

    (function () {
        var game = new App();

        // run the application
        game.run();

        window.onblur = game.stop.bind(game);
        window.onfocus = game.run.bind(game);
    })();
});