function ($scope, $filter) {


    var vm = this;
    var shadow = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png';
    var blueIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: shadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var redIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: shadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var greenIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: shadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var orangeIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
        shadowUrl: shadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    this.getMapMarkers = function () {
        if (!vm.vMapMarkers) {
            vm.vMapMarkers = new Array();
        }
        return vm.vMapMarkers;
    }

    this.getMap = function () {
        if (!vm.vMap) {
            vm.vMap = L.map('map');
        }
        return vm.vMap;
    }

    this.getFiltered = function () {
        var ret = $scope.properties.markers;
        if ($scope.properties.filters) {
            ret = $filter('filter')($scope.properties.markers || [], $scope.properties.filters || undefined);

        }
        //console.log ("getFiltered",ret);
        return ret;
    }

    function clearMarkers() {
        var currentMap = vm.getMap();
        var mapMarkers = vm.getMapMarkers();
        //console.log("clear markers filter");
        for (var i = 0; i < mapMarkers.length; i++) {
            currentMap.removeLayer(mapMarkers[i]);

        }
        mapMarkers.splice(0, mapMarkers.length);
    }

    function addMarkers() {
        var mapMarkers = vm.getMapMarkers();
        var currentMap = vm.getMap();
        //console.log("using filter", $scope.properties.filters);
        var filtered = vm.getFiltered();
        //$filter('filter')($scope.properties.markers || [], $scope.properties.filters || undefined);
        //console.log("add markers", filtered);
        for (var i = 0; i < filtered.length; i++) {
            var item = filtered[i];
            //console.log("add marker:",item.latitude,item.longitude);
            var itemIcon = blueIcon;
            if (item.severity) {
                if (item.severity === 'Low') {
                    itemIcon = greenIcon;
                } else if (item.severity === 'Medium') {
                    itemIcon = orangeIcon;
                } else if (item.severity === 'High') {
                    itemIcon = redIcon;
                }
            }

            //console.log("icon:",itemIcon,item.severity,item.city);
            var layerMarker = new L.marker([item.latitude, item.longitude], {icon: itemIcon});
            var popupContent = getPopupContent(item);
            if (popupContent.length > 0) {
                layerMarker.bindPopup(popupContent);
            }
            mapMarkers.push(layerMarker);
            currentMap.addLayer(mapMarkers[i]);
        }
    }

    function resetMarkers() {
        clearMarkers();
        addMarkers();
    }

    function getItemColor(item) {
        var itemColor = 'blue';
        if (item.severity) {
            if (item.severity === 'Low') {
                itemColor = 'green';
            } else if (item.severity === 'Medium') {
                itemColor = 'orange';
            } else if (item.severity === 'High') {
                itemColor = 'red';
            }
        }
        return itemColor;
    }

    function getPopupContent(item) {
        var popupContent = '';
        if (item.title) {
            popupContent += "<h2>" + item.title + "</h2>";
        }
        if (item.description && item.city) {
            popupContent += "<p><b>" + item.city + "</b> - " + item.description + "</p>";
        }
        if (item.category && item.severity && item.source) {
            popupContent += "<p>" + item.category;
            popupContent += " | <span class='" + getItemColor(item) + "'>" + item.severity + "</span>";
            popupContent += " | via " + item.source;
            popupContent += "</p>";
        }
        return popupContent;
    }

    function centerMap() {
        var currentMap = vm.getMap();
        var item = $scope.properties.selected;
        if (!item) {
            // Paris
            item = {latitude: 48.852969, longitude: 2.349903};
        } else {
            var popupContent = getPopupContent(item);
            if (popupContent.length > 0) {
                L.popup()
                    .setLatLng([item.latitude, item.longitude])
                    .setContent(popupContent)
                    .openOn(currentMap);
            }
        }
        currentMap.flyTo([item.latitude, item.longitude], 6);
    }


    this.initMap = function () {
        //Paris
        var lat = 48.852969;
        var lon = 2.349903;
        var currentMap = vm.getMap();
        currentMap.setView([lat, lon], 5);
        //  set openstreetmap.fr as map server
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            // license
            attribution: 'data © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - from <a href="//openstreetmap.fr">OSM France</a>',
            minZoom: 1,
            maxZoom: 20
        }).addTo(currentMap);
        resetMarkers();
        $scope.$watch('[properties.filters,properties.markers]', resetMarkers, true);
        $scope.$watch('[properties.selected]', centerMap, true);
    }
    this.initMap();
}
