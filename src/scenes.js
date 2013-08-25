// scenes.js

// Start scene - display message and wait for key to be pressed
Crafty.scene('Start', function() {

    Crafty.e('2D, DOM, Text')
        .text('Ten Seconds')
        .attr({ x: 0, y: Game.height() / 3, w: Game.width() })
        .css($text_css);

    Crafty.e('2D, DOM, Text')
        .text('by Wayne Myers')
        .attr({ x: 0, y: 2 * Game.height() / 3, w: Game.width() })
        .css($text_css);

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
