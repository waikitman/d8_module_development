(function (Drupal, $) {
    "use strict";
    Drupal.behaviors.wkmTestClock = {
        attach: function (context, settings) {
            function ticker() {
                var date = new Date();
                $(context).find('.clock').html(date.toLocaleTimeString());
            }
            var clock = '<div>The wkm-test time is <span class="clock"></span></div>';
            $(context).find('.salutation').append(clock);
            setInterval(function() {
                ticker();
            }, 1000); }
    };

}) (Drupal, jQuery);
