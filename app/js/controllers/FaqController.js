app.controller(
  "FaqController",
  function ($scope, $http, $location, config, $localStorage) {
      $scope.faqArray;
    $scope.getFaq = function () {
      $http({
        method: "GET",
        url: config.apiUrl + "/faq",
      })
        .then((res) => {
          console.log(res);
          this.faqArray = res.data.faqs;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    $scope.getFaq();
  }
);
