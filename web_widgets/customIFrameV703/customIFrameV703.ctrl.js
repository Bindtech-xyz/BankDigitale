/**
 * The controller is a JavaScript function that augments the AngularJS scope and exposes functions that can be used in the custom widget template
 * 
 * Custom widget properties defined on the right can be used as variables in a controller with $scope.properties
 * To use AngularJS standard services, you must declare them in the main function arguments.
 * 
 * You can leave the controller empty if you do not need it.
 */
function ctrl($scope, $sce) {
    this.url = $sce.trustAsResourceUrl($scope.properties.url);
    var self = this;
    
    $scope.$watch(function(scope){
       return $scope.properties.url;
        
    },function ( newValue, oldValue ){
        self.url = $scope.properties.url;
    });
 
}