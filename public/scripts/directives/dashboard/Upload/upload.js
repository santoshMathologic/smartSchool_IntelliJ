angular.module('sbAdminApp').directive('upload', ['$compile','toaster', function ($compiler,toaster) {
    return {
        restrict: 'E',
        templateUrl: 'views/dashboard/upload.tmpl.html',
        controller: function ($scope,$http,Upload,toaster) {
            $scope.files = [];
            $scope.message ="file Upload Successfully";
            $scope.uploader={};
            $scope.$on('flow::fileSuccess', function (event, $flow, $file, $message) {
                 console.log($message);
            })

            $scope.upload = function(id) {
                $scope.uploader.flow.opts.testChunks=false;
                $scope.uploader.flow.opts.target='/upload';
                $scope.uploader.flow.upload();
            };
            $scope.processUpload = function(e){
                console.log(e)
            }
            $scope.removeFile = function(fileArray,file){
                console.log(fileArray,file);
                fileArray.files.splice(fileArray.files.indexOf(file),1); //The splice function used to delete the seleced Users from an Array based on Index
                toaster
                    .pop({
                        type: 'success',
                        title: 'TrainType saved Succcessfully',
                        body: 'TrainType saved Succcessfully.'
                    });
            }

        }

    }
}]);