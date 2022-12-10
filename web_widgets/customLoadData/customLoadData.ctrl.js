function ($scope,$http) {
    $http({
        method: 'GET',
        url: $scope.properties.restUrl
        }).then(function successCallback(response) {
            console.log("3 -  Login Initialized "+ $scope.url);
            //alert(JSON.stringify("Call to retrieve organization information failed with - " + $scope.url));
            $scope.properties.value = response.data;
        }, function errorCallback(response) {
            //alert(JSON.stringify("Call to retrieve organization information failed with - " + response.statusText));
            $scope.message = "Erreur Survenue au moment de la Connexion URL : " + $scope.properties.restUrl;
        });
}
