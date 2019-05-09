angular.
  module('navigation').
  component('navigation', {
    templateUrl: 'navigation/navigation.template.html',
    controller: [ '$rootScope', '$scope', '$routeParams', '$cookies',  '$window', 'DB',
    function NavigationController( $rootScope, $scope, $routeParams, $cookies,  $window, db ) {
      
        var ctrl = this;

        ctrl.signout = function(){
            ctrl.user = null;
            $cookies.remove( 'inchallah' );
            $window.location.href = '/';
        };

        ctrl.$onInit = function(){
            var user = $cookies.getObject( 'inchallah' ) || null;

            console.log( user );
            if ( user ) {
                db.user.get( { id : user.id } ).$promise.then( function( _user ){
                    ctrl.user = _user;
                });
            }
        };
   
    }]
  });