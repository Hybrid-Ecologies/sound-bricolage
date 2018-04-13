var app = angular.module("WordcloudApp",['ngMaterial','angular-d3-word-cloud']); 
app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
  }]);

app.controller("WordcloudCtrl", function($scope, $window, $element) {
	
	var metadata;

    $scope.init = function (sounds, meta_data) {
        $scope.sounds = sounds;
        $scope.folders = Object.keys(sounds);
        metadata = meta_data;
		$scope.words = [];
		$scope.selected_sound = {};
		$scope.selection = [];
		}

    $scope.select_folder = function(folder) {
		$scope.wordcloud_width = $("#wordcloud-col").width();
		$scope.wordcloud_height = $("#wordcloud-col").height() * .8;
		var max_word_size = $("#wordcloud-col").width() / 15;
		var min_word_size = max_word_size / 4;
		var range_word_size = max_word_size - min_word_size;
        $scope.selected_folder = folder;
        words = [];
        for (i in $scope.sounds[folder]) {
            sound = $scope.sounds[folder][i];
            var min_folder_size = metadata[folder].min_file_size;
            var range_folder_size = metadata[folder].max_file_size - min_folder_size;
            words.push({
				folder: folder,
                text: sound.text,
				size: min_word_size + (range_word_size) * (sound.size - min_folder_size)/range_folder_size,
				filesize: sound.size,
                color: '#'+Math.floor(Math.random()*16777215).toString(16),
                filename: sound['filename']
            });
        }
        $scope.words = words;
	}
	
	$scope.select_sound = function(sound) {
		$scope.selected_sound = sound;
		$scope.$apply();
		$scope.play_sound(sound);
	}

    $scope.play_sound = function(sound) {
        var audio = new Audio('/sounds/'+ sound.folder + '/' + sound.filename);
        audio.play();
	}
	
	$scope.add_sound = function(sound) {
		if (!sound.text) {
			return;
		}
		for (var i = 0; i < $scope.selection.length; i++) {
			if ($scope.selection[i].text == sound.text) {
				return;
			}
		}
		$scope.selection.push(sound);
	}

	$scope.remove_sound = function(sound) {
		for (var i = 0; i < $scope.selection.length; i++) {
			if ($scope.selection[i].text == sound.text) {
				$scope.selection.splice(i, 1);
			}
		}
	}

    $scope.rotate = function(){
        return ((Math.random() * 2) -1) * 90;
    }

    $scope.random = function(){
        return .5;
	}
	
	$scope.download_selection = function(selection) {
		json = generate_json(selection);
		var link = document.createElement("a");
    	link.download = "selection.txt";
    	var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
    	link.href = "data:" + data;
    	link.click();
	}

	var generate_json = function(selection) {
		json = []
		for (var i = 0; i < $scope.selection.length; i++) {
			sound = $scope.selection[i];
			json.push({
				folder : sound.folder,
				text : sound.text,
				filename : sound.filename,
				filesize: sound.filesize
			});
		}
		return json;
	}
});