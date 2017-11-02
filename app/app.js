var myNinjaApp = angular.module('NinjaApp', ['ngRoute', 'ngAnimate']);

myNinjaApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'NinjaController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactController'
    })
    .when('/contact-success', {
      templateUrl: 'views/contact-success.html',
      controller: 'ContactController'
    })
    .when('/directory', {
      templateUrl: 'views/directory.html',
      controller: 'NinjaController'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);

myNinjaApp.directive('randomNinja', [function() {
  return {
    restrict: 'E',
    scope: {
      ninjas: '=',
      title: '='
    },
    templateUrl: 'views/random.html ',
    transclude: true,
    replace: true,
    controller: function($scope){
      $scope.random = Math.floor(Math.random() * 4);
    }
  };
}]);

myNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http) {

  $scope.removeNinja = function(ninja) {
    var ninjaIndex = $scope.ninjas.indexOf(ninja);
    $scope.ninjas.splice(ninjaIndex, 1);
  };

  $scope.removeAllNinjas = function() {
    $scope.ninjas.length = 0;
  };

  $scope.addNinja = function() {
    var ninja = {
      name: $scope.newNinja.name,
      belt: $scope.newNinja.belt,
      rate: parseInt($scope.newNinja.rate),
      available: true
    }
    $scope.ninjas.push(ninja);

    $scope.newNinja.name = "";
    $scope.newNinja.belt = "";
    $scope.newNinja.rate = "";
  };

  $scope.message = "Heyyy";

  $http.get('data/ninjas.json').then(function(result){
    $scope.ninjas = result.data;
  });


}]);

myNinjaApp.controller('ContactController', ['$scope', '$location', function($scope, $location){
  $scope.sendMessage = function() {
    $location.path('/contact-success');
  }
}])
