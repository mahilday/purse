app.directive("navTest", function (AuthService) {
  return {
    link: function($scope,$state, element, attrs) {
      $scope.logOut = function() {
        var logout = confirm("Are you sure?");
        if(logout){
          AuthService.logOut();
        }
      }
    },
    template: `<div class="sidebar">
    <div class="menu">
        <ul>
            <li>
                <a href="dashboard.html" data-toggle="tooltip" data-placement="right" title="Home">
                    <span><i class="la la-igloo"></i></span>
                </a>
            </li>
            <li>
                <a href="buy-sell.html" data-toggle="tooltip" data-placement="right" title="Exchange">
                    <span><i class="la la-exchange"></i></span>
                </a>
            </li>
            <li>
                <a href="accounts.html" data-toggle="tooltip" data-placement="right" title="Account">
                    <span><i class="la la-user"></i></span>
                </a>
            </li>
            <li>
                <a href="accounts.html" data-toggle="tooltip" data-placement="right" title="Wallets">
                    <span><i class="la la-wallet"></i></span>
                </a>
            </li>
            <li>
                <a href="settings.html" data-toggle="tooltip" data-placement="right" title="Setting">
                    <span><i class="la la-tools"></i></span>
                </a>
            </li>
        </ul>
    </div>
</div>`
  };
});
