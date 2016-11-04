/**
 * Created by SANTOSH on 11/3/2016.
 */
/**
 * Created by SANTOSH on 11/2/2016.
 */
'use strict';

angular.module('smartAdminApp')
    .controller('trainCtrl', function($scope,$http) {

        $scope.isLoading = true;
        $scope.trainsList = [];
        var apiUrl = "/api/v1/trains"
        var query = {
            limit: 10,
            page: 1,
            sortBy: "trainName"

        }

        $scope.trainTypes =[
            {name: 'SUVD'},
            {name: 'SUF'},
            {name: 'SUB'},
            {name: 'SHT'},
            {name: 'RAJ'},
            {name: 'PRUM'},
            {name: 'PAS'},
            {name: 'MEX'},
            {name: 'MEMU'},
            {name: 'JSH'},
            {name: 'HSP'},
            {name: 'GBR'},
            {name: 'EMU'},
            {name: 'DRNT'},
            {name: 'DMU'}

        ]

        $scope.serverFetch = new ServerTableFetch(
            "/api/crewTypes/search/findByNameContains",  // Url call that will be made all the time
            $http,			// This is our Call Processing Service currently only SringDataRestApi is supported and used here.
            function(){					// Before processing this is called
                $scope.isLoading = true;
            },
            function(resultObj){			// After processing this is called
                $scope.crewTypes = resultObj;
                $scope.isLoading = false;
            }
        );

        $scope.getTrainList = function(){
            $http.get(apiUrl, { params: query }).then(function (response) {
                $scope.trainsList = response.data.results;
                $scope.currentPage = response.data.current;
                $scope.perPage = response.data.options.perPage;
                $scope.totalPages = response.data.last;
                $scope.totalRecords = response.data.count;
                $scope.isLoading = false;

            });


        }
        $scope.getTrainList();





    });