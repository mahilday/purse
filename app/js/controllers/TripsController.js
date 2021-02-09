app.controller("TotalTripsController", function (
    $scope,
    $http,
    config,
    $localStorage
) {
    $scope.error;
    $http({
        method: "GET",
        url: config.newApiUrl + "trips/count/",
        // pass in data as strings
        headers: {
            Authorization: "Bearer " + $localStorage.user.token,
            "Content-Type": "application/json",
        }, // set the headers so angular passing info as form data (not request payload)
    }).then(
        function mySuccess(response) {
            console.log(response)
            $scope.totalTrips = response.data.data;
            // $scope.length = $scope.drivertrips.length;
        },
        function (error) {
            var data = error.data;
            $scope.error = data.message;
        }
    );
});
app.controller("TripsController", function (
  $scope,
  $http,
  config,
  $localStorage
) {
  $scope.error;
  $http({
    method: "GET",
    url: config.newApiUrl + "trips/",
    // pass in data as strings
    headers: {
      Authorization: "Bearer " + $localStorage.user.token,
      "Content-Type": "application/json",
    }, // set the headers so angular passing info as form data (not request payload)
  }).then(
    function mySuccess(response) {
      $scope.trips = response.data.data.trips;
      $scope.changeBg = function (status) {
        switch (status) {
          case "accepted":
            return "bg-dark";
            break;
          case "transit":
            return "bg-primary";
            break;
          case "completed":
            return "bg-success";
            break;
          case "canceled":
            return "bg-danger";
            break;
          case "ended":
            return "bg-info";
            break;
          default:
            return null;
        }
      };
      $scope.length = $scope.trips.length;
    },
    function (error) {
      var data = error.data;
      $scope.error = data.message;
    }
  );
});
app.controller("TripsTimeController", function (
  $scope,
  $http,
  $stateParams,
  config,
  $localStorage
) {
  $scope.endDate = null
  $scope.startDate = null
  $scope.today= true;
  $scope.sevenDays = false;
  $scope.lastMonth = false;
   if ($scope.today === true) {
     $scope.endDate = new Date(new Date() - 86400000).toISOString();
     $scope.startDate = new Date().toISOString();
      console.log($scope.endDate);
   } else {
     return null;
   }
  
  $scope.changeToday= function(){
    $scope.today= true;
    $scope.sevenDays = false;
    $scope.lastMonth = false;
    if ($scope.today === true) {
      $scope.endDate = new Date(new Date() - 86400000).toISOString();
      $scope.startDate = new Date().toISOString();
    } else {
      return null;
    }
    console.log($scope.endDate);
  }
  $scope.changeLastWeek = function () {
    $scope.today = false;
    $scope.sevenDays = true;
    $scope.lastMonth = false;
    console.log($scope.sevenDays);
     if ($scope.sevenDays === true) {
       $scope.endDate = new Date(new Date() - 604800000).toISOString();
       $scope.startDate = new Date().toISOString();
     } else {
       console.log("error");
     }
     console.log($scope.endDate);
  };
  $scope.changeLastMonth = function () {
    $scope.today = false;
    $scope.sevenDays = false;
    $scope.lastMonth = true;
    console.log($scope.lastMonth);
    if ($scope.lastMonth === true) {
      $scope.endDate = new Date(new Date() - 2592000000).toISOString();
      $scope.startDate = new Date().toISOString();
    } else {
      return null;
    }
  };
  console.log($scope.today)
  $scope.error;
  
  $http({
    method: "GET",
    url: config.newApiUrl + "trips?startDate=" +$scope.startDate+"&endDate="+ $scope.endDate ,
    // pass in data as strings
    headers: {
      Authorization: "Bearer " + $localStorage.user.token,
      "Content-Type": "application/json",
    }, // set the headers so angular passing info as form data (not request payload)
  }).then(
    function mySuccess(response) {
      $scope.tripstime = response.data.data.trips;
      $scope.changeBg = function (status) {
        switch (status) {
          case "accepted":
            return "bg-dark";
            break;
          case "transit":
            return "bg-primary";
            break;
          case "completed":
            return "bg-success";
            break;
          case "canceled":
            return "bg-danger";
            break;
          case "ended":
            return "bg-info";
            break;
          default:
            return null;
        }
      };
      $scope.length = $scope.tripstime.length;
    },
    function (error) {
      var data = error.data;
      $scope.error = data.message;
    }
  );
});

