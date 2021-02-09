// app.js
app.config(function ($stateProvider, $urlRouterProvider, $httpProvider){
    var states = [
      {
        name: "main",
        url: "/",
        templateUrl: "templates/dashboard.html",
        authenticate: true,
      },
      {
        name: "dashboard",
        url: "/dashboard",
        templateUrl: "templates/dashboard.html",
        authenticate: true,
      },
      {
        name: "login",
        url: "/login",
        controller: "AuthController",
        templateUrl: "templates/login.html",
      },
      {
        name: "trips",
        url: "/trips",
        authenticate: true,
        templateUrl: "trips.html",
        controller: "TripsController"
      },
      {
        name: "drivers",
        url: "/drivers",
        controller: "DriversController",
        templateUrl: "templates/drivers.html",
        authenticate: true,
      },
      {
        name: "account",
        url: "/account",
        templateUrl: "templates/account.html",
        authenticate: true,
      },
      {
        name: "business",
        url: "/business",
        templateUrl: "templates/business.html",
        authenticate: true,
      },
      {
        name: "driver",
        url: "/drivers/:id",
        controller: "DriverController",
        templateUrl: "templates/driver.html",
        authenticate: true,
      },
      {
        name: "map",
        url: "/admin/admin/map",
        templateUrl: "templates/map.html",
        authenticate: true,
      },
      {
        name: "rider",
        url: "/admin/riders/:id",
        templateUrl: "templates/account.html",
        controller: "RiderController",
        authenticate: true,
      },
      {
        name: "riders",
        url: "/riders",
        templateUrl: "templates/users.html",
        controller: "RidersController",
        authenticate: true,
      },
      {
        name: "profile",
        url: "/profile",
        templateUrl: "templates/profile.html",
        authenticate: true,
      },
      {
        name: "trips2",
        url: "/trips2",
        templateUrl: "trips2.html",
        authenticate: true,
      },
      {
        name: "profile2",
        url: "/profile2",
        templateUrl: "profile2.html",
        authenticate: true,
      },
      {
        name: "users2",
        url: "/users2",
        templateUrl: "users2.html",
        authenticate: true,
      },
      {
        name: "admins",
        url: "/admins",
        templateUrl: "templates/admins.html",
        controller: "AdminsController",
        authenticate: true,
      },

        // Drivers Routes
      {
        name: "d-login",
        url: "/driver/login",
        controller: "drivers/AuthController",
        templateUrl: "templates/drivers/login.html",
      },
      {
        name: "d-upload",
        url: "/driver/upload",
        controller: "drivers/AuthController",
        templateUrl: "templates/login.html",
      },
    ];
    states.forEach((state) => $stateProvider.state(state));
    $urlRouterProvider.otherwise('/');
});
