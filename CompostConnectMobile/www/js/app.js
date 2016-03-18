// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic',"starter.controllers","ngCordova","starter.services"])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('login', {
      url:"/login",
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    .state('ProducerHome', {
      url:"/ProducerHome",
      templateUrl: 'templates/ProducerHome.html',
      controller: 'ProdHomeCtrl'
    })
    .state('ConsumerHome', {
      url:"/ConsumerHome",
      templateUrl: 'templates/ConsumerHome.html',
      controller: 'ConsHomeCtrl'
    })
    .state('Register', {
      url:"/Register",
      templateUrl: 'templates/Register.html',
      controller: 'RegisterCtrl'
    })
    .state('RegisterSource', {
      url:"/RegisterSource",
      templateUrl: 'templates/RegSource.html',
      controller: 'RegisterSourceCtrl'
    })
    .state('CompostPorts', { //producer home
      url:"/CompostPorts",
      templateUrl: 'templates/CompostPorts.html',
      controller: 'CompostPortsCtrl'
    })
    .state('RegCompostPorts', {
      url:"/RegCompostPorts",
      templateUrl: 'templates/RegCompostPorts.html',
      controller: 'RegCompostPortsCtrl'
    })
	.state('FindNearBy', {
      url:"/FindNearBy",
      templateUrl: 'templates/FindNearBy.html',
      controller: 'FindNearByCtrl'
    });

    $urlRouterProvider.otherwise('/login');
});