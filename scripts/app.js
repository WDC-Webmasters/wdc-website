'use strict';

var app = angular.module('myApp', ["firebase", "toastr"]);

/*
 * Code sets the environment variables as a constant (using window() in env.js)
 * on the module so that they can be used for config. The inject so that disableLogging()
 * can work like a normal angular function with depedencies as namespaces
 */
var env = {};
if (window) {
    Object.assign(env, window.__env);
}
app.constant('__env', env);

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

/** UNUSED FUNCTIONS
 * DEBUGGING FIREBASE DATABASE
 * Display objects loaded after promise
    obj.$loaded().then(function() {
        angular.forEach(obj, function(value, key) {
            console.log(key, value);
        });
    });
 * THREE-WAY BINDING
    obj.$bindTo($scope, "data.navLinks_object");
 * DISABLE LOGPROVIDER WITH ENVIRONMENT VARIABLE
    function disableLogging($logProvider, __env){
      $logProvider.debugEnabled(__env.enableDebug);
    }
    disableLogging.$inject = ['$logProvider', '__env'];
    app.config(disableLogging);
**/
/* References
    https://docs.angularjs.org/guide/services
    http://jsfiddle.net/e8tEX/
*/
