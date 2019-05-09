angular.
  module('lab-dash').
  component('labDash', {
    templateUrl: 'lab-dash/lab-dash.template.html',
    controller: [ '$rootScope', '$scope', '$filter', 'DB', function LabDashController( $rootScope, $scope, $filter, db ) {
      var ctrl = this;

      ctrl.orders = [];
      ctrl.bb = 0;
      ctrl.enft = 0;
      ctrl.majeur = 0;
      ctrl.adult = 0;
      ctrl.data = [];
      ctrl.patients = [];
      ctrl.by_sample_type = [];
      ctrl.sample_types = db.sample_type.query();
      ctrl.customers = db.customer.query();

      db.order.query().$promise.then( function( result ){
      	for (var i = 0; i < result.length; i++) {
      		ctrl.orders = result;
      		ctrl.data.push(result[i].prestations);
      		ctrl.patients.push(result[i].patient);
      		ctrl.positif = $filter('filter')(ctrl.data, {result_data:'POSITIF'});
      		ctrl.negatif = $filter('filter')(ctrl.data, {result_data:'NEGATIF'});

      		console.log( result[i] );

      		if(result[i].patient.age >= 0 && result[i].patient.age <= 5) {
      			ctrl.bb++;
      		}

      		if (result[i].patient.age >= 6 && result[i].patient.age <= 10) {
      			ctrl.enft++;
      		}

      		if (result[i].patient.age >= 11 && result[i].patient.age <= 20) {
      			ctrl.majeur++;
      		}

      		if (result[i].patient.age > 20) {
      			ctrl.adult++;
      		}

      	}
      });
    }]
  });