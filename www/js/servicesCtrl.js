angular.module('starter.servicesCtrl', [])

.controller('ServicesCtrl', function ($scope, $location, $stateParams, BranchesService) {
    BranchesService.getBranchServicesData($stateParams._id).then(function (response) {
        $scope.services = response;
        console.log("Services ctrl",response)
    });

    $scope.go = function (path) {
        $location.path(path);
    };
})

