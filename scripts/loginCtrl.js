<<<<<<< HEAD
app.controller("loginCtrl", ["$scope", "$firebaseObject", "$window", "$http","toastr",
    function($scope, $firebaseObject, $window, $http,toastr) {
const auth = firebase.auth();
        // Realtime authentication state change listener

                firebase.auth().onAuthStateChanged(firebaseUser => {

                    if(firebaseUser){
                        console.log(firebaseUser);
                        $scope.isUser = true;
                    }
                    else{
                        console.log("Not logged in.");
                        //$scope.isUser = false;
                    }
                    });

        $scope.logIn = function(emailAddress,pass){
            //console.log(emailAddress,pass);
            //var toast = toastr.error('You are not allowed to do this!');



            const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(emailAddress,pass);
        promise.catch(e => console.log(e.message));

        toastr.success('<small>&copy WDC Web Team :)</small>', 'Log in successful.', {
         allowHtml: true,
         closeButton: true,
         progressBar: true
       });
        }

        $scope.signUp = function(emailAddress,pass){

            const promise = auth.createUserWithEmailAndPassword(emailAddress,pass);
            promise.catch(e=>console.log(e.message));
        }





        $scope.logOut = function(){
            firebase.auth().signOut();
            $scope.isUser = false;
        }


}
]);
=======
app.controller("loginCtrl", ["$scope", "$firebaseObject", "$window", "$http","toastr",
    function($scope, $firebaseObject, $window, $http,toastr) {

        $scope.logIn = function(emailAddress,pass){
            //console.log(emailAddress,pass);
            //var toast = toastr.error('You are not allowed to do this!');



            const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(emailAddress,pass);
        promise.catch(e => console.log(e.message));

        toastr.success('<small>&copy WDC Web Team :)</small>', 'Log in successful.', {
         allowHtml: true,
         closeButton: true,
         progressBar: true
       });
        }

        $scope.signUp = function(emailAddress,pass){
            const auth = firebase.auth();
            const promise = auth.createUserWithEmailAndPassword(emailAddress,pass);
            promise.catch(e=>console.log(e.message));
        }

// Realtime authentication state change listener
$scope.isUser = false;
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                console.log(firebaseUser);
                $scope.isUser = true;
            }
            else{
                console.log("Not logged in.");
                $scope.isUser = false;
            }
        });

}
]);
>>>>>>> 4296c4c... Toastr and Login
