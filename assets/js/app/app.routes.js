// (function() {
//   'use strict';
//
//   angular
//     .module('app')
//     .config(routeConfig)
//     .run(['$location', '$rootScope', function($location, $rootScope) {
//       $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
//           $rootScope.title = current.$$route.title;
//       });
//     }]);
//
//     routeConfig.$inject = ['$routeProvider'];
//
//     function routeConfig($routeProvider) {
//       // if (appConfig.debug) {
//       console.log('Success -> Inicializar routeConfig');
//       // }
//       $routeProvider
//           .when('/:param1',{ title: 'people'})
//           .otherwise({ redirectTo: '/' });
//       // if (appConfig.debug) {
//
//       // }
//     }
//
// })();
