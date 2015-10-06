(function(){

    var yexir = angular.module('yexir',['ngCookies']);

     yexir.controller('yexirLayoutCtrl',["$scope", "$http","$cookies", function($scope,$http,$cookies){

        $scope.loadData = function () {
            if ($cookies.get('nickname')) {
                $scope.myNickname = $cookies.get('nickname');
            } else {
                $scope.myNickname = false;
            }
        };

        $scope.$on('loadsData', function(event) {
            if ($cookies.get('nickname')) {
                $scope.myNickname = $cookies.get('nickname');
            } else {
                $scope.myNickname = false;
            }
        });

        $scope.loadData();

        $scope.cerrarSesion = function() {
            $cookies.remove('nickname');
            $cookies.remove('id');
            $scope.loadData();
        }

    }]);

    // SEND CHAT

    yexir.controller('sendChatCtrl', ["$scope","$http","$cookies",function($scope,$http,$cookies){

        var myNickname = $cookies.get('nickname');

        $scope.chats = [];
        var meClass=""; 

        

        io.socket.on("news",function(data){

            if (myNickname === data.author) {
                meClass = 'me-author';
            } else {
                meClass = 'you-author';
            }

            $scope.chats.push({
                message : data.message,
                author : data.author,
                me : meClass
            });

            console.log($scope.chats);
            
        })

        // io.socket.on("messageevent",function(data) {
        //     console.log('Ok room');
        //     console.log(data);
        // })
        
        // io.socket.on('mysecretroom');
        // io.socket.on('messageevent', data);

        // $scope.joinRoom = function() {
        //     $http.post('http://bigband.me:1337/room/join')
        //     .success(function(data){
        //         console.log('Éxito: '+data);
        //         // console.log(data);
        //     })
        //     .error(function(data){
        //         console.log('error'+data);
        //     });
        // }
        // $scope.writeRoom = function() {
        //     $http.post('http://bigband.me:1337/room')
        //     .success(function(data){
        //         console.log('éxito'+data);
        //         // console.log(data);
        //     })
        //     .error(function(data){
        //         console.log('error');
        //     });
        // }

        /*io.socket.on('connection', function(socket){
            alert('hola');
          socket.join('some room');
        });

        io.socket.on('connection', function(socket){
          socket.on('say to someone', function(id, msg){
            socket.broadcast.to(id).emit('my message', msg);
          });
        });*/

        

        $scope.sendChat = function(){
            
            $scope.chat.author = $cookies.get('nickname');

            $http.post('http://bigband.me:1337/room/'+hash,$scope.chat)
            .success(function(data){
                console.log('éxito');
                console.log(data);
            })
            .error(function(data){
                console.log('error');
            });
        };


    
    }]);

    // END SEND CHAT

    // REGISTER

    yexir.controller('registerCtrl', ["$scope","$http",function($scope,$http){

        $scope.user = {};

        $scope.register = function(){
            
            $http.post('http://bigband.me:1337/user/new',$scope.user)
            .success(function(data){
                console.log('éxito crea user');
                $('#registerModal').modal('hide');
            })
            .error(function(data){
                console.log('error crea user');
            });
        };
    
    }]);

    // END REGISTER

    // LOGIN

    yexir.controller('loginCtrl', ["$scope","$http","$cookies",function($scope,$http,$cookies){

        $scope.logUser = {};

        $scope.login = function(){
            
            $http.post('http://bigband.me:1337/user/login',$scope.logUser)
            .success(function(data){
                console.log('éxito login user');
                
                $cookies.put('nickname',data.nickname); 
                $cookies.put('id',data.id);            

                console.log(data.nickname);

                $scope.$emit('loadsData');

                $('#loginModal').modal('hide');

            })
            .error(function(data){
                console.log('error login user');
            });
        };
    
    }]);

    // END LOGIN
    
    // GET USERS

    yexir.controller('listUsersCtrl', ["$scope","$http","$cookies",function($scope,$http,$cookies){

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
            }

            console.log($cookies.get('id')+' - '+user02);


            $http.post('http://bigband.me:1337/room/join',$scope.joinRoom)
            .success(function(data){
                console.log('Éxito: ' + data.hashRoom);
                $scope.hash = data.hashRoom;

                $scope.roomMessage = {
                    message : '',
                    author : $cookies.get('nickname'),
                    recipient : fnickname
                }

                $http.get('http://bigband.me:1337/room/'+$scope.hash)
                .success(function(data){
                    $scope.chatList = data;
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
                    
                })
            })
            .error(function(data){
                console.log('error');
                /*data = "";
                $scope.joinRoom = "";*/
            });
        }

        
        $scope.sendChat = function(nickname,recipient) {

            

            $http.post('http://bigband.me:1337/room/'+$scope.hash,$scope.roomMessage)
            .success(function(data){
                console.log('éxito '+data);
                $scope.roomMessage.message = "";
            })
            .error(function(data){
                console.log('error '+data);
            });

        }
    
    }]);

    // END GET USERS



})()