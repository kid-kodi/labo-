angular
	.module('customer-list')
	.component('customerList', {
		templateUrl : 'customer/customer-list.template.html',
		controller : ['$scope', '$routeParams', 'DB', function CustomerListController($scope, $routeParams, db){
			var ctrl = this;

			ctrl.$onInit = function(){
				ctrl.loading = true;
            	db.customer.query().$promise.then( function( data ){
            		ctrl.list = data;
            		ctrl.loading = false;
            	});
			}

		}]
	})