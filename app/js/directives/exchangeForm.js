app.directive("exchangeForm", function (AuthService) {
  return {
    link: function($scope,$state, element, attrs) {
      $scope.logOut = function() {
        var logout = confirm("Are you sure?");
        if(logout){
          AuthService.logOut();
        }
      }
    },
    templateUrl: 'templates/includes/exchange-form.html'
  };
});
