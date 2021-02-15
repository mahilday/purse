app.controller("WalletController", function (
    $scope,
    $http,
    $state,
    config,
    $localStorage
) {

    $scope.currentUser = $localStorage.user;
  // $http({
  //   method: "PATCH",
  //   url: config.apiUrl + "/upload_avatar",
  //   data: $scope.userimage,
  //   headers: {
  //     Authorization: "Bearer " + $localStorage.user.token,
  //     "Content-Type": "application/json",
  //   }, // set the headers so angular passing info as form data (not request payload)
  // }).then(
  //     function mySuccess(response) {
  //       console.log(response)
  //     },
  //     function (error) {
  //       var data = error.data;
  //       $scope.error = data.message;
  //     });


});
