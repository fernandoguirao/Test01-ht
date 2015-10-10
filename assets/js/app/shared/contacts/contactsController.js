(function() {
  'use strict';

  angular
    .module('app')
    .controller('contactsCtrl', ContactsCtrl);

  ContactsCtrl.$inject = ['$scope', "$http", "$cookies", "appConfig"];

  function ContactsCtrl($scope, $http, $cookies, appConfig) {

    // FUNCIÓN PARA OBTENER LISTA DE USUARIOS

    $scope.getUsers = function() {
      // Excluiremos nuestro usuario con el filtro en vista
      $scope.myNickname = $cookies.get('user.nickname');
      $scope.users = [];
      $http.get('http://bigband.me:1337/user')
        .success(function(data) {

          $scope.users = data;

          if (appConfig.debug) {
            console.log('Hemos recibido la lista de usuarios correctamente.');
            console.log(data);
          }
        })
        .error(function(data) {
          if (appConfig.debug) {
            console.log('Hubo un error pidiendo la lista de usuarios');
            console.log(data);
          }
        });
    };

    if ($cookies.get('user.nickname')) {
      $scope.getUsers();
    }

  }

})();
