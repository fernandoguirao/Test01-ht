(function() {
  'use strict';

  angular
    .module('app')
    .controller('contactsCtrl', ContactsCtrl);

  ContactsCtrl.$inject = ['$scope', "$http", "$cookies", "appConfig"];

  function ContactsCtrl($scope, $http, $cookies, appConfig) {

    $scope.mynickname = $cookies.get('nickname');

    $scope.users = [];

    $http.get('http://bigband.me:1337/user')
    .success(function(data){
        $scope.users = data;
        console.log(data);
    })
    .error(function(data){
        console.log(data);
    });

    $scope.recipient="";

    $scope.joinRoom = function (user02,e,fnickname) {

        $(e.target).parent().parent().addClass('chat-active');
        $('.chat-select').not('.chat-active').addClass('hide');
        $('.chat-ui').removeClass('hide');
        // $scope.joinRoom = "";



        $scope.joinRoom = {
            user01_id : $cookies.get('id'),
            user02_id : user02
        };


        console.log($cookies.get('id')+' - '+user02);

        $scope.myid = 3;

        $http.post('http://bigband.me:1337/room/join',$scope.joinRoom)
        .success(function(data){
            console.log('Éxito: ' + data.hashRoom);
            $scope.hash = data.hashRoom;


            $scope.roomMessage = {
                message : '',
                author : $cookies.get('nickname'),
                recipient : fnickname
            };

            $http.get('http://bigband.me:1337/room/'+$scope.hash)
            .success(function(data){
                // $scope.myid = $cookies.get('id');
                $scope.chatList = data;


                function scrollIt(){
                   document.getElementById('navBottom').scrollIntoView();
                }
                setTimeout(scrollIt, 5);
                $scope.myid = $cookies.get('id');

            })
            .error(function(data){
                console.log(data);
            });


            $scope.chats = [];

            io.socket.on($scope.hash,function(data){

                $scope.chats.push({
                    message : data.message,
                    author : data.author,
                    recipient : data.recipient
                });

                console.log($scope.chats);
                function scrollIt(){
                   document.getElementById('navBottom').scrollIntoView();
                }
                setTimeout(scrollIt, 5);


            });
        })
        .error(function(data){
            console.log('error');
            /*data = "";
            $scope.joinRoom = "";*/
        });
    };


    $scope.sendChat = function(nickname,recipient) {



        $http.post('http://bigband.me:1337/room/'+$scope.hash,$scope.roomMessage)
        .success(function(data){
            console.log('éxito '+data);
            $scope.roomMessage.message = "";
            document.getElementById('navBottom').scrollIntoView();
        })
        .error(function(data){
            console.log('error '+data);
        });

    };

  }

})();
