// scenes.js

// Scene for when the player has lost the game but doesn't know yet
Crafty.scene('Losing', function() {

    var c = 10

    // Count down from ten to zero, taking a second each time
    Crafty.e('2D, DOM, Text')
       .text(c.toString())
       .attr({ x: 0, y: Game.height() / 2, w: Game.width() })
       .css($text_css);

    


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
