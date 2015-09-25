angular.module('starter', ['ionic', 'starter.servicesCtrl', 'starter.branchesCtrl' , 'starter.serviceCtrl', 'starter.ticketCtrl', 'starter.services', 'starter.factory', 'starter.initCtrl'])

.run(function($ionicPlatform, $state) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });

  $ionicPlatform.registerBackButtonAction(function (event) {
      if (($state.$current.name == "app.tabs.branches.services.service.ticket") ||
          ($state.$current.name == "app.tabs.branches.services")
          ) {
      } else {
          navigator.app.backHistory();
      }
  }, 100);

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

.state('tab.branches', {
    url: '/branches',
    views: {
        'tab-branches': {
            templateUrl: 'templates/tab-branches.html',
            controller: 'BranchesCtrl'
        }
    }
})
          .state('tab.services', {
              url: '/branches/:_id/services/',
              views: {
                  'tab-services': {
                      templateUrl: 'templates/tab-services.html',
                      controller: 'ServicesCtrl'
                  }
              }
          })

    .state('tab.service', {
        url: '/branches/:branchId/services/:_id',
        views: {
            'tab-service': {
                templateUrl: 'templates/tab-service.html',
                controller: 'ServiceCtrl'
            }
        }
    })
    .state('tab.ticket', {
        url: '/branches/:branchId/services/service/:_id/ticket',
        views: {
            'tab-ticket': {
                templateUrl: 'templates/tab-ticket.html',
                controller: 'TicketCtrl'
            }
        }
    })
    $urlRouterProvider.otherwise('/tab/branches')

});
