angular.module('starter.serviceCtrl', [])

.controller('ServiceCtrl', function ($scope, $stateParams, $location, $state, $localstorage, BranchesService, SocketFactory) {

   
    BranchesService.getServiceData($stateParams.branchId, $stateParams._id).then(function (response) {
        $scope.service = response;
        console.log("service ctrl", response)
        
    })

    BranchesService.getBranch($stateParams.branchId).then(function (response) {
        $scope.branchesData = response;
        console.log("service ctrl, getbranch()", response)
        
    })

    $scope.createTicket = function ( branchId, _id) {
        BranchesService.createTicket(branchId, _id).then(function (ticket) {
            console.log("ServiceCtrl created a ticket:", ticket);;
        });
    }
    $scope.$on("ticketUpdated", function (event, data) {
        console.log("ServiceCtrl ticketWatchStarted recieved")
        BranchesService.getCurrentTicket().then(function (ticket) {
            console.log("ServiceCtrl ticketWatchStarted redirect")
            $state.go('tab.ticket');
        });
    });
    
})

