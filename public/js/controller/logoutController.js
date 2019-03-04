app.controller("logoutCtrl",function($scope, authFactory, $location){
    $scope.pagetitle = "Logout Page";

    let promise = authFactory.authCheck();
    promise.then(data =>{
    }, err => {
        $location.path("/login");
    });
    
    $scope.callLogout = () => {
        let promise = authFactory.logout($scope.email, $scope.password);
        promise.then(data => {
            $location.path("/login");
        }, err => {
            swal ( "Oops" ,  "Something went wrong during logout!Pls try again..." ,  "error" )
        });
    };
});