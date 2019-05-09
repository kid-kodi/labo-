angular.module('spa').
directive('whenScrolled', function ( $window ) {
    return function(scope, elm, attr) {
        var raw = elm[0];

        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
            console.log('ok');
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});