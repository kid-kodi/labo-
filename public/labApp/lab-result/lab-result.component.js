angular.
  module('lab-result').
  component('labResult', {
    templateUrl: 'lab-result/lab-result.template.html',
    controller: [ '$rootScope', '$scope', '$filter', 'DB', function LabResultController( $rootScope, $scope, $filter, db ) {
      	var ctrl = this;

      	ctrl.prestations = db.prestation.query();
		ctrl.methods = db.method.query();

      	ctrl.set_result=false;

      	ctrl.list = db.order.query();

      	ctrl.changeStatus = function( item, status ) {
	      	item.status = status;
	      	var id, copy = angular.copy( item );
			id = copy._id;
			delete copy.$$hashKey;
			delete copy._id;
			console.log( copy.status );
	      	db.order.update({ 'id' : id }, copy)
			.$promise.then( function( response ){
				console.log( response );
				ctrl.set_result=false;
	        });
	      
	    };
	 
    }]
  });