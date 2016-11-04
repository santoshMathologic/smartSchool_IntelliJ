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
            "/api/v1/trains",  // Url call that will be made all the time
            $http,			// This is our Call Processing Service currently only $http is supported and used here.
            function(beforeProcessingResponse){					// Before processing this is called
                $scope.isLoading = true;
            },
            function(resultObj){			// After processing this is called
                $scope.trainsList = resultObj.results;
                $scope.currentPage = resultObj.current;
                $scope.perPage = resultObj.options.perPage;
                $scope.totalPages = resultObj.last;
                $scope.totalRecords = resultObj.count;
                $scope.isLoading = false;
            }
        );







    });