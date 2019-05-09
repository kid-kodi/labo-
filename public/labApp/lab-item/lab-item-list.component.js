angular.
  module('lab-item-list').
  component('labItemList', {
    templateUrl: 'lab-item/lab-item-list.template.html',
    controller: [ '$rootScope', '$scope', 'AlertService', 'DB', function LabItemListController( $rootScope, $scope, AlertService, db ) {
      
        var ctrl = this;
        ctrl.show_form = false;
        ctrl.item = {};
	    ctrl.list = db.prestation.query();
	 
	    ctrl.addItem = function() {
	    	if (ctrl.item._id ) {
	    		item = angular.copy( ctrl.item );
	    		delete item.id;
	    		db.prestation.update({id:id}, item )
	    		.$promise.then( function( data ){
	    			console.log( data );
	    			
	    		});
	    	}
	    	else{
	    		db.prestation.create( ctrl.item )
	    		.$promise.then( function( data ){
	    			console.log( data );
	    			
	    		});
	    	}
	      	ctrl.item = {};
	      	ctrl.show_form = false;
	    };
	 
	    ctrl.remaining = function() {
	      var count = 0;
	      angular.forEach(ctrl.list, function(todo) {
	        count += todo.done ? 0 : 1;
	      });
	      return count;
	    };
	 
	    ctrl.archive = function() {
	      var oldlist = ctrl.list;
	      ctrl.list = [];
	      angular.forEach(oldlist, function(todo) {
	        if (!todo.done) ctrl.list.push(todo);
	      });
	    };

	    ctrl.setItem = function( item ) {
	    	ctrl.item = item;
	      ctrl.show_form = true;
	    };
    }]
  });