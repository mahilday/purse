// app.js
app.config(function ($stateProvider, $urlRouterProvider, $httpProvider){
    var states = [
      {
        name: "login",
        url: "/login",
        controller: "AuthController",
        templateUrl: "templates/login.html",
      },

      {
        name: "register",
        url: "/register",
        controller: "AuthController",
        templateUrl: "templates/register.html",
      },

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
        name: "wallet",
        url: "/wallet",
        templateUrl: "templates/add-bank.html",
        controller: "WalletController",
        authenticate: true,
      },
      {
        name: "history",
        url: "/history",
        templateUrl: "templates/history.html",
        controller: "HistoryController",
        authenticate: true,
      },
      {
        name: "settings",
        url: "/settings",
        templateUrl: "templates/settings.html",
        authenticate: true,
      },
      {
        name: "add",
        url: "/add",
        templateUrl: "add.html",
        authenticate: true,
      },
      {
        name: "addFunds",
        url: "/add-funds",
        templateUrl: "add-funds.html",
        authenticate: true,
      },
      {
        name: "exchange",
        url: "/exchange",
        templateUrl: "exchange.html",
        authenticate: true,
      },
      {
        name: "banks",
        url: "/banks",
        templateUrl: "templates/banks.html",
        controller: "BanksController",
        authenticate: true,
      },

      {
        name: "add-bank",
        url: "/bank",
        templateUrl: "templates/add-bank.html",
        controller: "drivers/BanksController",
        authenticate: true,
      },

      {
        name: "profile",
        url: "/profile",
        controller: "ProfileController",
        templateUrl: "templates/profile.html",
      },

      {
        name: "editProfile",
        url: "/edit-profile",
        controller: "ProfileController",
        templateUrl: "templates/edit-profile.html",
      }
    ];
    states.forEach((state) => $stateProvider.state(state));
    $urlRouterProvider.otherwise('/');
});
