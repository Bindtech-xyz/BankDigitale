function ($scope, $rootScope, currencyFormatService) {
                    $scope.amount = -1234.567;
                    $scope.selectedCurrencyCode = 'USD';
                    $scope.selectedCurrencyLocaleId = 'en_US';
                    $scope.fractionSize = 0;

                    $scope.currencies = currencyFormatService.getCurrencies();
                    $scope.localeIds = currencyFormatService.getLanguages();

                    $scope.$watchGroup(['amount', 'selectedCurrencyCode', 'fractionSize'], function () {
                        $scope.currencyInfo = currencyFormatService.getByCode($scope.selectedCurrencyCode);
                    });

                    $scope.$watch('selectedCurrencyLocaleId', function () {
                        $scope.formatCurrencyAmount = currencyFormatService.getLanguageByCode($scope.selectedCurrencyLocaleId);
                    });
                }