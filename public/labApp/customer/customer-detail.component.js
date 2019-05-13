angular
	.module('customer-detail')
	.component('customerDetail', {
		templateUrl : 'customer/customer-detail.template.html',
		controller : ['$scope', '$routeParams', 'DB', function CustomerDetailController($scope, $routeParams, db){
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