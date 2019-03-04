app.run(["$location", "authFactory", function($location, authFactory) {
    let promise = authFactory.authCheck();
    promise.then(data =>{
        $location.path("/community");
    }, err => {
        // document.querySelector('header').style.display=  none;
    });
}])