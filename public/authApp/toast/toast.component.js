angular.
  module('spa').
  component('toast', {
    templateUrl: 'toast/toast.template.html',
    controller: ['$scope', '$timeout',
      function ToastController($scope, $timeout) {

        var self = this;

        self.flash = {};
        
        var setMessage = function(event, message) {
          //alert(message);
            self.flash = {
                message: message
            };

            var modal = document.getElementsByClassName('spa-toast')[0];
            modal.style.display = 'block';

            $timeout(function () {
                clearFlashMessage();
            }, 4000);
        };

        function clearFlashMessage() {
            self.flash = {};
            var modal = document.getElementsByClassName('spa-toast')[0];
            modal.style.display = 'none';
        };

        $scope.$on('set-message', setMessage );

      }
    ]
  });