'use strict';
angular
	.module('chatApp')
	.controller('appCtrl', appCtrl);

appCtrl.$inject = ['$scope','$mdToast','$mdDialog','$timeout'];
function appCtrl($scope, $mdToast, $mdDialog, $timeout){
	window.onload = popForUsername();
	var socket = io();
	$scope.isTypingRemote = false;
	$scope.isTypingRemoteUsername = '';
	$scope.msgList = [];

	$scope.onSend = function(msg){
		if(msg.content === '') return;
		msg.timeStamp = Date();
		socket.emit('chat-message',$scope.msg);
		$scope.msg.content = '';
	};

	$scope.onTyping = function(){
		var msg = {
			sender: $scope.msg.sender,
			isTyping: true
		}
		socket.emit('typing',msg);
	}	

	$scope.onExitTyping = function(msg){
		var msg = {
			sender: $scope.msg.sender,
			isTyping: false
		}
		socket.emit('typing',msg);
	}

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
	});

	socket.on('typing', function(msg){
		console.log(msg.sender,"typing:",msg.isTyping);
		$scope.isTypingRemote = msg.isTyping;
		$scope.isTypingRemoteUsername = msg.sender;
		$scope.$apply();
	});

	function popForUsername() {
		$mdDialog.show({
			controller: DialogController,
			templateUrl: './template/prompt.template.html',
			parent: angular.element(document.body),
			clickOutsideToClose:false,
			fullscreen: true // Only for -xs, -sm breakpoints.
		})
		.then(function(username) {
			$scope.msg = {
				sender: username ? username : "unknown user",
				timeStamp: null,
				content:''
			};
		});

		function DialogController($scope, $mdDialog){
			$scope.onClickOK = function(username) {
      			$mdDialog.hide(username);
    		};
		}
	}
}




