var app = angular.module('myApp', ["firebase","toastr"]);
<<<<<<< HEAD

var env = {};
// Import variables if present (from env.js)
if(window){
  Object.assign(env, window.__env);
}
app.constant('__env', env);

function disableLogging($logProvider, __env){
  $logProvider.debugEnabled(__env.enableDebug);
}

// Inject dependencies
disableLogging.$inject = ['$logProvider', '__env'];

app.config(disableLogging);
app.config(function(toastrConfig) {

=======

app.config(function(toastrConfig) {
    
>>>>>>> 4296c4c... Toastr and Login
    var config = {
        // This tells firebase where to look.
        apiKey: __env.apiKey,
        authDomain: __env.authDomain,
        databaseURL: __env.databaseURL,
        storageBucket: __env.storageBucket,
        messagingSenderId: __env.messagingSenderId
    };
    firebase.initializeApp(config); // Initialize this app with your look info
});

app.controller("MainController", ["$scope", "$firebaseObject", "$window", "$http",
    function($scope, $firebaseObject, $window) {
        var ref = firebase.database().ref();
        var obj = $firebaseObject(ref);

        /* To take an action after the data loads, use the $loaded() promise */
        obj.$loaded().then(function() {
            /* To iterate the key/value pairs of the object, use angular.forEach() */
            angular.forEach(obj, function(value, key) {
                console.log(key, value);
            });
        });
        // For three-way data bindings, bind it to the scope instead
        obj.$bindTo($scope, "data.object");

        /* Set the data as an object because of above and log it. */
        $scope.data = {
            // To make the object available in the DOM, assign it to $scope
            object: obj,
            name: "default",
            currentPage: "default",
            currentPageContent: "default",
        };
        console.log($scope.data.object);

        /* Set the prop to the parent */
        $scope.setObjectProp = function(prop) {
            $scope.data.name = prop;
            console.log($scope.data);
            /*
            so it's changing it just not updating it just
            not persisting it in the next window below
            */
            //$window.location.href = "apage.html";


        }
    }
]);
/*
https://docs.angularjs.org/guide/services
http://jsfiddle.net/e8tEX/
*/
