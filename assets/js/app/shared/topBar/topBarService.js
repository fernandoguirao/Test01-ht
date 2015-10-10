(function() {
  'use strict';

  angular
    .module('app')
    .factory('topBarService', ['$rootScope',function($rootScope) {

      return {
        checkLoggedBroadcast: function(event,nickname) {
          return $rootScope.$broadcast('checkLogged');
        },
        callLoginBroadcast: function(event,nickname) {
          return $rootScope.$broadcast('callLogin',nickname,'234','lll');
        },
        callRegisterBroadcast: function(event,email,first_name,last_name,picture) {
          return $rootScope.$broadcast('callRegister',email,first_name,last_name,picture);
        }
      };
    }]);
})();
