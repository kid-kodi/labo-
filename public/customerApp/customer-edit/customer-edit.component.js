angular
	.module('customer-edit')
	.component('customerEdit', {
		templateUrl : 'customer-edit/customer-edit.template.html',
		controller : ['$scope', '$routeParams', 'AlertService', 'DB', function SaisieController($scope, $routeParams, AlertService, db){
			var ctrl = this;

			var today = new Date(Date.now()).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0,10);

			ctrl.prestations = db.prestation.query();
			ctrl.methods = db.method.query();
			ctrl.customers = db.customer.query();
			ctrl.sample_types = db.sample_type.query();

			var zeroPad = function (num, places) {
	          var zero = places - num.toString().length + 1;
	          return Array(+(zero > 0 && zero)).join("0") + num;
	        };

			ctrl.update = function(){
				ctrl.master = angular.copy( ctrl.customer );

				if (ctrl.master._id) {
					var id = ctrl.master._id;
		    		delete ctrl.master._id;
		    		db.customer.update({id:id}, ctrl.master )
		    		.$promise.then( function( data ){
		    			AlertService.Success('Saisie mise à jour', true);
		    		});
				}
				else{

					db.customer.query().$promise.then( function( data ){
						var total = data.length + 1;

						ctrl.master.number = total;
						ctrl.master.serial = zeroPad( total, 4);
						ctrl.master.created_at = today;
						db.customer.create( ctrl.master )
		                .$promise.then( function( response ){

		                  if( response.insertedCount > 0 ){
		                    var customer = response.ops[ 0 ];
		                    AlertService.Success( 'nouvelle enregistrement effectué avec succèss' );
		                    ctrl.reset();
		                  }
		                });
					});

				}
			}

			ctrl.delete = function( item ){
				db.customer.remove( {id:item._id} );
			}

			ctrl.reset = function(){
				ctrl.master = {};
			
				ctrl.customer = {
					patient : {
						type : "1"
					},
					prestations : [],
					status : 0
				};
			};

			ctrl.addToList = function(){
				if (ctrl.customer.prestations == undefined) {
					ctrl.customer.prestations = [];
				}
				ctrl.customer.prestations.push({});
			};

			ctrl.removeFromList = function( item ){
				var index = ctrl.customer.prestations.indexOf( item );
				ctrl.customer.prestations.splice(index, 1);
			};

			ctrl.$onInit = function(){
				ctrl.reset();
				if ( $routeParams.id !== '0' ) {
					ctrl.customer = db.customer.get({id:$routeParams.id});
				}
			}

		}]
	})