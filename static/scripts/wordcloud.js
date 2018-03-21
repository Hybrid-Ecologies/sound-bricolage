var app = angular.module("WordcloudApp",['ngMaterial','angular-d3-word-cloud']); 
app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
  }]);

app.controller("WordcloudCtrl", function($scope, $window, $element) {

    var max_word_size = screen.width * .05;
    var min_word_size = max_word_size / 5

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
                size: min_word_size + (max_word_size - min_word_size) * Math.random(),
                color: '#'+Math.floor(Math.random()*16777215).toString(16),
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
        return ((Math.random() * 2) -1) * 90;
    }

    $scope.random = function(){
        return .5;
    }
});