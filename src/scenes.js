// scenes.js

// Game over scene for when we have lost
Crafty.scene('Lost', function() {

    Crafty.background("#000");

    Crafty.e('2D, DOM, Text')
        .text('GAME OVER')
        .attr({ x: 0, y: Game.height() / 2 - 24, w: Game.width() })
        .css($text_css)
        .textFont($text_font);

    Crafty.e('2D, DOM, Text')
        .text('Press any key to start again')
        .attr({ x: 0, y: 2 * Game.height() / 3 - 32, w: Game.width() })
        .css($text_css)
        .textFont($small_text_font);

    this.restart_game = function() {
        Crafty.scene('Playing');
    }
    this.bind('KeyDown', this.restart_game);

}, function() {
    this.unbind('KeyDown', this.restart_game);
});

// Scene for when the player has lost the game but doesn't know yet
Crafty.scene('Losing', function() {

    Crafty.background("#700");

    var num;

    // Count down from ten to zero, taking a second each time
    draw = function() {
        if(this.num) {
            this.num.destroy();
        }
        this.num = Crafty.e('2D, DOM, Text')
                .text(c.val.toString())
                .attr({ x: 0, y: Game.height() / 2 - 128, w: Game.width() })
                .css($counter_css)
                .textFont($counter_font);
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

    // Darken background
    Crafty.background("#000");

    // I'm sure this stuff shouldn't really go here
    var clues = new Array(10);
    clues[9] = "Press any key";
    clues[8] = "Press a key";
    clues[7] = "Press zero key";
    clues[6] = "Press zero keys";
    clues[5] = "Give us a kiss";
    clues[4] = "Nice cuppa";
    clues[3] = "For 'orses";
    clues[2] = "The final frontier";
    clues[1] = "Pay it later";
    clues[0] = "Ceci n'est pas...";

    var answers = new Array(10);
    answers[9] = "ANY";
    answers[8] = "A";
    answers[7] = "0";
    answers[6] = "NONE";    
    answers[5] = "X";
    answers[4] = "T";
    answers[3] = "A";
    answers[2] = "SPACE";
    answers[1] = "TAB";
    answers[0] = "PIPE";

    // Set up a new counter
    c = Crafty.e('Counter, Persist, Keyboard');

    var num;
    var clue;

    // Count down from ten to zero, taking a second each time
    draw = function() {
        if(this.num) {
            this.num.destroy();
        }
        this.num = Crafty.e('2D, DOM, Text')
                .text(c.val.toString())
                .attr({ x: 0, y: Game.height() / 2 - 128, w: Game.width() })
                .css($counter_css)
                .textFont($counter_font);
        if(this.clue) {
            this.clue.destroy();
        }
        this.clue = Crafty.e('2D, DOM, Text')
                .text(clues[c.val-1])
                .attr({ x: 0, y: 3 * Game.height() / 4 - 32, w: Game.width() })
                .css($text_css)
                .textFont($small_text_font);

    }

    draw();

    var t;

    nukecountdown = function() {
        clearTimeout(this.t);
        this.num.destroy();
    }

    var solved = false;

    countdown = function() {
        c.dec();

        if(c.val > 0 && solved) {
            draw();
            this.t = setTimeout(countdown, 1000);
        } else {
            nukecountdown();
            Crafty.scene('Losing');
        }
    }

    t = setTimeout(countdown, 1000);

});


// Start scene - display message and wait for key to be pressed
Crafty.scene('Start', function() {

    Crafty.background("#222");

    Crafty.e('2D, DOM, Text')
        .text('Ten Seconds')
        .attr({ x: 0, y: Game.height() / 3 - 16, w: Game.width() })
        .css($text_css)
        .textFont($text_font);

    Crafty.e('2D, DOM, Text')
        .text('by Wayne Myers')
        .attr({ x: 0, y: Game.height() / 2 - 24, w: Game.width() })
        .css($text_css)
        .textFont($small_text_font);

    Crafty.e('2D, DOM, Text')
        .text('Press any key to start')
        .attr({ x: 0, y: 2 * Game.height() / 3 - 32, w: Game.width() })
        .css($text_css)
        .textFont($text_font);

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
        .attr({ x: 0, y: Game.height() / 2 - 24, w: Game.width() })
        .css($text_css)
        .textFont($text_font);

    // Loading code will go here
    

    // When done loading, go to the start screen
    Crafty.scene('Start');

});
