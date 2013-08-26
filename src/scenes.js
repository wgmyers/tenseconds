// scenes.js

// Game over scene for when we have lost
Crafty.scene('Lost', function() {
    Crafty.e('2D, DOM, Text')
        .text('GAME OVER')
        .attr({ x: 0, y: Game.height() / 2, w: Game.width() })
        .css($text_css);

    Crafty.e('2D, DOM, Text')
        .text('Press any key to restart')
        .attr({ x: 0, y: 2 * Game.height() / 3, w: Game.width() })
        .css($text_css);

    this.restart_game = function() {
        Crafty.scene('Start');
    }
    this.bind('KeyDown', this.restart_game);

}, function() {
    this.unbind('KeyDown', this.restart_game);
});

// Scene for when the player has lost the game but doesn't know yet
Crafty.scene('Losing', function() {

    // Set up a new counter
    c = Crafty.e('Counter');

    var num;

    // Count down from ten to zero, taking a second each time
    draw = function() {
        if(this.num) {
            this.num.destroy();
        }
        this.num = Crafty.e('2D, DOM, Text')
                .text(c.val.toString())
                .attr({ x: 0, y: Game.height() / 2, w: Game.width() })
                .css($text_css);
    }

    draw();

    var t;

    nukecountdown = function() {
        clearTimeout(this.t);
        this.num.destroy();
    }

    countdown = function() {
        c.dec();

        if(c.val > 0) {
            draw();
            this.t = setTimeout(countdown, 1000);
        } else {
            nukecountdown();
            Crafty.scene('Lost');
        }
    }


    t = setTimeout(countdown, 1000);

            


});

// Scene for when the player is playing the game
Crafty.scene('Playing', function() {

    // Actual game goes here

    // If we screw up, we move to the losing scene
    Crafty.scene('Losing');

});


// Start scene - display message and wait for key to be pressed
Crafty.scene('Start', function() {

    Crafty.e('2D, DOM, Text')
        .text('Ten Seconds')
        .attr({ x: 0, y: Game.height() / 3, w: Game.width() })
        .css($text_css);

    Crafty.e('2D, DOM, Text')
        .text('by Wayne Myers')
        .attr({ x: 0, y: Game.height() / 2, w: Game.width() })
        .css($text_css);

    Crafty.e('2D, DOM, Text')
        .text('Press any key to start')
        .attr({ x: 0, y: 2 * Game.height() / 3, w: Game.width() })
        .css($text_css);

    this.start_game = function() {
        Crafty.scene('Playing');
    }
    this.bind('KeyDown', this.start_game); 

}, function() {
    // Remove event binding once used
    this.unbind('KeyDown', this.start_game);
});


// Loading scene - display some message while waiting for assets to load
Crafty.scene('Loading', function() {

    // Say what we are doing
    Crafty.e('2D, DOM, Text')
        .text('Loading...')
        .attr({ x: 0, y: Game.height() / 2, w: Game.width() })
        .css($text_css);

    // Loading code will go here
    

    // When done loading, go to the start screen
    Crafty.scene('Start');

});
