var app = angular.module("PavlovApp",[]); 
app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
  }]);

app.controller("PavlovCtrl", function($scope, $window, $element, $interval) {
	var max_y = $window.innerHeight - 2 * $('#button').height();
	var max_x = $window.innerWidth - 2 * $('#button').width();
	$('#button').css('position', 'absolute');
	$scope.sound = {
		filename: "Settle In.wav",
		folder: "alerts",
		text: "Settle In"
	};
	$scope.score = 0;

	$scope.click = function(){
		console.log("Button clicked at ("+$('#button').css('left')+", "+$('#button').css('top')+")")
		var audio = new Audio('/sounds/'+ $scope.sound.folder + '/' + $scope.sound.filename);
		$('#button').css('left', Math.random() * max_x + "px");
		$('#button').css('top', Math.random() * max_y + "px");
		audio.play();
		$scope.score += 100;
	}

	var relocation = $interval(
		function(){
			if ($scope.score > 0) {
				$('#button').css('left', Math.random() * max_x + "px");
				$('#button').css('top', Math.random() * max_y + "px");
			}
		}, 1000);
		
	
	var decay = $interval(
		function(){
			if ($scope.score > 0){
				$scope.score -= 1;
			}
		}, 50);

});