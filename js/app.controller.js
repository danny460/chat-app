'use strict';
angular
	.module('chatApp')
	.controller('appCtrl', appCtrl);

appCtrl.$inject = ['$scope','$mdToast','$timeout'];
function appCtrl($scope, $mdToast, $timeout){
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
		$scope.$apply();
		$timeout(function() {
      		var scroller = document.getElementById("chat-content-box");
      		scroller.scrollTop = scroller.scrollHeight;
    	}, 0, false);
	});

	socket.on('connection', function(){
		$mdToast.show(
      		$mdToast.simple()
        	.textContent('A user joins the chat!')
        	.position('top right')
        	.hideDelay(3000)
    	);
	})
}




