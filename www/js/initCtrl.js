angular.module('starter.initCtrl', [])

.controller('InitCtrl', function ($scope, $location, $stateParams, $state, $localstorage, BranchesService) {

    $scope.$on('$ionicView.enter', function () {
        console.log("Init:start");
        
        $state.go('tab.branches');
    })

})