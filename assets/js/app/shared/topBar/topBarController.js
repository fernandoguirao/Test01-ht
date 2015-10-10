(function() {
  'use strict';

  angular
    .module('app')
    .controller('topBarCtrl', TopBarCtrl);

  TopBarCtrl.$inject = ['$scope', "$http", "$cookies", "topBarService","appConfig"];

  function TopBarCtrl($scope, $http, $cookies, topBarService, appConfig) {

    // INICIAR SESIÓN

    // Comprueba si hay cookie de nickname y alterna opciones de login/nickname
    $scope.$on('checkLogged', function(event) {
      if(appConfig.debug){
        console.log('Comprobamos si hay cookie de usuario y alternamos opciones de login/registro');
      }
      if ($cookies.get('user.nickname')) {
        $scope.myNickname = $cookies.get('user.nickname');
        $scope.myPicture = $cookies.get('user.picture');
        $scope.myId = $cookies.get('user.id');
        if(appConfig.debug){
          console.log('Hay cookie');
          console.log('Hemos iniciado sesión, vamos a cargar lista de elementos visibles');
        }
      } else {
        $scope.myNickname = false;
        $scope.myPicture = false;
        if(appConfig.debug){
          console.log('No hay cookie');
          console.log('No hay sesión, vamos a ocultar la lista de elementos visibles');

        }
      }
    });

    // Servicio puente para llamar checkLogged() aquí al empezar
    topBarService.checkLoggedBroadcast();

    // CERRAR SESIÓN

    $scope.cerrarSesion = function() {
      if(appConfig.debug){
        console.log('Cerrando sesión');
      }
      $cookies.remove('user.nickname');
      $cookies.remove('user.id');
      $cookies.remove('user.picture');
      if(appConfig.debug){
        console.log('Hemos eliminado cookies');
      }
      FB.logout(function(response) {
        // user is now logged out
        if(appConfig.debug){
          console.log('Hemos salido de facebook');
        }
      });
      topBarService.checkLoggedBroadcast();
    };
  }

})();
