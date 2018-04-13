var app = angular.module("PatinaApp",[]); 
app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
  }]);

app.controller("PatinaCtrl", function($scope, $window, $element, $interval) {
	$scope.sound = {
		filename: "Glass Down.wav",
		folder: "inputs",
		text: "Glass Down"
	};
	$('#patina-image').css('position', "absolute");
	$('#patina-image').css('top', "0");
	$('#patina-image').css('left', "0");
	$('#patina-image').css('z-index', "-1")
	$scope.score = 1;
	$scope.click = function(){
		var audio = new Audio('/sounds/'+ $scope.sound.folder + '/' + $scope.sound.filename);
		audio.play();
		$scope.score = ($scope.score - .08);
		if ($scope.score < 0){
			$scope.score = 0;
		}
	}
	
	var restoration = $interval(
		function(){
			if ($scope.score < 1){
				$scope.score += .005;
			}
			$('#patina-image').css('opacity', $scope.score)
		}, 80);

});