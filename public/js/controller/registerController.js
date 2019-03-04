app.controller("registerCtrl",function ($scope, authFactory, $location){
    $scope.msg = "Welcome to the register Page";

    let promise = authFactory.authCheck();
    promise.then(data =>{
        $location.path("/community");
    }, err => {
    });

    $scope.callRegister = function() {
        if ($scope.registerForm.email.$valid && $scope.email && $scope.password) {
            $scope.register();
        }else if(!$scope.registerForm.email.$valid){
            swal ( "Oops" ,  "Pls provide valid email " ,  "error" );            
        }
        else{
            swal ( "Oops" ,  "Pls provide email and password..." ,  "error" );
        }
    };

    $scope.register = () => {
        let promise = authFactory.register($scope.email, $scope.password);
        promise.then(data =>{
            $location.path("/community");
        }, err => {
            swal ( "Oops" ,  "Register unsuccessfull!Pls try again with different email and password...." ,  "error" )
        });
    };
});