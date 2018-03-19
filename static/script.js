var app = angular.module("MainApp",['ngMaterial']); 
app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
  }]);

app.controller("MainCtrl", function($scope, $mdDialog) {
    $scope.button_press = function() {
        var audio = new Audio('/sounds/alerts/Affirmative.wav');
        audio.play();
    }
});