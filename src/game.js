// game.js

Game = {

    // Define our screen size
    // Later we will want to be cleverer with these magic numbers
    gamescreen: {
        width: 800,
        height: 600
    },

    // Utility functions to get screen size
    width: function() {
        return this.gamescreen.width;
    },
    height: function() {
        return this.gamescreen.height;
    },


    start: function() {

        Crafty.init(Game.width(), Game.height());
        Crafty.background('black');

        Crafty.scene('Loading');

    }

}

$text_css = {
    'color': 'green',
    'text-align': 'center',
}

$text_font = {
    'size': '48px',
    'family': 'Times'
}

$small_text_font = {
    'size': '24px',
    'family': 'Times'
}

$counter_css = {
    'color': 'red',
    'text-align': 'center',
}

$counter_font = {
    'size': '512px',
    'family': 'Courier'
}
