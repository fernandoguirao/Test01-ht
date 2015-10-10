(function() {
  'use strict';

  angular
    .module('app')
    .controller('facebookLoginCtrl', FacebookLoginCtrl);

  FacebookLoginCtrl.$inject = ['$scope', '$location', "$http", "$cookies", "appConfig", "topBarService"];

  function FacebookLoginCtrl($scope, $location, $http, $cookies, appConfig, topBarService) {

    // Cargamos la sdk de Facebook para login/registro

    $scope.facebookSDK = function() {

      // Cargando configuración de app de Facebook
      window.fbAsyncInit = function() {
        FB.init({
          appId: '545601412262426',
          cookie: true,
          xfbml: true,
          version: 'v2.2'
        });

        // FB.getLoginStatus() para comprobar el estado de login de la persona:
        // 'connected'\ 'not_authorized | otros

        FB.getLoginStatus(function(response) {
          $scope.statusChangeCallback(response);
        });
      };

      // Cargamos la SDK de facebook

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        if (appConfig.debug) {
          js.src = appConfig.urlbase + "js/dependencies/fb-sdk.js";
          console.log('FB SDK loaded');
        } else {
          js.src = "//connect.facebook.net/en_US/sdk.js";
        }
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

    };

    // Si no hay un usuario con sesión iniciada cargamos Facebook
    if (!$cookies.get('nickname')) {
      $scope.facebookSDK();
    }

    // CALLBACKS AL TERMINAR EL LOGIN

    $scope.checkLoginState = function() {
      FB.getLoginStatus(function(response) {
        $scope.statusChangeCallback(response);
      });
    };

    // Cuando cambia el estado de facebook del usuario
    $scope.statusChangeCallback = function(response) {

      // Si está conectado a Facebook
      if (response.status === 'connected') {
        $scope.fbConnected();
        if (appConfig.debug) {
          $scope.status = 'Connected to Facebook';
        }
      }
      // Si no se le ha autorizado la sesión de Facebook
      else if (response.status === 'not_authorized') {
        if (appConfig.debug) {
          $scope.status = 'Not authorized in Facebook';
        }
      }
      // Resto de casos (no sesión de Facebook)
      else {
          if (appConfig.debug) {
            $scope.status = 'Not logged in Facebook';
          }
      }
    };

    // Variables de usuario de facebook
    $scope.fbUserData = {};

    $scope.fbConnected = function() {
      // Fetching user data
      FB.api('/me', { locale: 'es_ES', fields: 'name, email, picture' },function(response) {
        $scope.fbUserData = response;
        if (appConfig.debug) {
          console.log('Facebook user data:');
          console.log($scope.fbUserData);
        }
      });

      topBarService.callRegisterBroadcast(event, response.email);

      // // Comprobamos si hay un usuario registrado con el email del usuario de Facebook
      // if ($cookies.get('nickname')) {
      //
      // }
      // // En caso contrario lo registramos
      // else {
      //   topBarService.callRegisterBroadcast(event, response.email);
      // }
    };
    // FIN DE CALLBACKS
  }

})();

// FUNCTION OUTSIDE ANGULAR
function checkLoginState() {
  angular.element(document.getElementById('fbloginCtrl')).scope().checkLoginState();
}
