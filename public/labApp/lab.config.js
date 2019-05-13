angular
	.module('labApp')
	.config(['$routeProvider', '$locationProvider', function config($routeProvider, $locationProvider){
		$routeProvider
			.when('/dashboard', {
				template : '<lab-dash></lab-dash>',
				data: { activeTab: 'dashboard' }
			})
			.when('/saisie', {
				template : '<entry-list></entry-list>',
				data: { activeTab: 'saisie' }
			})
			.when('/saisie/:id', {
				template : '<lab-entry></lab-entry>',
				data: { activeTab: 'saisie' }
			})
			.when('/result', {
				template : '<lab-result></lab-result>',
				data: { activeTab: 'result' }
			})
			.when('/validate', {
				template : '<lab-validate></lab-validate>'
			})
			.when('/report', {
				template : '<lab-report></lab-report>'
			})
			.when('/item', {
				template : '<lab-item-list></lab-item-list>'
			})
			.when('/item/edit/:id', {
				template : '<lab-item-edit></lab-item-edit>'
			})
			.when('/method', {
				template : '<lab-method-list></lab-method-list>'
			})
			.when('/method/edit/:id', {
				template : '<lab-method-edit></lab-method-edit>'
			})
			.when('/customer', {
				template : '<customer-list></customer-list>'
			})
			.when('/customer/edit/:id', {
				template : '<customer-edit></customer-edit>'
			})
			.when('/customer/detail/:id', {
				template : '<customer-detail></customer-detail>'
			})
			.otherwise('/dashboard')

			//$locationProvider.html5Mode(true);
			$locationProvider.hashPrefix('');
	}])
	.run( [
    '$route', '$rootScope' , '$location' , '$window' , '$http' , 'amMoment', '$locale',
    function run( $route, $rootScope, $location, $window, $http, amMoment, $locale ) {

        $locale.NUMBER_FORMATS.GROUP_SEP = ' ';
        //amMoment.changeLocale( 'fr' );

        //$rootScope._user = $cookies.getObject( 'inchallah' ) || {};

        // if ($rootScope._user.id == undefined || $rootScope._user.id == null)  {
        //   $window.location.href = '/';
        // }

        // var io = socket;
        // io.emit('adduser', { nom : $rootScope._user.nom });

        // $route.reload();
        
    }

  ]);