app.controller(
  "HistoryController",
  function ($scope, $http, $state, config, AuthService, $localStorage) {
    $scope.form = {};
    $scope.currentUser;

    $scope.currentUser = $localStorage.user;
  }
);
