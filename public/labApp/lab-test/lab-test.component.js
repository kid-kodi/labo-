angular.
  module('lab-test').
  component('labTest', {
    templateUrl: 'lab-test/lab-test.template.html',
    controller: [ '$rootScope', '$scope', function LabTestController( $rootScope, $scope ) {
      	var ctrl = this;

	    ctrl.todos = [
	      {text:'learn AngularJS', done:true},
	      {text:'build an AngularJS app', done:false}];
	 
	    ctrl.addTodo = function() {
	      ctrl.todos.push({text:ctrl.todoText, done:false});
	      ctrl.todoText = '';
	    };
	 
	    ctrl.remaining = function() {
	      var count = 0;
	      angular.forEach(ctrl.todos, function(todo) {
	        count += todo.done ? 0 : 1;
	      });
	      return count;
	    };
	 
	    ctrl.archive = function() {
	      var oldTodos = ctrl.todos;
	      ctrl.todos = [];
	      angular.forEach(oldTodos, function(todo) {
	        if (!todo.done) ctrl.todos.push(todo);
	      });
	    };


    }]
  });