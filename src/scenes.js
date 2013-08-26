// scenes.js

// Game over scene for when we have won
Crafty.scene('Won', function() {

    Crafty.background("#002");

    Crafty.e('2D, DOM, Text')
        .text('A Winner Is You!')
        .attr({ x: 0, y: Game.height() / 2 - 24, w: Game.width() })
        .css($text_css)
        .textFont($text_font);

    Crafty.e('2D, DOM, Text')
        .text('You don\'t ever have to do this again :)')
        .attr({ x: 0, y: 2 * Game.height() / 3 - 16, w: Game.width() })
        .css($text_css)
        .textFont($small_text_font);

    Crafty.audio.play('nothing');

});

// Game over scene for when we have lost
Crafty.scene('Lost', function() {

    Crafty.background("#111");

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
        Crafty.audio.play('beep');
        Crafty.scene('Playing');
    }
    this.bind('KeyDown', this.restart_game);

}, function() {
    this.unbind('KeyDown', this.restart_game);
});

var sec = 1000;

// Scene for when the player has lost the game but doesn't know yet
Crafty.scene('Losing', function() {

    Crafty.background("#300");

    var num;

    // Count down from ten to zero, taking a second each time
    draw = function() {
        if(this.num) {
            this.num.destroy();
        }
        this.num = Crafty.e('2D, DOM, Text')
                .text(c.val.toString())
                .attr({ x: 0, y: Game.height() / 2 - 300, w: Game.width() })
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

        Crafty.audio.play('gulp');
    
        c.dec();

        if(c.val > 0) {
            draw();
            t = setTimeout(countdown, sec);
        } else {
            nukecountdown();
            Crafty.scene('Lost');
        }
    }

    t = setTimeout(countdown, sec);
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
    //clues[1] = "Pay it later";
    //clues[1] = "Speak friend and...";
    clues[1] = "Don't tell I tell...";
    clues[0] = "Whistle register note";
    //clues[0] = "Ceci n'est pas...";

    var answers = new Array(10);
    answers[9] = "ANY";
    answers[8] = "A";
    answers[7] = "0";
    answers[6] = "NONE";    
    answers[5] = "X";
    answers[4] = "T";
    answers[3] = "A";
    answers[2] = "SPACE";
    //answers[1] = "TAB";
    //answers[1] = "ENTER";
    answers[1] = "E";
    answers[0] = "F7";
    //answers[0] = "PIPE";

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
                .attr({ x: 0, y: Game.height() / 2 - 300, w: Game.width() })
                .css($counter_css)
                .textFont($counter_font);
        if(this.clue) {
            this.clue.destroy();
        }
        this.clue = Crafty.e('2D, DOM, Text')
                .text(clues[c.val-1])
                .attr({ x: 0, y: 3 * Game.height() / 4 - 32, w: Game.width() })
                .css($text_css)
                .textFont($text_font);

    }

    draw();

    var t;

    nukecountdown = function() {
        clearTimeout(this.t);
        this.num.destroy();
    }

    var solved = false;

    countdown = function() {
        Crafty.audio.play('tick');

        c.dec();

        if(c.val > 0 && solved) {
            solved = false;
            if(c.val == 7) {
                solved = true;
            }
            draw();
            t = setTimeout(countdown, sec);
        } else if(c.val == 0 && solved) {   
            nukecountdown();
            Crafty.scene('Won');
        } else {
            nukecountdown();
            Crafty.scene('Losing');
        }
    }

    t = setTimeout(countdown, sec);

    // Handle keypresses
    this.check_answer = function() {
        switch(c.val) {
            case 10:
                solved = true;
                Crafty.audio.play('correct');
                break;
            case 9:
            case 8:
            case 6:
            case 5:
            case 4:
            case 3:
            case 2:
            case 1:
                if(c.isDown(answers[c.val-1])) {
                    solved = true;
                    Crafty.audio.play('correct');
                } 
                break;
            case 7:
                solved = false;      
            default:
    
        }
    }

    this.bind('KeyDown', this.check_answer);

}, function() {
    //this.unbind('KeyDown', this.check_answer);
    Crafty.unbind('KeyDown');
});


// Start scene - display message and wait for key to be pressed
Crafty.scene('Start', function() {

    Crafty.audio.play('beep');

    Crafty.background("#111");

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

    // Try out the particles thing
    var options = {
        x: -400,
        maxParticles: 150,
        size: 18,
        sizeRandom: 4,
        speed: 1,
        speedRandom: 1.2,
        // Lifespan in frames
        lifeSpan: 29,
        lifeSpanRandom: 7,
        // Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
        angle: 65,
        angleRandom: 34,
        startColour: [128, 131, 0, 1],
        startColourRandom: [48, 50, 45, 0],
        endColour: [245, 35, 0, 0],
        endColourRandom: [60, 60, 60, 0],
        // Only applies when fastMode is off, specifies how sharp the gradients are drawn
        sharpness: 20,
        sharpnessRandom: 10,
        // Random spread from origin
        spread: 100,
        // How many frames should this last
        duration: -1,
        // Will draw squares instead of circle gradients
        fastMode: false,
        gravity: { x: 0.5, y: 0.5 },
        // sensible values are 0-3
        jitter: 0
    }

    Crafty.e("2D,Canvas,Particles").particles(options);

    this.start_game = function() {
        Crafty.scene('Playing');
    }
    this.bind('KeyDown', this.start_game); 

}, function() {
    // Remove event binding once used
    //this.unbind('KeyDown', this.start_game);
    Crafty.unbind('KeyDown');
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
    Crafty.load([
        'assets/null.gif',
        'assets/beep.mp3',
        'assets/beep.ogg',
        'assets/beep.aac',
        'assets/beep.wav',
        'assets/correct.mp3',
        'assets/correct.ogg',
        'assets/correct.aac',
        'assets/correct.wav',
        'assets/gulp.mp3',
        'assets/gulp.ogg',
        'assets/gulp.aac',
        'assets/gulp.wav',
        'assets/tick.mp3',
        'assets/tick.ogg',
        'assets/tick.aac',
        'assets/tick.wav',
        'assets/Nothing.mp3',
        'assets/Nothing.ogg',
        'assets/Nothing.aac',
        'assets/Nothing.wav'], 
        function() {

        Crafty.audio.add({
            beep: [ 'assets/beep.mp3',
                    'assets/beep.ogg',
                    'assets/beep.aac',
                    'assets/beep.wav'],
            correct: [ 'assets/correct.mp3',
                       'assets/correct.ogg',
                       'assets/correct.aac',
                       'assets/correct.wav'],
            gulp: [ 'assets/gulp.mp3',
                    'assets/gulp.ogg',
                    'assets/gulp.aac',
                    'assets/gulp.wav'],
            tick: [ 'assets/tick.mp3',
                    'assets/tick.ogg',
                    'assets/tick.aac',
                    'assets/tick.wav'],
            nothing: [  'assets/Nothing.mp3',
                        'assets/Nothing.ogg',
                        'assets/Nothing.aac',
                        'assets/Nothing.wav'],

        });

        Crafty.scene('Start');

        }

    );
});
