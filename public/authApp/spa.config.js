angular.
  module('spa').
  config( [ '$locationProvider', '$routeProvider',
    function config( $locationProvider, $routeProvider ) {
      //$locationProvider.hashPrefix( '!' );

      $routeProvider.
        when( '/', {
          template: '<signin-name></signin-name>'
        })
        .when( '/pass', {
          template: '<signin-pass></signin-pass>'
        })
        .otherwise( '/' );
    }
  ] )
  .run( [
    '$rootScope' , '$location' , '$window'      , '$http' , 
    'amMoment'   , '$cookieStore' , 'APP_CONFIG',
    function run( $rootScope, $location, $window, $http, amMoment, $cookieStore, APP_CONFIG  ) {
        amMoment.changeLocale( 'fr' );
        // keep user logged in after page refresh
        $rootScope._user = $cookieStore.get( APP_CONFIG.TOKEN ) || null;

        $rootScope.$on( "$routeChangeStart", function ( event, next, current ) {
          var _user = $rootScope._user;
            if( _user == undefined || _user == null){
              $window.location.href = APP_CONFIG.SLIDE_ONE;
            }

            /*if (next && next.$$route && next.$$route.secure) {
                if (current_user == null || current_user == undefined) {
                    $rootScope.$evalAsync(function () {
                        $window.location.href = '/';
                    } );
                }
                else{}
            }*/
        } );
    }

  ]);