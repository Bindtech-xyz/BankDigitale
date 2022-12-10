function ($scope, $rootScope, currencyFormatService) {
    //$scope.amount = -1234.567;
    //$scope.selectedCurrencyCode = 'USD'; properties.value
    //$scope.selectedCurrencyCode = $scope.properties.value;
    //$scope.selectedCurrencyLocaleId = 'en_US';
    $scope.fractionSize = 0;

    $scope.currencies = currencyFormatService.getCurrencies();
    $scope.localeIds = currencyFormatService.getLanguages();

    $scope.$watchGroup(['properties.value', 'fractionSize'], function () {
        $scope.properties.fullValue = currencyFormatService.getByCode($scope.properties.value);
    });

    $scope.$watch('selectedCurrencyLocaleId', function () {
        $scope.formatCurrencyAmount = currencyFormatService.getLanguageByCode($scope.selectedCurrencyLocaleId);
    });
}