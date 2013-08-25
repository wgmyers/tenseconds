// components.js

// Our basic counter component
Crafty.c('Counter', {

    // Ten is the magic number
    init: function() {
        this.attr({
            val: 10
        })
    },

    // Decrement value
    dec: function() {
        this.val -= 1;
        return this;
    },

    
});
