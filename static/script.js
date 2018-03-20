var app = angular.module("MainApp",['ngMaterial']); 
app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
  }]);

app.controller("MainCtrl", function($scope, $mdDialog) {
    $scope.init = function (sounds) {
        $scope.sounds = sounds
        console.log(sounds)
    }

    $scope.get_folders = function() {
        return Object.keys($scope.sounds)
    }

    $scope.play_sound = function(folder, sound) {
        console.log(folder, sound);
        var audio = new Audio('/sounds/'+ folder + '/' + sound);
        audio.play();
    }

    $scope.select_folder = function(folder) {
        $scope.selected_folder = folder;
    }
});