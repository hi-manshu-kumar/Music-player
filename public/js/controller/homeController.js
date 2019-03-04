app.controller("homeCtrl", function($scope, $location, authFactory) {
    let promise = authFactory.authCheck();
    promise.then(data =>{
        $location.path("/community");
    }, err => {
    });
});