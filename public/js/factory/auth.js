app.factory("authFactory", function($http, $cookies, $q){
    const object = {
        login (email, password) {
            let defered = $q.defer();

            $http.post('user/login', {
                "email": email,
                "password": password
            }).then(data => {
                if(data.status === 200){
                    let xAuth = data.headers()['x-auth'];
                    let expireDate = new Date();
                    expireDate.setDate(expireDate.getDate() + 1);       //1day cookie
                    $cookies.put('token', xAuth, {'expires': expireDate, 'samesite': 'lax'});

                    defered.resolve(data);
                } else {
                    defered.reject(data);
                }
            }, err => {
                defered.reject(err);
            });

            return defered.promise;
        },

        register (email, password) {
            let defered = $q.defer();
            $http.post('user/', {
                "email": email,
                "password": password
            }).then(data => {
                if(data.status === 200 ){
                    let xAuth = data.headers()['x-auth'];
                    let expireDate = new Date();
                    expireDate.setDate(expireDate.getDate() + 1);       //1day cookie
                    $cookies.put('token', xAuth, {'expires': expireDate, 'samesite': 'lax'});

                    defered.resolve(data);
                }else {
                  defered.reject(data);
                }
            }, err => {
                defered.reject(err);
            });

            return defered.promise;
        },

        logout () {
            let defered = $q.defer();
            $http.delete('user/me/token',{
                headers: {
                    'x-auth': $cookies.get('token')
                }
            }).then(data => {
                if( data.status === 200){
                    defered.resolve(data);
                } else{
                    defered.reject(data);
                }
            }, err => {
                defered.reject(err);
            });
            
            return defered.promise;
        },

        authCheck() {
            let defered = $q.defer();
            $http.get('user/me',{
                headers: {
                    'x-auth': $cookies.get('token')
                }
            }).then(data => {
                if(data.status === 200) {
                    defered.resolve(data);
                } else {
                    defered.reject(data);
                }
            }, err => {
                defered.reject(err);
            });
            
            return defered.promise;
        },

        addPost(img, title, description) {
            let defered = $q.defer();
            $http.post('/post',{
                    "myImage": img,
                    "title": title,
                    "description":  description},{
                headers: {
                    'x-auth': $cookies.get('token'),
                    enctype:'multipart/form-data'
                }
            }).then(data => {
                if(data.status === 200) {
                    defered.resolve(data);
                } else {
                    defered.reject(data);
                }
            }, err => {
                defered.reject(err);
            });
            
            return defered.promise;
        },

        getPost() {
            let defered = $q.defer();
            $http.get('/post',{
                headers: {
                    'x-auth': $cookies.get('token'),
                }
            }).then(data => {
                if(data.status === 200) {
                    defered.resolve(data);
                } else {
                    defered.reject(data);
                }
            }, err => {
                defered.reject(err);
            });
            
            return defered.promise;
        }
    }

    return object;
})