var app = angular.module('myApp', ["firebase", 'toastr']);

/* 
 * Code sets the environment variables as a constant (using window() in env.js) 
 * on the module so that they can be used for config. The inject so that disableLogging()
 * can work like a normal angular function with depedencies as namespaces 
*/
var env = {};
if(window){
    Object.assign(env, window.__env);
}
app.constant('__env', env);
    
function disableLogging($logProvider, __env){
  $logProvider.debugEnabled(__env.enableDebug);
}
disableLogging.$inject = ['$logProvider', '__env'];

/* Config Functions*/
app.config(disableLogging);

app.config(function() {

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

app.controller("MainController", ["$scope", "$firebaseObject", "$window",
    function($scope, $firebaseObject, $window, toastr) {
        var ref = firebase.database().ref();
        var obj = $firebaseObject(ref);

        /* To take an action after the data loads, use the $loaded() promise */
        obj.$loaded().then(function() {
            // To iterate the key/value pairs of the object, use angular.forEach()
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
        //console.log($scope.data.object);

        /* Set the prop to the parent */
        $scope.setObjectProp = function(prop) {
            $scope.data.name = prop;
            console.log($scope.data);
            /*
            so it's changing it just not updating it just
            not persisting it in the next window below
            */
            //$window.location.href = "apage.html";

            toastr.success('Hello world!', 'Toastr fun!');

        }
    }
]);

/* References
https://docs.angularjs.org/guide/services
http://jsfiddle.net/e8tEX/
*/
