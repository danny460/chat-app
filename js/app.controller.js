'use strict';
angular
	.module('chatApp')
	.controller('appCtrl', appCtrl);

appCtrl.$inject = ["$scope"];
function appCtrl($scope){
	var socket = io();
	$scope.msg = {
		sender:'',
		timeStamp: null,
		content:''
	};
	$scope.msgList = [];

	$scope.onSend = function(msg){
		if(msg.content === '') return;
		msg.timeStamp = Date();
		msg.sender = $scope.username ? username : "unknown user";
		socket.emit('chat-message',$scope.msg);
		$scope.msg.content = '';
	};

	socket.on('chat-message',function(msg){
		$scope.msgList.push(msg);
		$scope.$apply();//update
		console.log(msg);
	});
}




