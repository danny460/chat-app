'use strict';
angular
	.module('chatApp')
	.controller('appCtrl', appCtrl);

appCtrl.$inject = ["$scope"];
function appCtrl($scope){
	var socket = io();
	$scope.msg = '';
	$scope.onSend = function(){
		
	};

	
}




