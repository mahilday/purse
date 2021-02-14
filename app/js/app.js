var app = angular.module("app", ["ui.router", "ngStorage"]);

app.constant("config", {
  appName: "Ezo Purge",
  appVersion: 1.0,
  apiUrl: "https://onos-btc.herokuapp.com/api",
});

app.factory("testInterceptor", testInterceptor);
app.config(function ($httpProvider) {
  $httpProvider.interceptors.push("testInterceptor");
});

function testInterceptor($q, $rootScope) {
  return {
    request: function (config) {
      $rootScope.isLoading = true;
      // alert("Loading")
      return config;
    },

    requestError: function (config) {
      $rootScope.isLoading = false;
      return $q.reject(config);
    },

    response: function (res) {
      $rootScope.isLoading = false;
      return res;
    },

    responseError: function (res) {
      $rootScope.isLoading = false;
      return $q.reject(res);
    },
  };
}
