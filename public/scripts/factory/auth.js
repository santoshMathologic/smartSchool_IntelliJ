/**
 * Created by SANTOSH on 11/3/2016.
 */
var app = angular.module('smartAdminApp');
app.factory('AuthenticationFactory', function($window) {
    var auth = {
        isLogged: false,
        isLoggedIn: function(){
            return this.check();
        },
        check: function() {
            if ($window.sessionStorage.token && $window.sessionStorage.user) {
                this.isLogged = true;
            } else {
                this.isLogged = false;
                delete this.user;
            }
            return (this.isLogged)?this.isLogged:false;
        }
    }

    return auth;
});

app.factory('UserAuthFactory', function($state,$window, $location, $http, AuthenticationFactory) {
    return {
        login: function(username, password) {
            return $http.post(apiLoginUrl, {
                username: username,
                password: password
            });
        },
        logout: function() {

            if (AuthenticationFactory.isLogged) {

                AuthenticationFactory.isLogged = false;
                delete AuthenticationFactory.user;
                delete AuthenticationFactory.userRole;
                delete $window.sessionStorage.userPlan;
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user;
                delete $window.sessionStorage.userRole;

               //$cookies = {};

                $state.go("home.login");
            }

        }
    }
});

app.factory('TokenInterceptor', function($q, $window) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['X-Access-Token'] = $window.sessionStorage.token;
                config.headers['X-Key'] = $window.sessionStorage.user;
                config.headers['Content-Type'] = config.headers['Content-Type'] || "application/json";
            }
            return config || $q.when(config);
        },

        response: function(response) {
            return response || $q.when(response);
        }
    };
});