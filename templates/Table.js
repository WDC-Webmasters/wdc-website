'use strict';
angular.module('myApp', ['dataGrid', 'pagination', 'ngMaterial'])

    .controller('Table', ['$scope', 'myAppFactory', 'userDetails', function ($scope, myAppFactory, userDetails) {
        $scope.gridOptions = {
            data: [],
            urlSync: true
        };
        myAppFactory.getData().then(function (responseData) {
            //console.log(responseData.data);
            $scope.gridOptions.data = responseData.data;
        });

        $scope.getUser = function (input) {
            //userDetails.setData(input);
            //console.log(userDetails.getData());
            console.log(input.student.firstName)
            //console.log(input.student)
            window.location.href = "UserTable_student.html";
            $scope.st = input.student.firstName;
        }

        console.log($scope.st);

    }])

    .controller('UserP', ['$scope', 'userDetails', function ($scope, userDetails) {
        $scope.currentPerson = userDetails.getData();
        //console.log($scope.currentPerson);



    }])



    .factory('myAppFactory', function ($http) {
        return {
            getData: function () {
                return $http({
                    method: 'GET',
                    //url: 'https://raw.githubusercontent.com/jayber12/testData/master/data.json'
                    //url:'https://angular-data-grid.github.io/demo/data.json'
                    url: 'WDCUser.json'
                });
            }
        }
    })




    .service('userDetails', function () {
        var data = {};
        return {
            getData: function () {
                return data;
            },
            setData: function (x) {
                data = x;
            }
        };
    });
