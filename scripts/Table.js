angular.module('myApp', ['dataGrid', 'pagination', 'ngMaterial'])

.controller('Table', ['$scope', 'myAppFactory', function($scope, myAppFactory) {
     $scope.gridOptions = {
            data: [],
            urlSync: true
        };
        myAppFactory.getData().then(function (responseData) {
            console.log(responseData.data);
            $scope.gridOptions.data = responseData.data;
        });
}])

.factory('myAppFactory', function ($http) {
    return { getData: function () {
        return $http({
            method: 'GET',
            //url: 'https://raw.githubusercontent.com/jayber12/testData/master/data.json'
            //url:'https://angular-data-grid.github.io/demo/data.json'
            url:'WDCUser.json'
        });
    }}
});
