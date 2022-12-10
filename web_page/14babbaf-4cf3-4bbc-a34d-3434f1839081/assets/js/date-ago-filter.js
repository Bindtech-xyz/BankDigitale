angular.module('bonitasoft.ui.extensions')
  .filter('dateAgo', ['$window', function ($window) {
    return function dateAgo(input) {
      var compar = new Date(input);
      return $window.moment(compar).fromNow();
    };
}]);
