/**
 * The controller is a JavaScript function that augments the AngularJS scope and exposes functions that can be used in the custom widget template
 * 
 * Custom widget properties defined on the right can be used as variables in a controller with $scope.properties
 * To use AngularJS standard services, you must declare them in the main function arguments.
 * 
 * You can leave the controller empty if you do not need it.
 */


function($scope, $http) {
  //call to get organization info
  var data = [];
  
  displayDiagram();
  $scope.$watch('properties.levelFrom', displayDiagram);
  $scope.$watch('properties.levelTo', displayDiagram);
  $scope.$watch('properties.groupToDisplay', displayDiagram);
  
  function displayDiagram(){
  console.log("called!");
  $http({
  method: 'GET',
  url: '../API/identity/group?f=&c=10000'
    }).then(function successCallback(response) {
        data = response.data;

        //create data set from response for diagram
        var nodes = [];
        var nodeCounter = 0; 
        var edges = [];
        var groupCounter = 1;
        var nodeParent = new Map();
        var nodePeers = new Map();
        
        //set parent paths and groups
        for(var i=0; i < data.length; i++){
            if(data[i].path.split("/")[1] === $scope.properties.groupToDisplay){
                nodeParent.set(data[i].parent_path);
            }
        }
        
        for(i=0; i < data.length; i++){
            nodeParent.set("",0);
            if(nodeParent.has(data[i].path)){
                nodeParent.set(data[i].path, data[i].id);
                groupCounter++;
            }
        }
        
        //create nodes and edges (connections to other nodes)
        
        var levelCounter = 0;
        var previousParent = data[0].parentPath;

        for(i=0; i < data.length; ++i){
            
            if(data[i].path.split("/")[1] === $scope.properties.groupToDisplay && data[i].parent_path.split("/").length >= $scope.properties.levelFrom && data[i].parent_path.split("/").length <= $scope.properties.levelTo) {
                edges.push({from:nodeParent.get(data[i].parent_path), to:data[i].id});
                nodes.push({id: data[i].id, label: data[i].displayName, shape: $scope.properties.shape, group: nodeParent.get(data[i].parent_path)});
            }    
        }
        
        var orgData = {"nodes":nodes, "edges":edges};
    
        // create a network
        var container = document.getElementById('mynetwork');
  
        var levelColors = [""];
        if($scope.properties.levelColors !== null) {
            levelColors = $scope.properties.levelColors.split(',');
        }
  
        var fontColors = [""];
        if($scope.properties.fontColors !== null) {
            fontColors = $scope.properties.fontColors.split(',');
        } 
        
        var options = {
            layout: {
                hierarchical: {
                    direction: $scope.properties.hierarchy,
                    levelSeparation: $scope.properties.levelSeparation
                }
            }, 
            nodes: {
                shadow: $scope.properties.shadow
            },
            edges: {
                shadow:$scope.properties.shadow,
                physics:true,
                smooth: {
                    type: $scope.properties.lineShape,
                    forceDirection: 'vertical'
                }
            }
        };
  

        var network = new vis.Network(container, orgData, options);
        
        network.on("stabilizationProgress", function(params) {
                
        });
        network.once("stabilizationIterationsDone", function() {
                document.getElementById("loadingDiv").style.display=" none";
                
        }); 
  
        network.on("afterDrawing", function(e) {
            network.fit();
            for(var i=0; i< orgData.nodes.length; ++i) {
                orgData.nodes[i].shape = $scope.properties.shape;
                if (levelColors.length > 0 && levelColors[0] !== "") {
                    orgData.nodes[i].color = levelColors[orgData.nodes[i].group];
                }
                if (fontColors.length > 0 && fontColors[0] !== "") {
                    orgData.nodes[i].font = { color: fontColors[orgData.nodes[i].group] };
                }
            } 
            network = new vis.Network(container, orgData, options);
        }); 
      
        network.on("click", function(e) {
            network.fit();
        }); 
    }, function errorCallback(response) {
        alert(JSON.stringify("Call to retrieve organization information failed with - "+response.statusText));
    });
  }
}
  