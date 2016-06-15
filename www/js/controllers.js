angular.module('app.controllers', [])

.controller('LoginCtrl', ['$rootScope', '$scope', '$state', 'localStorageService', 'UserService',
    function($rootScope, $scope, $state, localStorageService, UserService) {

        //If user is already logged in take them to dashboard
        var user = localStorageService.get('user');

        if (user) {
            $rootScope.user = JSON.parse(user);
            $state.go("dashboard");
        }

        $scope.loginDo = function(login) {
            if (login.phone !== '' && login.pin !== '') {
            UserService.GetById(login.phone,login.pin).then(function(result){
                console.log(result.data);
                if(result.data.length > 0){
                $rootScope.user = result.data;
                localStorageService.set('user',JSON.stringify(result.data));
                $state.go("dashboard");
            }
            });

            }
        };

    }
])

// .controller('LoginCtrl', ['$rootScope', '$scope', '$state', 'localStorageService', 'AuthenticationService',
//     function($rootScope, $scope, $state, localStorageService, AuthenticationService) {

//         //If user is already logged in take them to dashboard
//         var user = localStorageService.get('user');

//         if (user) {
//             $rootScope.user = JSON.parse(user);
//             $state.go("dashboard");
//         }

//         $scope.loginDo = function(login) {
//             if (login.phone !== '' && login.pin !== '') {
//                 // localStorageService.set('uid', 123);
//                 // $state.go("dashboard");
//                 // AuthenticationService.Login(login.phone, login.pin, function(data) {
//                 //     if (data.error) {

//                 //     } else {
//                 //         $rootScope.user = data;
//                 //         localStorageService.set('user', JSON.stringify(data));
//                 //         $state.go("dashboard");
//                 //     }
//                 });
//               console.log(data);
//             }
//         };

//     }
// ])

.controller('signupCtrl', ['$rootScope', '$scope', '$state', 'localStorageService', 'AuthenticationService',
    function($rootScope, $scope, $state, localStorageService, AuthenticationService) {
         var user = localStorageService.get('user');

        // if (user) {
        //     $rootScope.user = JSON.parse(user);
        //     $state.go("dashboard");
        // }
        $scope.signupCtrl = function(signup) {
         if (signup.name !== "" && signup.phone !== "" && signup.pin !== "" && signup.repin !== "" && signup.pin == signup.repin) {
           // if (signup.phone !== "" && signup.pin !== "" && signup.repin !== "" && signup.pin == signup.repin) {
                AuthenticationService.Login(signup.phone, signup.pin, function(data) {
                    if (data.error) {

                    } else {
                        $rootScope.user = data;
                        localStorageService.set('user', JSON.stringify(data));
                        $state.go("dashboard");
                    }
                });
            }
        };
    }
])

.controller('DashCtrl', function($scope) {

})

.controller('AppointmentsCtrl', function($scope, appointmentInfo) {
    $scope.appointmentInfo = appointmentInfo;

    $scope.addAppointment = function(apt) {
        console.log(apt);
    };

})

.controller('ContactsCtrl', function($scope, contactInfo) {
    $scope.contactInfo = contactInfo;

    $scope.saveContact = function(contact) {
        console.log(contact);
    };

})

.controller('PresciptionsCtrl', function($scope, prescriptionInfo) {
    $scope.prescriptionInfo = prescriptionInfo;

    $scope.saveDrug = function(drug) {
        console.log(drug);
    };

});
