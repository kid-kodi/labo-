angular.module('signin')
.factory('signinManager', 
    ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {  

        var _user = $rootScope._user;

    var signinManager = {
        getUserByEmail: function( email ) {
            var deferred = $q.defer();

            var scope = this;
            $http.get('/user/list?email='+email)
                .success(function(users) {
                    console.log( users);
                    deferred.resolve(users);
                })
                .error(function() {
                    deferred.reject();
                });
            return deferred.promise;
        },
        checkPassword: function( _user ) {
            var deferred = $q.defer();

            var scope = this;
            $http.get('/user/list?password='+_user.password+'&'+'email='+_user.email)
                .success(function(user) {
                    console.log( user);
                    deferred.resolve(user);
                })
                .error(function() {
                    deferred.reject();
                });
            return deferred.promise;
        }
    };
    return signinManager;
}]);