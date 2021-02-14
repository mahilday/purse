app.controller(
  "AdminsController",
  function ($scope, $http, $location, config, $localStorage) {
    $scope.form = {};
    $scope.error = "";
    $scope.isUpdating = false;
    $scope.isUploading = true;

    $scope.getAdmins = function () {
      $http({
        method: "GET",
        url: config.apiUrl + "/",
        // pass in data as strings
        headers: {
          Authorization: "Bearer " + $localStorage.user.token,
          "Content-Type": "application/json",
        }, // set the headers so angular passing info as form data (not request payload)
      }).then(
        function mySuccess(response) {
          $scope.admins = response.data.data;
          // $scope.length = $scope.admins.length;
        },
        function (error) {
          var data = error.data;
          $scope.error = data.message;
        }
      );
    };

    $scope.add = function () {
      console.log($scope.form);
      $http({
        method: "POST",
        url: config.apiUrl + "/onboarding",
        data: $scope.form,
        headers: {
          Authorization: "Bearer " + $localStorage.user.token,
          "Content-Type": "application/json",
        },
      }).then(
        function mySuccess(response) {
          console.log(response);
          $scope.error = null;
          if (response.data.status == "success") {
            $scope.form = {};
            $scope.getAdmins();
          } else {
            var data = response.data;
            $scope.error = data.message;
          }
        },
        function (error) {
          console.log(error);
          var data = error.data;
          $scope.error = data.message;
        }
      );
    };

    $scope.delete = function (item) {
      var val = confirm("Are you sure you want to Delete this Admin?");
      if (val) {
        $http
          .delete(config.newApiUrl + "/" + item.id, {
            headers: {
              Authorization: "Bearer " + $localStorage.user.token,
              "Content-Type": "application/json",
            },
          })
          .then(
            function mySuccess(response) {
              console.log(response);
              $scope.getDrivers();
            },
            function (error) {
              var data = error.data;
              $scope.error = data.message;
            }
          );
      }
    };
    $scope.initUpdate = function (item) {
      $scope.isUpdating = true;
      $scope.form = item;
    };

    $scope.update = function () {
      $http({
        method: "PUT",
        url: config.apiUrl + "/" + $scope.form.id,
        data: $scope.form,
        headers: {
          Authorization: "Bearer " + $localStorage.user.token,
          "Content-Type": "applic" + "ation/json",
        },
      }).then(
        function mySuccess(response) {
          console.log(response);
          if (response.data.status == "success") {
            $scope.isUpdating = false;
            $scope.form = {};
            $scope.getAdmins();
          } else {
            var data = response.data;
            $scope.error = data.message;
          }
        },
        function (error) {
          var data = error.data;
          $scope.error = data.message;
        }
      );
    };

    $scope.handleFileChanged = function (event) {
      var n = event.target.getAttribute("name");
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // console.log(reader.result);
        $scope.form[n] = reader.result;
        console.log($scope.form);
      };
    };

    $scope.getAdmins();
  }
);

// new controllers


