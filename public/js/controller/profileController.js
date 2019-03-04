app.controller("profileCtrl", function ($scope, $location, $cookies, Upload, authFactory) {
    $scope.msg = "this is profile page";
    let promise = authFactory.authCheck();
    promise.then(data => {
    }).catch( err => {
        $location.path('/login')
    });
    
    $scope.callPost = function() {
        if ($scope.postform.myImage.$valid && $scope.myImage && $scope.title) {
            $scope.upload($scope.myImage);
        }else{
            swal ( "Oops" ,  "Pls Upload a file within 20mb size! And it must have title" ,  "error" );
        }
    };
    
    $scope.upload = function (img){
        Upload.upload({
            url: '/post',
            method: 'POST',
            data: {myImage: img, 'title': $scope.title, 'description': $scope.description, 'communityFlag': $scope.communityFlag},
            headers: {
                'x-auth': $cookies.get('token')
            }
        }).then(function (resp) {
            swal("Image Uplaoded!", "You clicked the button!", "success");
            console.log('Success ' + resp.config.data.myImage.name + 'uploaded. Response: ' + resp.data);
            // $scope.url = `http:/localhost:1234/${resp.data.path}`;
            $scope.url=resp.data.path;
        }, function (resp) {
            swal ( "Oops" ,  "Something went wrong during upload!Pls try again with file type jpeg,jpg,png,gif within 20mb file size..." ,  "error" );
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.myImage.name);
        });
    };



});