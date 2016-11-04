'use strict';
/**
 * @ngdoc overview
 * @name smartAdminApp
 * @description
 * # smartAdminApp
 *
 * Main module of the application.
 */

var api = {
    protocol: 'http',
    server: 'localhost',
    port: 3000,
    baseUrl: '/api/v1',
    loginUrl: '/login',
    registerUrl: '/register',

};


var apiUrl = api.protocol + '://' + api.server + ':' + api.port + api.baseUrl;
var apiLoginUrl = api.protocol + '://' + api.server + ':' + api.port + api.loginUrl;
var apiRegisterUrl = api.protocol + '://' + api.server + ':' + api.port + api.registerUrl;
var initInjector = angular.injector(['ng']);
var $http = initInjector.get('$http');

var app = angular
  .module('smartAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
      'ngCookies',
    'angular-loading-bar',
      'ngFileUpload',
      'flow',
      'toaster',
      'xeditable',
      'smart-table'
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });


    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'smartAdminApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js',
                        'scripts/utils/serverTableFetch.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'smartAdminApp',
              files:[
              'scripts/controllers/main.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              'scripts/directives/chat/chat.js',
              'scripts/directives/dashboard/stats/stats.js'

              ]
            })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    }).state('dashboard.upload',{
            templateUrl:'scripts/directives/dashboard/Upload/upload.directive.html',
            url:'/upload',
            controller:'UploadCtrl',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'smartAdminApp',
                    files:[
                        'scripts/controllers/upload.js',
                        'scripts/directives/dashboard/Upload/upload.js'
                    ]
                })
            }
          }
        })
        .state('dashboard.blankPage',{
            templateUrl:'scripts/directives/dashboard/Blank/blank.directive.html',
            url:'/blankPage',
            controller:'BlankCtrl',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'smartAdminApp',
                        files:[
                            'scripts/controllers/blank.js',
                            'scripts/directives/dashboard/Blank/blank.js'
                        ]
                    })
                }
            }
        }).state('dashboard.uploadProcessing',{
        templateUrl:'scripts/directives/dashboard/UploadProcessing/uploadProcessing.directive.html',
        url:'/uploadProcessing',
        controller:'UploadProcessingCtrl',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'smartAdminApp',
                    files:[
                        'scripts/controllers/uploadprocessing.js',
                        'scripts/directives/dashboard/UploadProcessing/uploadProcessing.js'
                    ]
                })
            }
        }
        }).state('dashboard.train',{
           templateUrl:'views/dashboard/train.tmpl.html',
            url:'/train',
            controller:'trainCtrl',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'smartAdminApp',
                        files:[
                            'scripts/controllers/train.js',
                            'scripts/directives/dashboard/train/train.js'
                        ]
                    })
                }
            }
        }).state('dashboard.trainStation',{
        templateUrl:'views/dashboard/trainStation.tmpl.html',
        url:'/trainStation',
        controller:'trainStationCtrl',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'smartAdminApp',
                    files:[
                        'scripts/controllers/trainStation.js',
                        'scripts/directives/dashboard/trainStation/trainStation.js'
                    ]
                })
            }
        }
    }).state('dashboard.blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank'
    }).state('login',{
        templateUrl:'views/pages/login.html',
        url:'/login',
          controller:'loginCtrl',
          resolve: {
              loadMyFiles:function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                      name:'smartAdminApp',
                      files:[
                          'scripts/controllers/login.js'

                      ]
                  })
              }
          }
      })
  }]);
app.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

    
