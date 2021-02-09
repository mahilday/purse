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
    template: `<div class="menu-mobile menu-activated-on-click color-scheme-dark">
                <div class="mm-logo-buttons-w">
                    <a class="mm-logo" href="index-2.html">
                    <img src="https://sirbanks.co/wp-content/uploads/2019/05/sirbanks-edited-new-111-1.png" width="110px" class="center mb-4 mt-5">
                    </a>
                    <div class="mm-buttons">
                        <div class="content-panel-open">
                            <div class="os-icon os-icon-grid-circles"></div>
                        </div>
                        <div class="mobile-menu-trigger">
                            <div class="os-icon os-icon-hamburger-menu-1"></div>
                        </div>
                    </div>
                </div>
                <div class="menu-and-user">
                    <ul class="main-menu">
                    <li class="sub-header"><span>Dashboard</span></li>
                    <li class="selected ">
                        <a href="#!dashboard">
                            <div class="icon-w">
                                <div class="os-icon os-icon-layout"></div>
                            </div><span>Dashboard</span>
                        </a>
                    </li>
                    <li class=" ">
                        <a href="#!riders">
                            <div class="icon-w">
                                <div class="picons-thin-icon-thin-0719_group_users_circle"></div>
                            </div><span>Riders</span>
                        </a>
                    </li>
                    <li class=" ">
                        <a href="#!drivers">
                            <div class="icon-w">
                                <div class="picons-thin-icon-thin-0468_car_transport_vehicle"></div>
                            </div><span>Drivers</span>
                        </a>
                    </li>
                    <li class=" ">
                        <a href="#!trips">
                            <div class="icon-w">
                                <div class="picons-thin-icon-thin-0545_map_travel_distance_directions"></div>
                            </div><span>Trips</span>
                        </a>
                    </li>
                    <li class="selected">
                        <a href="#!admins">
                            <div class="icon-w">
                                <div class="picons-thin-icon-thin-0141_rotate_back_revert_undo"></div>
                            </div><span>Admins</span>
                        </a>
                    </li>
                    <li class="selected ">
                        <a href="#" ng-click="logOut()">
                            <div class="icon-w">
                                <div class="picons-thin-icon-thin-0141_rotate_back_revert_undo"></div>
                            </div><span>Log out</span>
                        </a>
                    </li>

                    </ul>

                </div>
            </div>
            <!-------------------- END - Mobile Menu -------------------->
     <!-------------------- START - Main Menu -------------------->
            <div
                class="menu-w color-scheme-light color-style-transparent menu-position-side menu-side-left menu-layout-compact sub-menu-style-over sub-menu-color-bright selected-menu-color-light menu-activated-on-hover menu-has-selected-link">
                <div class="logo-w">
                    <a class="logo" href="#/!">
                        <img src="https://sirbanks.co/wp-content/uploads/2019/05/sirbanks-edited-new-111-1.png" width="200px" class="center mb-4 mt-5">
                    </a>
                </div>
                <ul class="main-menu">
                    <li class="sub-header"><span>Dashboard</span></li>
                    <li class="selected ">
                        <a href="#!dashboard">
                            <div class="icon-w">
                                <div class="os-icon os-icon-layout"></div>
                            </div><span>Dashboard</span>
                        </a>
                    </li>
                    <li class=" ">
                        <a href="#!riders">
                            <div class="icon-w">
                                <div class="picons-thin-icon-thin-0719_group_users_circle"></div>
                            </div><span>Riders</span>
                        </a>
                    </li>
                    <li class=" ">
                        <a href="#!drivers">
                            <div class="icon-w">
                                <div class="picons-thin-icon-thin-0468_car_transport_vehicle"></div>
                            </div><span>Drivers</span>
                        </a>
                    </li>
                    <li class=" ">
                        <a href="#!trips">
                            <div class="icon-w">
                                <div class="picons-thin-icon-thin-0545_map_travel_distance_directions"></div>
                            </div><span>Trips</span>
                        </a>
                    </li>
                    <li class="selected">
                        <a href="#!admins">
                            <div class="icon-w">
                                <div class="picons-thin-icon-thin-0141_rotate_back_revert_undo"></div>
                            </div><span>Admins</span>
                        </a>
                    </li>
                    <li class="selected ">
                        <a href="#" ng-click="logOut()">
                            <div class="icon-w">
                                <div class="picons-thin-icon-thin-0141_rotate_back_revert_undo"></div>
                            </div><span>Log out</span>
                        </a>
                    </li>
                </ul>
            
            </div>`
  };
});
