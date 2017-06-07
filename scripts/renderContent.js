app.controller("NavBar", ["$scope", "$firebaseObject", "$window", "transportNavRequest","$location",
    function($scope, $firebaseObject, $window, transportNavRequest,$location) {
        let ref = firebase.database().ref("navLinks");
        var obj = $firebaseObject(ref);



        $scope.data = {navLinks_object: obj};

        $scope.setPage = function(page_to_create){
            /* calls transportNavRequestRequest service and puts in page_to_create */
            $scope.data = page_to_create;
            console.log(page_to_create);
            transportNavRequest.set($scope.data);
            $window.location.hash="";
            $window.location.href = "newPage.html";
            //$location.path("/hi");
        }
        /*TODO: get the page to preserve the navBar on a state change or refresh it*/
    }
]);
app.controller("CreatedPage", ["$scope", '$sce', "transportNavRequest",
    function($scope, $sce, transportNavRequest){
        /* pulls the curent content from the transportNavRequest service and renders it*/
        $scope.currentPage = transportNavRequest.get();
    	$scope.newHtml = $sce.trustAsHtml($scope.currentPage.linkContent);
    }
]);

app.factory('transportNavRequest', function ($window) {
    function set(data) {
        $window.sessionStorage.setItem('page', JSON.stringify(data));
        /*angular.forEach($window.sessionStorage.page, function(value, key) {
            console.log(key, value);
        });*/
    };
    function get() {
        var temp = $window.sessionStorage.getItem('page');
        var object = $.parseJSON(temp);
        return object;
    };
    return {
        set: set,
        get: get
    };
});
