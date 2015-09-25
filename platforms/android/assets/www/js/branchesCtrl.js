angular.module('starter.branchesCtrl', [])

.controller('BranchesCtrl', function ($scope, $stateParams,$state, BranchesService, SocketFactory) {

    BranchesService.getCurrentTicket().then(function (ticket) {
        console.log("BranchesCtrlcurrent ticket ok", ticket)
        SocketFactory.createWsConnection();
       // SocketFactory.watchTicket(ticket);
        $state.go("tab.ticket");
    },
    function (reason) {
        console.log("BranchesCtrlcurrent ticket rejected", reason)
    }
    );

    BranchesService.getBranchesData().then(function (response) {
        $scope.branchesData = response;

    })
    $scope.$on("webcocketReady", function (event, data) {
        BranchesService.getCurrentTicket().then(function (ticket) {
            SocketFactory.sendWSRequest("WATCH_TICKET", ticket);
        });
    });
    
});

