(function(){

  'use strict'

  var spa = angular.module('app');

  var injectParams = ['$rootScope'];

  var socket = function ( $rootScope ) {
    var socket = io.connect('/chat');
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {  
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      },
      removeAllListeners: function (eventName, callback) {
          socket.removeAllListeners(eventName, function() {
              var args = arguments;
              $rootScope.$apply(function () {
                callback.apply(socket, args);
              });
          }); 
      }
    };
  }

  socket.$inject = injectParams;

  spa.factory('socket', socket);

})();