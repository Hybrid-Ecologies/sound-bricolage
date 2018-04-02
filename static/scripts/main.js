var app = angular.module("MainApp",['ngMaterial']); 
app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
  }]);

app.controller("MainCtrl", function($scope) {

    var metadata;

    $scope.init = function (sounds, meta_data) {
        $scope.sounds = sounds;
        $scope.folders = Object.keys($scope.sounds);
        metadata = meta_data;
    }

    $scope.select_folder = function(folder) {
        $scope.selected_folder = folder;
    }

    $scope.play_sound = function(folder, sound) {
        var audio = new Audio('/sounds/'+ folder + '/' + sound);
        audio.play();
    }
});