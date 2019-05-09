angular.
  module('lab-validate').
  component('labValidate', {
    templateUrl: 'lab-validate/lab-validate.template.html',
    controller: [ '$rootScope', '$scope', 'DB', function LabvalidateController( $rootScope, $scope, db ) {
     var ctrl = this;

      	ctrl.list = db.order.query();
        ctrl.prestations = db.prestation.query();
        ctrl.methods = db.method.query();

        var today = new Date(Date.now()).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0,10);

      	ctrl.changeStatus = function( item, status ) {
          item.status = status;
          var id, copy = angular.copy( item );
          id = copy._id;
          delete copy.$$hashKey;
          delete copy._id;
          copy.updated_at = today;
          console.log( copy.status );
          db.order.update({ 'id' : id }, copy)
          .$promise.then( function( response ){
            console.log( response );
          });  
        };
    }]
  });