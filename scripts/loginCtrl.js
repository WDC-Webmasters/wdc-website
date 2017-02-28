app.controller("loginCtrl", ["$scope", "toastr",
    /*
     * Toaster is included for notifications.
     * This function first calls to firebase's authentication (global to the controller).
     *     Remember to have auth by email enabled on the firebase console.
     */
    function($scope, toastr) {
        const auth = firebase.auth();
        // real-time authentication state monitor
        firebase.auth().onAuthStateChanged(firebaseUser => {
            /* 
             * When the authentication state changes, it will set $scope.isUser to true. 
             * If not it does not set anything.
             */
            if (firebaseUser) {
                console.log(firebaseUser);
                
                console.log("Sign-in provider: "+firebaseUser.providerId);
                console.log("  Provider-specific UID: "+firebaseUser.uid);
                console.log("  Name: "+firebaseUser.displayName);
                console.log("  Email: "+firebaseUser.email);
                console.log("  Photo URL: "+firebaseUser.photoURL);

                $scope.isUser = true; 
            } else {
                console.log("Not logged in.");
                //$scope.isUser = false;
            }
        });

        $scope.logIn = function(emailAddress, pass) { // Function that's called by Sign in button ngClick
            /* 
             * Function called by Sign-in Button's ng-click
             * PURPOSE: Respond to successful/unsuccessful sign-in
             */
            
            //const auth = firebase.auth();
            const promise = auth.signInWithEmailAndPassword(emailAddress, pass);    // This is our sign in promise
            promise.catch(e=>failure());    // When e has a message, pass e in a lambda/anonymous function to call failure()
            // DONE: Restrict .then(success()); to only when catch is not called already!
            promise.then(e=>success());    // success() is called after the promise... DONE: make a .success() type method work

            function success() {
                toastr.success('<small>&copy WDC Web Team :)</small>', 'Log in successful.', {
                    allowHtml: true,
                    closeButton: true,
                    progressBar: true
                });
                //var user = firebase.auth().currentUser;
                //console.log(user.uid);

            }

            function failure() {
                toastr.error("OH NO!");
            }
            var user = firebase.auth().currentUser;
            console.log(".........................................");
            console.log(user.email);
            console.log(".........................................");     
        };

        $scope.signUp = function(emailAddress, pass) {
            /*
             * Function runs on Register Button's ng-click
             * Promise creates a user with the email an password
             *     E: logs an error if there is one
             */
            const promise = auth.createUserWithEmailAndPassword(emailAddress, pass);    //  Promise creates a user with said email and password
            promise.catch(e => toastr.info(e.message,{closeButton:true,progressBar:true,timeOut:1500})); //  Log an error if there is one.
            promise.then(e=>reg());

            function reg(){
                var user = firebase.auth().currentUser;

                user.sendEmailVerification().then(function() {
                  console.log("YAY");
                }, function(error) {
                  console.log("Something went wrong.");
              });
            }
        };

        $scope.logOut = function() { 
            /*
                 * Function runs on Logout button's ng-click
                 * Signs out of firebase and lets the page know the user is no longer logged in
                 *     E: logs an error if there is one
                 * TODO: Redirect the user to either to login or the sign out page
             */
            firebase.auth().signOut();
            $scope.isUser = false;
        };

    }
]);
