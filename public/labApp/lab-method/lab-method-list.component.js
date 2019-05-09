angular.
  module('lab-method-list').
  component('labMethodList', {
    templateUrl: 'lab-method/lab-method-list.template.html',
    controller: [ '$rootScope', '$scope', 'DB', function LabMethodListController( $rootScope, $scope, db ) {
      
        var ctrl = this;
        ctrl.list = [];
	    db.method.query().$promise.then( function( data ){
	    	angular.forEach( data, function( item, index ){
	    		item.analyse = db.prestation.get({id:item.analyse_id});
	    		ctrl.list.push( item );
	    	});
	    });
    }]
  });