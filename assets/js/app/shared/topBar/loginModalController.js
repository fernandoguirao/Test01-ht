(function() {
  'use strict';

  angular
    .module('app')
    .controller('loginModalCtrl', LoginModalCtrl);

  LoginModalCtrl.$inject = ['$scope', "$http", "$cookies", "appConfig", "topBarService"];

  function LoginModalCtrl($scope, $http, $cookies, appConfig, topBarService) {

    // Datos de login de usuario desde el formulario
    $scope.logUser = {};

    // Viene de registro -> servicio y sirve para llamar la función de login
    $scope.$on('callLogin', function(event,vNickname,vPassword,vEmail) {
      $scope.logUser = {
        nickname : vNickname
      };
      $scope.login();
    });

    // Cuando envía el formulario de login
    $scope.login = function() {

      $http.post(appConfig.urlbase + '/user/login', $scope.logUser)
        .success(function(data) {

          // Guardamos cookies con nickname e id
          $cookies.put('user.nickname', data.nickname);
          $cookies.put('user.id', data.id);
          $cookies.put('user.picture',data.picture);

          // Servicio puente para llamar checkLogged() en topBarController
          topBarService.checkLoggedBroadcast();

          $('#loginModal').modal('hide');

          // Log
          if (appConfig.debug) {
            console.log('Success -> Login vía api');
            console.log(data);
          }
          angular.element(document.getElementById('contactsCtrl')).scope().getUsers();
        })
        .error(function(data) {
          // Log
          if (appConfig.debug) {
            console.log('Error -> Login vía api');
            console.log(data);
          }
        });
    };
  }

})();
