/****************************************************************************
	jquery-hammer.js.js, 

	(c) 2017, FCOO

	https://github.com/FCOO/jquery-hammer.js
	https://github.com/FCOO

****************************************************************************/

(function ($, Hammer) {
	"use strict";
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