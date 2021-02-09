app.controller("RidersController", function ($scope, $http, $location, config,$localStorage) {
    $scope.form = {};
    $scope.error;
    $scope.isUpdating = false;

    $scope.getRiders = function(){
        $http({
            method: 'GET',
            url: config.apiUrl + "/riders",
            // pass in data as strings
            headers: {
                'Authorization':'Bearer ' + $localStorage.user.token,
                'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
        }).then(function mySuccess(response) {
            $scope.riders = response.data.data.riders
            $scope.length = $scope.riders.length;
            $scope.showRider = function (rider) {
                $location.path("riders/" + rider.id);
            };

        }, function (error) {
            var data = error.data;
            $scope.error = data.message;

        });
    }

    $scope.delete = function (rider, $index) {
        console.log(rider);
        var val = confirm("Are you sure you want to Delete this Rider?");
        if(val){
            $http.delete(config.newApiUrl + "users/riders/" + rider.id,{
                headers: {
                    Authorization: "Bearer " + $localStorage.user.token,
                    "Content-Type": "application/json",
                },
            }).then( function mySuccess(response) {
                    console.log(response);
                    $scope.rider.splice($index, 1);
                },
                function (error) {
                    var data = error.data;
                    $scope.error = data.message;
                });
        }
    }


    $scope.initUpdate = function (rider) {
        $scope.isUpdating = true;
        $scope.form = rider;
    }

    $scope.add = function () {
        $http({
            method: "POST",
            url: config.apiUrl + "/riders/onboarding",
            data: $scope.form,
            headers: {
                Authorization: "Bearer " + $localStorage.user.token,
                "Content-Type": "application/json",
            },
        }).then( function mySuccess(response) {
                console.log(response);
                $scope.error = null;
                if (response.data.status == "success"){
                    $scope.form = {};
                    $scope.rider.push(response.data.data.rider);
                }
                else{
                    var data = response.data;
                    $scope.error = data.message;
                }
            },
            function (error) {
                console.log(error);
                var data = error.data;
                $scope.error = data.message;
            });
    }

    $scope.update = function () {
        $http({
            method: "PUT",
            url: config.apiUrl + "/riders/"+$scope.form.id,
            data: $scope.form,
            headers: {
                Authorization: "Bearer " + $localStorage.user.token,
                "Content-Type": "applic" +
                    "ation/json",
            },
        }).then( function mySuccess(response) {
                console.log(response);
                if(response.data.status == "success"){
                    $scope.isUpdating = false;
                    $scope.form = {};
                    $scope.getRiders();
                }
                else{
                    var data = response.data;
                    $scope.error = data.message;
                }
            },
            function (error) {
                var data = error.data;
                $scope.error = data.message;
            });

    }
    $scope.getRiders();
});

app.controller("RiderController", function ( $scope, $http, $stateParams, config, $localStorage ) {
    $scope.error;
    $scope.id = $stateParams.id;
    $http({
        method: "GET",
        url: config.apiUrl + "/riders/" + $scope.id,
        // pass in data as strings
        headers: {
            Authorization: "Bearer " + $localStorage.user.token,
            "Content-Type": "application/json",
        }, // set the headers so angular passing info as form data (not request payload)
    }).then( function mySuccess(response) {
            console.log(response);
            $scope.rider = response.data.data.rider;
        },
        function (error) {
            var data = error.data;
            $scope.error = data.message;
        });
});
app.controller("RiderTripsController", function (
    $scope,
    $http,
    $stateParams,
    config,
    $localStorage
) {
    $scope.error;
    $scope.id = $stateParams.id
    $http({
        method: "GET",
        url: config.apiUrl + "/riders/" + $scope.id + "/trips",
        // pass in data as strings
        headers: {
            Authorization: "Bearer " + $localStorage.user.token,
            "Content-Type": "application/json",
        }, // set the headers so angular passing info as form data (not request payload)
    }).then(
        function mySuccess(response) {
            $scope.ridertrips = response.data.data;
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
                    default:
                        return null;
                }
            };
            $scope.length = $scope.ridertrips.length;
        },
        function (error) {
            var data = error.data;
            $scope.error = data.message;
        }
    );


});
