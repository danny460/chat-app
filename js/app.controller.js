'use strict';
angular
	.module('chatApp')
	.controller('appCtrl', appCtrl);

appCtrl.$inject = ["$scope"];
function appCtrl($scope){
	var socket = io();
	$scope.msg = '';
	$scope.msgList = [];

	$scope.onSend = function(){
		socket.emit('chat-message',$scope.msg);
		$scope.msg = '';
	};

	socket.on('chat-message',function(msg){
		$scope.msgList.push(msg);
		$scope.$apply();//update
		console.log(msg);
	});
}




