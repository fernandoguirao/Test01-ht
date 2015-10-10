(function() {
  'use strict';

  angular
    .module('app')
    .controller('roomsCtrl', RoomsCtrl);

  RoomsCtrl.$inject = ['$scope', "$http", "$cookies", "appConfig"];

  function RoomsCtrl($scope, $http, $cookies, appConfig) {

    // FUNCIÓN PARA ENTRAR EN UN ROOM

    $scope.joinRoom = function(e, receptorId, receptorNickname) {

      // Guardamos la id del usuario y su nick para identificar los mensajes del usuario
      $scope.myId = $cookies.get('user.id');
      $scope.myNickname = $cookies.get('user.nickname');

      // Añadimos la clase activo al chat seleccionado
      $(e.target).parent().parent().addClass('chat-active');
      $('.chat-select').not('.chat-active').addClass('hide');
      $('.chat-ui').removeClass('hide');

      if (appConfig.debug) {
        console.log('Inicializamos chatRoom entre usuarios con ID: ' + $cookies.get('user.id') + ' - ' + receptorId);
      }

      // ??
      // $scope.receptor = "";
      // ??


      // Definimos las variables de quienes forman parte del room
      $scope.joinRoom = {
        user01_id: $cookies.get('user.id'),
        user02_id: receptorId
      };
      // Nos unimos al room
      $http.post('http://bigband.me:1337/room/join', $scope.joinRoom)
        .success(function(data) {

          // Almacenamos el hash del nombre del room.
          $scope.hash = data.hashRoom;

          // Guardamos datos del usuario y el receptor para reutilizarlos
          $scope.me = {
            id: $scope.joinRoom.user01_id,
            nickname: $cookies.get('user.nickname'),
            picture: $cookies.get('user.picture')
          };
          // Los datos del receptor los conseguimos con un /get -> user
          $http.get(appConfig.urlbase + '/user/' + $scope.joinRoom.user02_id)
            .success(function(data) {
              $scope.you = {
                id: data.id,
                nickname: data.nickname,
                picture: data.picture
              };
              if (appConfig.debug) {
                console.log('Success -> Consiguiendo datos del receptor:');
                console.log(data);
              }
            })
            .error(function(data) {
              if (appConfig.debug) {
                console.log('Error -> Consiguiendo datos del receptor:');
                console.log(data);
              }
            });

          if (appConfig.debug) {
            console.log('Success -> Nos hemos unido al room:');
            console.log(data);
          }

          // Inicializamos el objeto con el mensaje que el usuario escribirá y lo vaciamos de contenido.
          $scope.roomMessage = {
            message: '',
            author: $cookies.get('user.nickname'),
            recipient: receptorNickname
          };

          // Obtenemos el histórico de mensajes de este room
          $http.get(appConfig.urlbase + '/room/' + $scope.hash)
            .success(function(data) {
              $scope.chatList = data;
              if (appConfig.debug) {
                console.log('Hemos obtenido el histórico de mensajes de este room:');
                console.log($scope.chatList);
              }
              // Hacemos scroll hasta el final de la página
              function scrollIt() {
                document.getElementById('navBottom').scrollIntoView();
              }
              setTimeout(scrollIt, 5);

            })
            .error(function(data) {
              if (appConfig.debug) {
                console.log('Hubo en error obteniendo el histórico de mensajes:');
                console.log(data);
              }
            });

          // NOS SUSCRIBIMOS AL SOCKET DEL ROOM.

          // Creamos un array de objetos para cada nuevo mensaje
          $scope.chats = [];
          // Inicializamos el socket
          io.socket.on($scope.hash, function(data) {
            $scope.$apply(function() {
              if (appConfig.debug) {
                console.log('Nos hemos sucrito al socket del room. Hemos recibido este objeto:');
                console.log(data);
              }
              // Cada vez que hay un mensaje nuevo lo añadimos al array de mensajes
              $scope.chats.push({
                message: data.message,
                author: data.author,
                recipient: data.recipient
              });

              if (appConfig.debug) {
                console.log('Hay un nuevo mensaje en el array de chats del socket:');
                console.log($scope.chats);
              }
              // Hacemos scroll hasta el final de la página
              function scrollIt() {
                document.getElementById('navBottom').scrollIntoView();
              }
              setTimeout(scrollIt, 5);
            });


          });
        })
        .error(function(data) {
          if (appConfig.debug) {
            console.log('Error -> No pudimos unirnos al room');
            console.log(data);
          }
        });
    };

    // FUNCIÓN PARA ENVIAR UN MENSAJE

    $scope.sendChat = function(nickname, recipient) {

      $http.post('http://bigband.me:1337/room/' + $scope.hash, $scope.roomMessage)
        .success(function(data) {
          if (appConfig.debug) {
            console.log('Success -> Mensaje enviado:');
            console.log(data);
          }
          // Vaciamos el input del form para el siguiente mensaje
          $scope.roomMessage.message = "";
          // Hacemos scroll hasta el final
          document.getElementById('navBottom').scrollIntoView();
        })
        .error(function(data) {
          if (appConfig.debug) {
            console.log('Error -> No se pudo enviar el mensaje');
            console.log(data);
          }
        });
    };

  }
})();
