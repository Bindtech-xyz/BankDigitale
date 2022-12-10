/**
 * The controller is a JavaScript function that augments the AngularJS scope and exposes functions that can be used in the custom widget template
 * 
 * Custom widget properties defined on the right can be used as variables in a controller with $scope.properties
 * To use AngularJS standard services, you must declare them in the main function arguments.
 * 
 * You can leave the controller empty if you do not need it.
 */
function($scope, $http) {
  
  getData();
  function getData() {
  $http({
  method: 'GET',
  url: '../API/identity/group?f=&c=1000'
    }).then(function successCallback(response) {
        groups = response.data;
        nodeArrayLen = groups.length;
        groups.sort(function(a, b){return a.path.split("/").length - b.path.split("/").length});

        
        //set parent paths before calling API to collect member names
        for(var i=0; i < groups.length; i++){
            nodeParent.set(groups[i].parent_path);
        }
        
        for(i=0; i < groups.length; i++){
            if(nodeParent.has(groups[i].path) && groups[i].parent_path.split("/").length >= $scope.properties.levelFrom && groups[i].parent_path.split("/").length <= $scope.properties.levelTo) {
                nodeParent.set(groups[i].path, groups[i].id);
                visJsGroup.set(groups[i].path, groupCounter);
                groupCounter++;
            }
        }
        
        //console.log("nodeParent "+ JSON.stringify(nodeParent));
        //console.log("visJS "+ JSON.stringify(visJsGroup));
        
        //make calls to set members in groups
        for(i=0; i < groups.length; i++){
            label = groups[i].displayName+ "\r\n";
            callToGetUsers(groups[i], label);
        }

    }, function errorCallback(response) {
                alert(JSON.stringify("Call to retrieve organization information failed with - "+response.statusText));
    });
  } 
}

