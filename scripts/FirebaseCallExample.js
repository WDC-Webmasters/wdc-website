app.config(function(toastrConfig) {
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
app.controller("FirebaseCall", ["$scope", "$firebaseObject",
    function($scope, $firebaseObject) {
        //these are references to the configured database object we config
        var ref = firebase.database().ref();
        var obj = $firebaseObject(ref);

        //$loaded() waits until data loads, then logs it
        obj.$loaded().then(function() {
            /*this logs obj with the following props
              $$conf: {sync: Object, ref: U, binding: Object, listeners: Array}
              $id: null
              $priority: null
              $resolved: true
              navLinks: {-KbwamPe2eeXeZsvEKYz: Object, -Kbx8jJJovFy9amnCChK: Object, -KbxV0LwepYPxiLe9n4J: Object}
            */
            console.log("loaded record:", obj);

            // To iterate the key/value pairs of the object, use angular.forEach()
            console.log("All of the objects for navLinks: ");
            angular.forEach(obj, function(value, key) {
                //the key = navLinks, the values = objects
                console.log(key, value);
            });
        });

        $scope.data = obj; //this is an array of obj (for binding in DOM)

        /* Other Code
          //idk what this does. "For three-way data bindings, bind it to the scope instead"

          obj.$bindTo($scope, "data");
          $scope.pageContent = "";
          $scope.name = "";
          $scope.LinkLoc = "";
          $scope.confirmPageCreation = function(){
              var data ={
                  name:$scope.name,
                  linkContent: $scope.pageContent,
                  dateCreated: getTime(),
                  isActive: true,
                  routeLink: $scope.LinkLoc
              }
              ref.push(data);
              alert("Page created!");
          }
        */
    }
]);

/* Source
  https://github.com/firebase/angularfire
  https://firebase.googleblog.com/2013/03/where-does-firebase-fit-in-your-app.html
*/
