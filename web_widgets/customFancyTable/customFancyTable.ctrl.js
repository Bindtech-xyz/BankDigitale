function FancyTableCtrl($scope,$http, $timeout) {

  this.isArray = Array.isArray;

  this.isClickable = function () {
    return $scope.properties.isBound('selectedRow');
  };

  this.selectRow = function (row) {
    if (this.isClickable()) {
      $scope.properties.selectedRow = row;
    }
  };
  
  $scope.assignMe = function(taskId, userId){
   $http.put('/bonita/API/bpm/humanTask/'+ taskId, { assigned_id : userId});
		 
  };
    

    $timeout(function() {
        $('table.fancyTable')
        .on( 'order.dt',  function () { } )
        .on( 'search.dt', function () { } )
        .on( 'page.dt',   function () { } )
        .dataTable({
            "order": [[ 0, "desc" ]],
            "retrieve": true,
        });
    }, 1000);

}
