(function() {
  'use strict';

  angular
    .module('app', ['ngCookies','ngRoute'])
    // .config(function($routeProvider){
    //   $routeProvider.when("/:param1",
    //     {
    //       // templateUrl: "app.html",
    //       // controller: "AppCtrl",
    //       // controllerAs: "app"
    //     }
    //   );
    // })
    .value('appConfig', {
      'urlbase': 'http://bigband.me:1337',
      'debug': true
    });

})();
