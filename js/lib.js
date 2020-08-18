'use strict';
(function () {
    const ESC_KEYCODE = 27;
    const ENTER_KEYCODE = 13;
    window.lib = {
        isEscPress: function(evt){
            return evt.keyCode === ESC_KEYCODE;
        },
        isEnterPress: function(evt){
            return evt.keyCode === ENTER_KEYCODE;
        },
        debounce: function (fun){
            var lastTimeout = null;
            return function() {
                var args = arguments;
                if (lastTimeout) {
                    window.clearTimeout(lastTimeout);
                }
                lastTimeout = window.setTimeout(function() {
                    fun.apply(null, args);
                }, 300);
            };
        }
    }
})()