angular
	.module('entry-list')
	.component('entryList', {
		templateUrl : 'entry-list/entry-list.template.html',
		controller : ['$scope', '$routeParams', 'DB', function EntryListController($scope, $routeParams, db){
			var ctrl = this;

			ctrl.$onInit = function(){
				ctrl.loading = true;
            	db.order.query().$promise.then( function( data ){
            		ctrl.list = data;
            		ctrl.loading = false;
            	});
			}

		}]
	})