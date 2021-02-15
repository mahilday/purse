app.controller(
  "AuthController",
  function ($scope, $http, $state, config, AuthService, $localStorage) {
    $scope.form = {};
    $scope.error;

    $scope.login = function () {
      $http({
        method: "POST",
        url: config.apiUrl + "/auth/login",
        data: $scope.form, // pass in data as strings
        // headers : { 'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
      }).then(
        function mySuccess(response) {
          console.log(response);
          $scope.error = null;
          var data = response.data;
          AuthService.storeUser(data);
          $state.transitionTo("dashboard");
        },
        function (error) {
          console.log(error);
          var data = error.data;
          $scope.error = data.errors[0].msg;
        }
      );
    };

    $scope.register = function () {
      $http({
        method: "POST",
        url: config.apiUrl + "/register",
        data: $scope.form, // pass in data as strings
        headers: { "Access-Control-Allow-Origin": "*" }, // set the headers so angular passing info as form data (not request payload)
      }).then(
        function mySuccess(response) {
          console.log(response);
          $scope.error = null;
          var data = response.data;
          AuthService.storeUser(data);
          $state.transitionTo("dashboard");
        },
        function (error) {
          console.log(error);
          var data = error.data;
          $scope.error = data.errors[0].msg;
        }
      );
    };
  }
);

app.controller(
  "getDataAdmin",
  function (
    $scope,
    $http,
    $state,
    $location,
    config,
    AuthService,
    $localStorage
  ) {
    $scope.error;
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
    $scope.user = $localStorage.user;
    $scope.reloadRoute = function () {
      //   location.href("#!/dashboard")
    };
    console.log($scope.user);
  }
);
