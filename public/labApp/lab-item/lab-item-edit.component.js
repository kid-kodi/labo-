angular.
  module('lab-item-edit').
  component('labItemEdit', {
    templateUrl: 'lab-item/lab-item-edit.template.html',
    controller: [ '$rootScope', '$scope', '$routeParams', 'AlertService', 'DB', 
    function LabItemEditController( $rootScope, $scope, $routeParams, AlertService, db ) {
      
        var ctrl = this;

	    ctrl.update = function(){
			ctrl.master = angular.copy( ctrl.item );

			if (ctrl.master._id) {
				var item = angular.copy( ctrl.item );
				var id = item._id;
	    		delete item._id;
	    		db.prestation.update({id:id}, item )
	    		.$promise.then( function( data ){
	    			console.log( data );
	    			AlertService.Success('Les modifications ont été effectuées', true);
	    		});
			}
			else{
				db.prestation.create( ctrl.master )
                .$promise.then( function( response ){

                  if( response.insertedCount > 0 ){
                    var prestation = response.ops[ 0 ];
                    AlertService.Success('Données enregistrées', true);
                    ctrl.item = {};
                  }
                });
			}
		}
	 
	    ctrl.reset = function(){
			ctrl.master = {};
			ctrl.item = {};
		};

      	ctrl.$onInit = function(){
			ctrl.reset();
			if ( $routeParams.id !== '0' ) {
				ctrl.item = db.prestation.get({id:$routeParams.id});
			}
		}
	 
    }]
  });