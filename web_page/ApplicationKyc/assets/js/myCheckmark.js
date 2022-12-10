'use strict';
(function() {

angular.module('pb.generator').filter('checkmark', function() {
    return function(input) {
        if (angular.isUndefined(input) || input === null)
            return '';
        // myHtmlVar="<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>";
        // return input ? 'myHtmlVar' : '\u2718';
        return input ? '\u2713' : '\u2718';
    };
});

angular.module('pb.generator').filter('unsafe', function($sce) {
    return function(val) {
           return $sce.trustAsHtml(val);
    };
});


})();


