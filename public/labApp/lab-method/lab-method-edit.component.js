angular.
  module('lab-method-edit').
  component('labMethodEdit', {
    templateUrl: 'lab-method/lab-method-edit.template.html',
    controller: [ '$rootScope', '$scope', '$routeParams', 'AlertService', 'DB', 
    function LabMethodEditController( $rootScope, $scope, $routeParams, AlertService, db ) {
      
        var ctrl = this;
        ctrl.prestations = [];

	    ctrl.update = function(){
			ctrl.master = angular.copy( ctrl.method );

			if (ctrl.master._id) {
				var method = angular.copy( ctrl.method );
				var id = method._id;
	    		delete method._id;
	    		db.method.update({id:id}, method )
	    		.$promise.then( function( data ){
	    			console.log( data );
	    			AlertService.Success('Méthode modifiée', true);
	    		});
			}
			else{
				db.method.create( ctrl.master )
                .$promise.then( function( response ){

                  if( response.insertedCount > 0 ){
                    var method = response.ops[ 0 ];
                    AlertService.Success('Nouvelle méthode enregistrée', true);
                  }
                });
			}
		}

		// add an item
	    ctrl.add = function() {
	    	ctrl.method.resultats.push(ctrl.input);
	    	ctrl.input = "";
	    };

	    // remove an item
	    ctrl.remove = function(index) {
	    	ctrl.method.resultats.splice(index, 1);
	    };
	 
	    ctrl.reset = function(){
			ctrl.master = {};
			ctrl.method = {};
		};

      	ctrl.$onInit = function(){
			ctrl.reset();
			if ( $routeParams.id !== '0' ) {
				ctrl.method = db.method.get({id:$routeParams.id});
			}
			else{
				ctrl.method = {
					resultats : [],
					is_quantity : false
				}
			}

			ctrl.prestations = db.prestation.query();
		}
	 
    }]
  });