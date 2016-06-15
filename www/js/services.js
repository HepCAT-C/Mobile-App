angular.module('app.services', ['app.config'])


.factory('AuthenticationService', ['$http', 'baseUrl', function($http, baseUrl) {


    var service = {
baseUrl: baseUrl
    };

    service.Login = function Login(username, password, callback) {
        $http.post(baseUrl + '/api/authenticate', {
                username: username,
                password: password
            })
            .success(function(response) {
                callback(response);
            });

        
    };


    return service;
}])

.factory('UserService', ['$http', 'baseUrl', function($http, baseUrl) {

    function GetById(username,password) {
            // return $http.get(baseUrl + '/api/getUsers/' + id);
        return $http.post(baseUrl+'/api/getUsers',{
            username: username,
            password: password
        });

    }

    var service = {};
    service.GetById = GetById;

    return service;
}])

.factory('AppointmentService', ['$http', 'baseUrl', function($http, baseUrl) {

    function getAppointments(id) {
        return $http.get(baseUrl + '/api/getAppointments/' + id).then(handleSuccess, handleError('Error getting user by id'));
    }

    function setAppointments(id, appointments) {
        $http.post(baseUrl + '/api/setAppointments', {
                uid: id,
                appointments: appointments
            })
            .then(handleSuccess, handleError('Error getting user by id'));
    }


    // private functions
    function handleSuccess(res) {
        return res.data;
    }

    function handleError(error) {
        return function() {
            return {
                success: false,
                message: error
            };
        };
    }

    var service = {};
    service.getAppointments = getAppointments;
    service.setAppointments = setAppointments;
    return service;
}])

.factory('PrescriptionService', ['$http', 'baseUrl', function($http, baseUrl) {

    function getPrescriptions(id) {
        return $http.get(baseUrl + '/api/getPrescriptions/' + id).then(handleSuccess, handleError('Error getting user by id'));
    }

    function setPrescriptions(id, prescriptions) {
        $http.post(baseUrl + '/api/setPrescriptions', {
                uid: id,
                prescriptions: prescriptions
            })
            .then(handleSuccess, handleError('Error getting user by id'));
    }


    // private functions
    function handleSuccess(res) {
        return res.data;
    }

    function handleError(error) {
        return function() {
            return {
                success: false,
                message: error
            };
        };
    }

    var service = {};
    service.getPrescriptions = getPrescriptions;
    service.setPrescriptions = setPrescriptions;
    return service;
}])
.factory('ContactService', ['$http', 'baseUrl', function($http, baseUrl) {

    function getContacts(id) {
        return $http.get(baseUrl + '/api/getContacts/' + id).then(handleSuccess, handleError('Error getting user by id'));
    }

    function setContacts(id, contacts) {
        $http.post(baseUrl + '/api/setContacts', {
                uid: id,
                contacts: contacts
            })
            .then(handleSuccess, handleError('Error getting user by id'));
    }


    // private functions
    function handleSuccess(res) {
        return res.data;
    }

    function handleError(error) {
        return function() {
            return {
                success: false,
                message: error
            };
        };
    }

    var service = {};
    service.getContacts = getContacts;
    service.setContacts = setContacts;
    return service;
}]);
