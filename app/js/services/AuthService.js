app.service('AuthService', function ($state, $localStorage) {
    this.isLoggedIn = function () {
        if($localStorage.user != null || $localStorage.user != undefined)
            return true;

        return false;
    }

    this.storeUser = function (data) {
        $localStorage.user = data;
        console.log($localStorage.user);
    }
    this.logOut = function () {
        $localStorage.$reset();
        $state.transitionTo("login");
    }
});


app.run(function ($rootScope, $state, $transitions, $timeout, $location, AuthService) {
    $transitions.onStart({}, function($transition){
        //Check if the Page requires Authentication and the user is NOT Logged in
        if($transition.to().authenticate && !AuthService.isLoggedIn()){
            $state.transitionTo("login");
        }
        //Check if the user is logged in but trying to open the login screen
        else if($transition.to().name == "login" && AuthService.isLoggedIn()){
            $timeout(function() {
                $state.go('dashboard', null, {'reload':true});
            });
        }
    });

    // $rootScope.$on('$stateChangeStart', function (event, next, current) {
    //     alert();
    //     // if route requires auth and user is not logged in

    // });
});