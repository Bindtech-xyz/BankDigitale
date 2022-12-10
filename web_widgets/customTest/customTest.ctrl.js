
function controller ($scope) {

var tableUpdates = [];
var newValue = [];
var tableRows = [];

// Wait for data from API call
$scope.$watch(function(scope) { return scope.properties.clientIndice },
function(newValue, oldValue) {
tableRows = newValue;

// Then carry on doing stuff...

}); // end of watch function
} // end of controller