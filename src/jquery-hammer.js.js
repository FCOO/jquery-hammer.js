/****************************************************************************
	jquery-hammer.js.js,

	(c) 2017, FCOO

	https://github.com/FCOO/jquery-hammer.js
	https://github.com/FCOO

****************************************************************************/
(function ($, Hammer) {
	"use strict";

    /****************************************************************
    Copied from https://github.com/hammerjs/jquery.hammer.js
    *****************************************************************/
    function hammerify(el, options) {
        var $el = $(el);
        if(!$el.data("hammer")) {
            $el.data("hammer", new Hammer($el[0], options));
        }
    }

    $.fn.hammer = function(options) {
        return this.each(function() {
            hammerify(this, options);
        });
    };

    // extend the emit method to also trigger jQuery events
    Hammer.Manager.prototype.emit = (function(originalEmit) {
        return function(type, data) {
            originalEmit.call(this, type, data);
            $(this.element).trigger({
                type: type,
                gesture: data
            });
        };
    })(Hammer.Manager.prototype.emit);
    //****************************************************************

    var hammerEvents = [
        {
            events: 'pan panstart panmove panend pancancel panleft panright panup pandown',
            recognizer: 'pan',
            options: { direction: Hammer.DIRECTION_ALL }
        },
        {
            events: 'pinch pinchstart pinchmove pinchend pinchcancel pinchin pinchout',
            recognizer: 'pinch',
            options: { enable: true }
        },
        {
            events: 'press pressup',
        },
        {
            events: 'rotate rotatestart rotatemove rotateend rotatecancel',
            recognizer: 'rotate',
            options: { enable: true }
        },
        {
            events: 'swipe swipeleft swiperight swipeup swipedown',
            recognizer: 'swipe',
            options: { direction: Hammer.DIRECTION_ALL }
        },
        {
            events: 'tap doubletap'
        }
    ];


    $.each( hammerEvents, function( index, hammerEvent ){
        var events = hammerEvent.events.split(' ');
        $.each( events, function( index, event ){
            $.event.special[event] = {
                setup:  function( /*data, namespaces, eventHandle*/ ){
                            $(this).hammer();
                            if (hammerEvent.recognizer)
                                $(this).data('hammer').get(hammerEvent.recognizer).set(hammerEvent.options);
                        }
            };
        });
    });

}(jQuery, window.Hammer));