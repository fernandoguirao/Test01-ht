(function() {
  'use strict';

  angular
    .module('app')
    .controller('registerModalCtrl', RegisterModalCtrl);

  RegisterModalCtrl.$inject = ['$scope', "$http", "$cookies", "appConfig", "topBarService"];

  function RegisterModalCtrl($scope, $http, $cookies, appConfig, topBarService) {

    // Array datos de usuario desde formulario de registro
    $scope.user = {};
    $scope.user.picture = 0;
    $scope.user.first_name = 0;
    $scope.user.last_name = 0;
    // Si no es registro vía Facebook
    $scope.fbComing = false;

    // Viene de facebooklogin -> servicio y sirve para llamar la función de registro
    $scope.$on('callRegister', function(event,vEmail,vFirstName,vLastName,vPicture) {
      $scope.user = {
        email : vEmail,
        nickname : vEmail,
        password : 0,
        picture : vPicture,
        first_name : vFirstName,
        last_name : vLastName
      };
      if(appConfig.debug){
        console.log('Venimos de Facebook, vamos a registrar a este usuario');
        console.log($scope.user);
      }
      $scope.register();
      // Variable para identificar que es registro vía facebook y podamos intentar login si el usuario existe
      $scope.fbComing = true;
    });

    // Cuando enviamos el formulario
    $scope.register = function() {

      $http.post(appConfig.urlbase + '/user/new', $scope.user)
        .success(function(data) {

          $('#registerModal').modal('hide');

          // Log
          if (appConfig.debug) {
            console.log('Success -> Registro vía api');
            console.log(data);
          }

          // Login vía servicio
          topBarService.callLoginBroadcast(event, $scope.user.nickname);

        })
        .error(function(data) {
          // Log
          if (appConfig.debug) {
            console.log('Error -> Registro vía api');
            console.log(data);
          }

          // Si es a través de Facebook intentamos iniciar sesión
          if ($scope.fbComing){
            if (appConfig.debug) {
              console.log('No se pudo registrar con Facebook. Probamos login.');
            }
            topBarService.callLoginBroadcast(event, $scope.user.nickname);
          }
        });
    };
  }

})();
