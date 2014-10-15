// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionicApp', ['ionic'])

.factory('PetService', function () {

  var pets = [];

  for (var i=0; i<30; i++) {
    pets[i] = {"id": i,"firstName": "Name" + i};

  }

  return {
    all: function () {
      return pets;
    },
    get: function (petId) {

      return pets[petId];
    }
  };

})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('tabs', {
    url: "/tabs",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })


  .state('tabs.master', {
    url: "/master",
    views: {
      'main': {
        controller:'MasterCtrl',
        templateUrl: "templates/master.html"
      }
    }
  })

  .state('tabs.detail', {
    url: "/detail/:petsId",
    views: {
      'main': {
        controller:'DetailCtrl',
        templateUrl: "templates/detail.html"
      }
    }
  });

  $urlRouterProvider.otherwise("tabs/master");
})
.controller('MasterCtrl', function($scope, PetService, $ionicScrollDelegate) {

  $scope.pets = PetService.all();

  $scope.scrollBottom = function() {
    $ionicScrollDelegate.scrollBottom(true);
  };

})
.controller('DetailCtrl', function($scope, $stateParams, PetService) {
  $scope.pet = PetService.get($stateParams.petsId);
});
