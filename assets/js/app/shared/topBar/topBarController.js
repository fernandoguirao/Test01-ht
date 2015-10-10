(function() {
  'use strict';

  angular
    .module('app')
    .controller('topBarCtrl', TopBarCtrl);

  TopBarCtrl.$inject = ['$scope', "$http", "$cookies", "topBarService"];

  function TopBarCtrl($scope, $http, $cookies, topBarService) {

    // INICIAR SESIÓN

    // Comprueba si hay cookie de nickname y alterna opciones de login/nickname
    $scope.$on('checkLogged', function(event) {
      if ($cookies.get('nickname')) {
        $scope.myNickname = $cookies.get('nickname');
      } else {
        $scope.myNickname = false;
      }
    });

    // Servicio puente para llamar checkLogged() aquí al empezar
    topBarService.checkLoggedBroadcast();

    // CERRAR SESIÓN

    $scope.cerrarSesion = function() {
      $cookies.remove('nickname');
      $cookies.remove('id');
      FB.logout(function(response) {
        // user is now logged out
      });
      topBarService.checkLoggedBroadcast();
    };
  }

})();
