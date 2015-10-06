(function(){

    // var urlbase = 'http://localhost:1337';
    // var urlbase = 'https://bueninvento.fwd.wf';
    
    var yexir = angular.module('yexir',['ngAnimate']);

     yexir.controller('yexirLayoutCtrl',function($scope,$http){
        
        if (angular.element('.page').hasClass('home')){
            $scope.ishome = false;
        } else {
            $scope.ishome = true;
        }
        // SEGMENT
        analytics.ready(function(){
            /*var anonId = mixpanel.get_distinct_id();
            console.log(anonId);*/
            // analytics.alias({ previousId: anonId });
            analytics.identify();
            mixpanel.identify();
        });
        // END SEGMENT
    });
    // // // // // // // // //
    // INVITACIÓN DE USUARIO //
    // // // // // // // // //
    
    yexir.controller('yexirInvitaCtrl',function($scope,$http,$sce,$templateRequest, $sce, $compile){
        
        var templateUrl = $sce.getTrustedResourceUrl('mails/mail.html');
        
        $scope.check = false;
        $scope.step1 = true;
        $scope.step2 = false;
        $scope.invitationData = {};

        $scope.sendInvitation = {};
        $scope.sendInvitation.message = "l";

        $templateRequest(templateUrl).then(function(template) {

               $compile($("#my-element").html(template).contents())($scope);
               $scope.sendInvitation.message = template; 
               
           }, function() {
               // An error has occurred
        });

        $scope.sendInvitation.subject = 'Tu invitación de Yexir está muy cerca...';

        $scope.askInvitation = function(){

            $scope.check = true;


            $http.post('http://yexir.com/user/invite/new',$scope.sendInvitation)
            .success(function(data){
                $scope.invitationData = data;
                successs = JSON.stringify(data);
                console.log('SUCCESS. Details: '+successs);
                console.log($scope.invitationData);
                $scope.askInvitationMail();

                // SEGMENT
                analytics.track('Submit invitation', {
                  server: 'success',
                  email: $scope.sendInvitation.email
                }); 
                // END SEGMENT
            })
            .error(function(data){
                $scope.check = false;
                $scope.invitationData = data; 
                fails = JSON.stringify(data);
                console.log('FAIL. Details: '+fails);
                $scope.step1 = false;
                $scope.step2 = true;
                // SEGMENT
                analytics.track('Submit invitation', {
                  server: 'error',
                  email: $scope.sendInvitation.email
                });
                // END SEGMENT
            })
        };

        $scope.askInvitationMail = function(){
            $http.post('http://yexir.com/sendmail/askinvite',$scope.sendInvitation)
            .success(function(data){
                console.log('mail enviado');
                $scope.invitationData = data;
                $scope.step1 = false; 
                $scope.step3 = true;
                $scope.successStrange();
                $scope.check = false;
            })
            .error(function(data){
                fails = JSON.stringify(data);
                console.log('FAIL. Details: '+fails);
                $scope.check = false;
            })
        };

        $scope.successStrange = function(){
            $http.post('http://yexir.com/user/invite/new',$scope.sendInvitation)
            .success(function(data){
                // SEGMENT
                analytics.identify($scope.invitationData.ranking, {
                  traits: {
                    email: $scope.sendInvitation.email,
                    status: 'not activated',
                    ranking: $scope.invitationData.ranking
                  }
                });
                mixpanel.people.set({
                    "$email": $scope.sendInvitation.email,    // only special properties need the $
                    "status" : "not activated",
                    "ranking" : $scope.invitationData.ranking
                });

                // END SEGMENT
            }).error(function(data){
                $scope.invitationData = data;
// SEGMENT
                
                analytics.identify($scope.invitationData.ranking, {
                  traits: {
                    email: $scope.sendInvitation.email,
                    status: 'not activated',
                    ranking: $scope.invitationData.ranking
                  }
                });
                mixpanel.people.set({
                    "$email": $scope.sendInvitation.email,    // only special properties need the $
                    "status" : "not activated",
                    "ranking" : $scope.invitationData.ranking
                });
                // END SEGMENT
            });
        };

        $scope.sendUser = {};
        $scope.createUser = function(){
            
            $http.post('http://yexir.com/user/new',$scope.sendUser)
            .success(function(data){
                success = JSON.stringify(data);
                $scope.step3 = true;
                console.log('SUCCESS. Details: '+success);
            })
            .error(function(data){ 
                $scope.step2 = true;
                $scope.step3 = false;
                fails = JSON.stringify(data);
                console.log('FAIL. Details: '+fails)
            })
        };

        
    });

    // // // // // // // // //
    // ACTIVACIÓN DE USUARIO //
    // // // // // // // // //

    yexir.controller('yexirActivaCtrl',function($scope,$http,$sce,$templateRequest, $sce, $compile){

        console.log('yeah');

        $scope.filters = {
            criteria : "ab@a.com",
            limit : "5",
            skip : "0",
            sort : "asc"
        };
        
        $scope.searchInvites = false;

        $scope.userData = {
            email : "ab@a.com"
        }

        $scope.users = [];
        
        $scope.getUsers = function(){
            if (!$scope.searchInvites) {
                $http.get('http://yexir.com/users/list?limit='+$scope.filters.limit+'&skip='+$scope.filters.skip+'&sort='+$scope.filters.sort+'&criteria='+$scope.filters.criteria)
                .success(function(data){
                    success = JSON.stringify(data);
                    $scope.users = data;
                    console.log('SUCCESS. Details: '+success);
                })
                .error(function(data){
                    fails = JSON.stringify(data);
                    console.log('FAIL. Details: '+fails);
                })
            } else {
                $http.get('http://yexir.com/users/invite/list?limit='+$scope.filters.limit+'&skip='+$scope.filters.skip+'&sort='+$scope.filters.sort+'&criteria='+$scope.filters.criteria)
                .success(function(data){
                    success = JSON.stringify(data);
                    $scope.users = data;
                    console.log('SUCCESS. Details: '+success);
                })
                .error(function(data){
                    fails = JSON.stringify(data);
                    console.log('FAIL. Details: '+fails);
                })
            }
        };

        $scope.elemail = "fernando@bueninvento.es";
        $scope.activaInvite = function(email,phone){
            
            $scope.userData.email = email;
            $scope.userData.phone = phone;

            $http.post('http://yexir.com/user/new',$scope.userData)
            .success(function(data){
                success = JSON.stringify(data);
                $scope.createUserMail($scope.userData.email);
                console.log('SUCCESS. Details: '+success);
            })
            .error(function(data){

                fails = JSON.stringify(data);
                console.log('FAIL. Details: '+fails)
            })
        };

        var templateUrl = $sce.getTrustedResourceUrl('mails/mail-activa.html');
        

        $scope.sendInvitation = {
            email : $scope.userData.email,
            message : 'l',
            subject : 'Bienvenido a Yexir, tu mayordomo virtual'
        };

        $templateRequest(templateUrl).then(function(template) {

               $compile($("#my-element").html(template).contents())($scope);
               $scope.sendInvitation.message = template; 
               
           }, function() {
               // An error has occurred
        }); 

        $scope.createUserMail = function(email){
            $scope.sendInvitation.email = email;
            $http.post('http://yexir.com/sendmail/createuser',$scope.sendInvitation)
            .success(function(data){
                console.log($scope.sendInvitation.email);
                console.log('mail enviado');
            })
            .error(function(data){
                fails = JSON.stringify(data);
                console.log('FAIL. Details: '+fails)
            })
        };

    });

    // // // // // // // // //
    // USER ACCESS Y STRIPE   //
    // // // // // // // // //

    yexir.controller('yexirAccessCtrl',function($scope,$http,$location){
        $scope.hashurl = $location.absUrl().split('/').pop();
    });

})();
