// Define the `phonecatApp` module
angular.module( 'spa', [
  // ...which depends on the `phoneList` module
  'ngRoute', 
  'angularMoment', 
  'ngCookies',
  'constant',
  'signin',
  ] );