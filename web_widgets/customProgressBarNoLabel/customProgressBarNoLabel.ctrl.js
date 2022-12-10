/**
 * The controller is a JavaScript function that augments the AngularJS scope and exposes functions that can be used in the custom widget template
 * 
 * Custom widget properties defined on the right can be used as variables in a controller with $scope.properties
 * To use AngularJS standard services, you must declare them in the main function arguments.
 * 
 * You can leave the controller empty if you do not need it.
 */
function progressBar($scope, $timeout, $sce) {
    $scope.clase = "progress";
    $scope.type = "success";
    
    var ctrl = this;
    ctrl.diff = 0;
    //var diff = parseInt($scope.properties.total, 10) - parseInt($scope.properties.value.daysAvailableCounter, 10);
    //var diff = $scope.properties.total - $scope.properties.value;
  
    $scope.$watch('properties.value.daysAvailableCounter', function(scope){
       //console.log("watch: ",scope);
       ctrl.diff = $scope.properties.total - scope;
       //console.log("newDiff: ", diff);
       
       if(ctrl.diff > ($scope.properties.total / 2) ){
            if(ctrl.diff >= (4*$scope.properties.total / 5)){
                $scope.type = "danger";
                $scope.clase += " active";
            }else{
                $scope.type = "warning";
            }
        }
        
    });
    
    
    // console.log("parseInt(n,10): ", parseInt($scope.properties.value,10));
    // console.log("total: ", $scope.properties.total);
    // console.log("la diferencia: ", diff);
    // console.log("la mitad: ", $scope.properties.total / 2);
    // console.log("2/3: ", 4*$scope.properties.total / 5);
    
    
}