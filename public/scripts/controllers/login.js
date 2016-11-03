/**
 * Created by SANTOSH on 11/3/2016.
 */
angular.module('smartAdminApp').controller('loginCtrl',function($scope, $state, $window, $location,UserAuthFactory,AuthenticationFactory){



    $scope.user = {
        username:'',
        password:''

    };

    $scope.doLogin =function(){
        console.log("in Login"+$scope.user.username);
        console.log("in Login"+$scope.user.password);

    }

});