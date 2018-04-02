var app = angular.module("WordcloudApp",['ngMaterial','angular-d3-word-cloud']); 
app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
  }]);

app.controller("WordcloudCtrl", function($scope, $window, $element) {

    var max_word_size = screen.width * .05;
    var min_word_size = max_word_size / 5;
    var range_word_size = max_word_size - min_word_size;
    var metadata;

    $scope.init = function (sounds, meta_data) {
        $scope.sounds = sounds;
        $scope.folders = Object.keys(sounds);
        metadata = meta_data;
        $scope.words = []
        }

    $scope.select_folder = function(folder) {
        $scope.selected_folder = folder;
        words = [];
        for (i in $scope.sounds[folder]){
            sound = $scope.sounds[folder][i];
            var min_folder_size = metadata[folder].min_word_size;
            var range_folder_size = metadata[folder].max_word_size - min_folder_size;
            words.push({
                text: sound.text,
                size: min_word_size + (range_word_size) * (sound.size - min_folder_size)/range_folder_size,
                color: '#'+Math.floor(Math.random()*16777215).toString(16),
                filename: sound['filename']
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