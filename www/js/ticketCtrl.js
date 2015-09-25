angular.module('starter.ticketCtrl', [])

.controller('TicketCtrl', function ($scope,$state, BranchesService) {

    $scope.ticket = {};
    
    $scope.$on('ticketUpdated', function (evant, data) { console.log("TicketCtrl ticketUpdated recievd"); $scope.refreshData()});


    $scope.$on('ticketRemoved', function (evant, data) { $state.go('tab.branches'); });

    $scope.$on('$ionicView.enter', function () { $scope.refreshData(); });


    $scope.removeTicket = function (path) {
        BranchesService.removeCurrentTicket();
    }

    $scope.refreshData = function () {
        console.log("TicketCtrl refreshData ");
        BranchesService.getCurrentTicket().then(
            function (ticket) { console.log("TicketCtrl updating ticket "); $scope.ticket = ticket; },
            function () { $state.go('tab.ticket'); }
        )
    }
})

