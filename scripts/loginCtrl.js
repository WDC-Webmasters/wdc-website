'use strict';

app.controller("loginCtrl", ["$scope", "toastr", "$window",
    /*
     * Toaster is included for notifications.
     * This function first calls to firebase's authentication (global to the controller).
     *     Remember to have auth by email enabled on the firebase console.
     */
    function ($scope, toastr, $window) {
        const auth = firebase.auth();

        // real-time authentication state monitor
        firebase.auth().onAuthStateChanged(firebaseUser => {
            /*
             * When the authentication state changes, it will set $scope.isUser to true.
             * If not it does not set anything.
             */
            if (firebaseUser) {
                console.log(firebaseUser);

                /*console.log("Sign-in provider: " + firebaseUser.providerId);
                console.log("  Provider-specific UID: " + firebaseUser.uid);
                console.log("  Name: " + firebaseUser.displayName);
                console.log("  Email: " + firebaseUser.email);
                console.log("  Photo URL: " + firebaseUser.photoURL);
                console.log(firebaseUser.providerData);*/
                $scope.userInfo = firebaseUser;
                $scope.isUser = true;
            } else {
                console.log("Not logged in.");
                //$scope.isUser = false;
            }
        });
        console.log($scope);

        //  Event listener for file Upload
        $scope.fileUp = function (e) {

            var file = e.target.files[0];
            console.log(file.name);
            // Get a reference to the storage service, which is used to create references in your storage bucket
            var storage = firebase.storage();

            // Create a storage reference from our storage service
            var storageRef = storage.ref('pdf_forms/' + new Date().getFullYear() + '/' +
                $scope.userInfo.uid);
            var task = storageRef.put(file);

            task.on('state_changed',
                function progress(snapshot) {
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploader.value = percentage;
                },
                function error(err) {

                },
                function complete() {
                    $scope.loaded = true;
                }


            );

            console.log("hfjkds");
            console.log(e.target.files[0].name); // TODO: Why is this undefined?
        }





        $scope.logIn = function (emailAddress, pass) { // Function that's called by Sign in button ngClick
            /*
             * Function called by Sign-in Button's ng-click
             * PURPOSE: Respond to successful/unsuccessful sign-in
             */

            //const auth = firebase.auth();


            //console.log("...HI>..");
            //console.log(users);

            const promise = auth.signInWithEmailAndPassword(emailAddress, pass); // This is our sign in promise
            promise.catch(e => failure()); // When e has a message, pass e in a lambda/anonymous function to call failure()
            // DONE: Restrict .then(success()); to only when catch is not called already!
            console.log(promise);
            //if ($scope.userInfo.emailVerified) { // In the case that you verified your account with the email we sent
            promise.then(e => success(e.emailVerified)); // success() is called after the promise... DONE: make a .success() type method work
            //} else { // If you didn't verify your account
            //toastr.info("Please verify your email with the link we sent in order to login.");
            //}

            function success(value) { // There is a valid account
                if (value) { // account is verified
                    //$window.location.href = "homepage.html";
                    $window.location.href = "user.html";
                    /*toastr.success('<small>&copy WDC Web Team :)</small>', 'Log in successful.', {
                        allowHtml: true,
                        closeButton: true,
                        progressBar: true
                    });*/
                } else { // account is not yet verified
                    toastr.info("Please verify your email with the link we sent in order to login.");
                }
                //var user = firebase.auth().currentUser;
                //console.log(user.uid);

            }

            function failure() {
                toastr.error("Please double check your email and password.", "OH NO!");
            }
            var user = firebase.auth().currentUser;
            console.log(".........................................");
            //console.log(user.email);
            console.log(".........................................");
        };

        $scope.signUp = function (emailAddress, pass) {
            console.log($scope.userInfo.uid);

            /*
             * Function runs on Register Button's ng-click
             * Promise creates a user with the email an password
             *     E: logs an error if there is one
             */
            const promise = auth.createUserWithEmailAndPassword(emailAddress, pass); //  Promise creates a user with said email and password
            promise.catch(e => toastr.info(e.message, {
                closeButton: true,
                progressBar: true,
                timeOut: 1500
            })); //  Log an error if there is one.
            promise.then(e => reg());
            console.log($scope.userInfo.uid);
            console.log($scope.userInfo.uid);

            function reg() {
                var user = firebase.auth().currentUser;
                user.sendEmailVerification().then(function () {
                    console.log("YAY");
                }, function (error) {
                    console.log("Something went wrong.");
                });
                console.log($scope.userInfo.uid);

                //  Make a connection to a defined path by the uid and save profile data there
                // Position of code is here to allow the callback for user state change to populate the data so we don't get undefined
                var users = firebase.database().ref("users/" + $scope.userInfo.uid); // Path to our user's database part (acc. to uid)
                var data = { // What to save
                    email: $scope.userInfo.email,
                    permissions: "isFrozen"
                }
                console.log($scope.userInfo.uid);

                users.set(data); // Puts the value of data in the user database path
            }
        };


        $scope.pswdRST = function (em) {
            var auth = firebase.auth();

            auth.sendPasswordResetEmail(em).then(function () {
                // Email sent.
                toastr.success("A password recovery email was sent.");
            }, function (error) {
                // An error happened.
                toastr.error("Would you like to create an account?", "Oh no! This email is not registered.");
            });
        };


        $scope.logOut = function () {
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
