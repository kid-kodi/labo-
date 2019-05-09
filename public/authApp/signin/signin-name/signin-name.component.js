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
            $window.location.href = APP_CONFIG.SLIDE_TWO;
         }

        self.signin = function(){

          if (!$scope.signin_form.$valid) { return false; }

          self.is_loading = true;
          var email = self._user.email;
          signinManager.getUserByEmail( email ).then( function( user_map ){
            console.log( user_map.length );
            if(user_map.length == 0){
              $rootScope.$broadcast('set-message', 'le nom est éroné');
              self.is_loading = false;
              return false;
            }


            $rootScope._user = {
              id     : user_map[0]._id,
              nom    : user_map[0].nom,
              email  : user_map[0].email,
              avatar : user_map[0].avatar,
              role   : user_map[0].role,
            };

            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);

            $cookies.putObject( 'inchallah', $rootScope._user, { path : '/'} );
            $window.location.href = APP_CONFIG.SLIDE_TWO;
          });
        }

    };

    objectEditController.$inject = injectParams;


angular.module('signin-name')
.component('signinName', {
    templateUrl: 'signin/signin-name/signin-name.template.html',
    controller: objectEditController
  });