/**
 * Created by SANTOSH on 11/2/2016.
 */
'use strict';

angular.module('sbAdminApp')
    .controller('UploadCtrl', function($scope,$http) {
  $scope.getUploads = function () {
            var apiUrl = "http://localhost:3000/api/v1/upload"
            var query = {
                limit: 10,
                page: 1,
                sortBy: "originalFileName"

            }
            $scope.uploadsList = [];

            $http.get(apiUrl, { params: query }).then(function (response) {
                $scope.uploadsList = response.data.results;
                $scope.currentPage = response.data.current;
                $scope.perPage = response.data.options.perPage;
                $scope.totalPages = response.data.last;
                $scope.totalRecords = response.data.count;

            });


        }
        $scope.getUploads();

        $scope.processUpload = function(upload){
            console.log(upload);

        }
        $scope.removeUpload  = function(){

        }

    });