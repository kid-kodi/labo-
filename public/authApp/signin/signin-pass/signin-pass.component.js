var injectParams = ['$routeParams', '$window', '$scope', '$rootScope', '$cookies', 'signinManager', 'APP_CONFIG'];

    var objectEditController = function ($routeParams, $window, $scope, $rootScope, $cookies, signinManager, APP_CONFIG) {
        
        var 
        self = this; 
        self._user = null;
        self.is_loading = false;

        //if cookie existe 
         $rootScope._user = $cookies.getObject( 'inchallah' ) || null;

         if($rootScope._user != null){
            self._user = $rootScope._user;
         }

        self.delete = function(){
          self._user = null;
          $cookies.remove( 'inchallah', { path : '/'} );
          $window.location.href = APP_CONFIG.SLIDE_ONE;
        }

        self.signin = function(){
          var _user = self._user;
          if (!$scope.signin_form.$valid) { return false; }
          self.is_loading = true;
          signinManager.checkPassword( _user ).then( function( user_map ){
            if(user_map.length == 0){
              $rootScope.$broadcast('set-message', 'le mot de passe est éroné');
              self.is_loading = false;
              return false;
            }

            $window.location.href = APP_CONFIG.APP_URL;
          });
        }

    };

    objectEditController.$inject = injectParams;


angular.module('signin-pass')
.component('signinPass', {
    templateUrl: 'signin/signin-pass/signin-pass.template.html',
    controller: objectEditController
  });