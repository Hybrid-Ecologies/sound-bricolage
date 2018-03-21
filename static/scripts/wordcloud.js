var app = angular.module("WordcloudApp",['ngMaterial','angular-d3-word-cloud']); 
app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
  }]);

app.controller("WordcloudCtrl", function($scope, $window, $element) {
    $scope.init = function (sounds) {
        $scope.sounds = sounds;
        $scope.folders = Object.keys(sounds);
        $scope.words = []
        }

    $scope.select_folder = function(folder) {
        $scope.selected_folder = folder;
        words = [];
        for (i in $scope.sounds[folder]){
            sound_name = $scope.sounds[folder][i]
            words.push({
                text: sound_name.slice(0, -4),
                size: 25,
                color: '#6d989e',
                filename: sound_name
            });
        }
        $scope.words = words;
    }

    $scope.play_sound = function(word) {
        var audio = new Audio('/sounds/'+ $scope.selected_folder + '/' + word.filename);
        audio.play();
    }

    $scope.rotate = function(){
        return ~~(Math.random() * 2) * 90;
    }

    $scope.random = function(){
        return .4;
    }
});