/**
 * The controller is a JavaScript function that augments the AngularJS scope and exposes functions that can be used in the custom widget template
 * 
 * Custom widget properties defined on the right can be used as variables in a controller with $scope.properties
 * To use AngularJS standard services, you must declare them in the main function arguments.
 * 
 * You can leave the controller empty if you do not need it.
 */
function($scope, $http) {
  
  displayDiagram();
  $scope.$watch('properties.levelFrom', displayDiagram);
  $scope.$watch('properties.levelTo', displayDiagram);
  $scope.$watch('properties.groupToDisplay', displayDiagram);  
  function displayDiagram() {
      
  
  //call to get organization info
  var groups = [];
  var members = [];
  var label = "";
  var path = "";
  var nodes = [];
  var edges = [];
  var nodePeers = new Map();
  var nodeParent = new Map();
  var visJsGroup = new Map();
  var allParentPaths = [];
  var nodeCounter = 0;
  var groupCounter = 1;
  var nodeArrayLen = 0;
  var oldLengthCounter = 3
  visJsGroup.set("", 0);
  
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
function callToGetUsers(group, label){
        var insideLabel = label;
        $http({
                method: 'GET',
                url: '../API/identity/user?p=0&c=1000&o=&f=group_id='+group.id
                }).then(function successCallback1(response) {
                        
                        
                        var members = response.data;
                        for(var n=0; n < members.length; n++){
                            insideLabel += "\r\n"+ members[n].firstname+" "+members[n].lastname;
                        }
                        
                         
                        if(nodeParent.has(group.parent_path) && group.parent_path.split("/").length >= $scope.properties.levelFrom && group.parent_path.split("/").length <= $scope.properties.levelTo) {
                            edges.push({from:nodeParent.get(group.parent_path), to:group.id});
                            nodes.push({id: group.id, label: insideLabel, shape:"", group: visJsGroup.get(group.parent_path)});
                            groupCounter++;
                        }
                        nodeCounter ++;
                        if(nodeCounter === nodeArrayLen){
                            var orgData = {"nodes":nodes, "edges":edges};

                            // create a network
                            var container = document.getElementById('mypeoplenetwork');

                            var levelColors = [""];
                            if($scope.properties.levelColors !== null) {
                                levelColors = $scope.properties.levelColors.split(',');
                            }

                            var fontColors = [""];
                            if($scope.properties.fontColors !== null) {
                                fontColors = $scope.properties.fontColors.split(',');
                            } 

                            var options = {
                                physics: {
                                    enabled: true,
                                    hierarchicalRepulsion: {
                                        centralGravity: 0.0,
                                        springLength: 1,
                                        springConstant: 0.01,
                                        nodeDistance: 150,
                                        damping: 0.85
                                    },
                                    solver: 'hierarchicalRepulsion'
                                },
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
                                    smooth: {
                                        type: $scope.properties.lineShape,
                                        forceDirection: 'vertical'
                                    }
                                }
                            };


                            var network = new vis.Network(container, orgData, options);
                            
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
                            network.on("stabilizationProgress", function(params) {
                                });
                
                            network.once("stabilizationIterationsDone", function() {
                                document.getElementById("loadingPeopleDiv").style.display=" none";
                                }); 
                            }); 
                            
                            network.on("click", function(e) {
                                network.fit();
                            });
                        }
                        //console.log("inside nodes are" + JSON.stringify(nodes));
                                                    
                    }, function errorCallback(response) {
                         alert(JSON.stringify("Call to retrieve organization member information failed with - "+response.statusText));
                    });
                                        
               return;
    }
  } 
}

