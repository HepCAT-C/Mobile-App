var app = angular.module("app", ['ionic','ionic.service.core', 'LocalStorageModule', 'app.controllers', 'app.services', 'app.config']);
// var app = angular.module("app", ['ionic','ionic.service.core', 'LocalStorageModule', 'app.controllers', 'app.services', 'app.config','ngCordova']);
app.config(function(localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('MyHeathApp');
});
app.controller('sidemenu',function($scope,$ionicSideMenuDelegate){
$scope.toggleLeft = function(){
  $ionicSideMenuDelegate.toggleLeft();
}
});

//Ionic default code
app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
});

//Place to configure routes for the app.
app.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

    $stateProvider

        .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })

    .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'templates/dashboard.html',
        controller: 'DashCtrl',
        resolve: {
            appointmentInfo: function($rootScope, AppointmentService) {
                return AppointmentService.getAppointments($rootScope.user.uid);
            },
            prescriptionInfo: function($rootScope, PrescriptionService) {
                return PrescriptionService.getPrescriptions($rootScope.user.uid);
            },
            contactInfo: function($rootScope, ContactService) {
                return ContactService.getContacts($rootScope.user.uid);
            }
        }
    })

    .state('appointments', {
        url: '/appointments',
        templateUrl: 'templates/appointments.html',
        controller: 'AppointmentsCtrl',
        resolve: {
            appointmentInfo: function($rootScope, AppointmentService) {
                return AppointmentService.getAppointments($rootScope.user.uid);
            }
        }
    })

    .state('appointments.list', {
        url: '/list',
        templateUrl: 'templates/appointments-list.html',
        controller: 'AppointmentsCtrl'
    })

    .state('appointments.add', {
        url: '/add',
        templateUrl: 'templates/add-appointments.html',
        controller: 'AppointmentsCtrl'
    })

    .state('contacts', {
        url: '/contacts',
        templateUrl: 'templates/contacts.html',
        controller: 'ContactsCtrl',
        resolve: {
            contactInfo: function($rootScope, ContactService) {
                return ContactService.getContacts($rootScope.user.uid);
            }
        }
    })

    .state('contacts.list', {
        url: '/list',
        templateUrl: 'templates/contacts-list.html'
    })

    .state('contacts.add', {
        url: '/add',
        templateUrl: 'templates/contacts-add.html'
    })

    .state('presciptions', {
            url: '/presciptions',
            templateUrl: 'templates/presciptions.html',
            controller: 'PresciptionsCtrl',
            resolve: {

                prescriptionInfo: function($rootScope, PrescriptionService) {
                    return PrescriptionService.getPrescriptions($rootScope.user.uid);
                }

            }
        })
        .state('presciptions.list', {
            url: '/list',
            templateUrl: 'templates/presciptions-list.html'
        })
        .state('presciptions.add', {
            url: '/add',
            templateUrl: 'templates/presciptions-add.html'
        })

        .state('signup',{
            url:'/signup',
            templateUrl:'templates/signup.html',
            controller:'signupCtrl'
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});

function MainCtrl($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeftSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft()
  };
}


app.controller("ExampleController", function($scope, $cordovaLocalNotification) {
 
    $scope.add = function() {
        var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime.getMinutes() + 1);
        $cordovaLocalNotification.add({
            id: "1234",
            date: alarmTime,
            message: "This is a message",
            title: "This is a title",
            autoCancel: true,
            sound: null
        }).then(function () {
            console.log("The notification has been set");
        });
    };
 
    $scope.isScheduled = function() {
        $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
            alert("Notification 1234 Scheduled: " + isScheduled);
        });
    }
 
});