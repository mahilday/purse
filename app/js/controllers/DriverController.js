
app.controller("DriversController", function ($scope, $http, $location, config,$localStorage) {

    $scope.form = {};
    $scope.make = {};
    $scope.error = "";
    $scope.updateForm = {};
    $scope.vehicleModels = {};
    $scope.isUpdating = false;
    $scope.isUploading = false;
    $scope.isUpdatingVehicleDetails = false;

    $scope.getDrivers = function(){
        $http({
            method: 'GET',
            url: config.apiUrl + "/drivers",
            // pass in data as strings
            headers: {
                'Authorization':'Bearer ' + $localStorage.user.token,
                'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
        }).then(function mySuccess(response) {
            $scope.drivers = response.data.data.drivers
            $scope.length = $scope.drivers.length;
            $scope.showDriver = function(driver){
                $location.path("drivers/" + driver.id);
            }

        }, function (error) {
            var data = error.data;
            $scope.error = data.message;

        });
    }

    $scope.getModels = function(make){
        var makeid = $scope.make[make.target.selectedIndex].id;
        $scope.form.make = $scope.make[make.target.selectedIndex].id;
        $http({
            method: 'GET',
            url: config.newApiUrl + "makes/"+makeid+"/models",
            // pass in data as strings
            headers: {
                'Authorization':'Bearer ' + $localStorage.user.token,
                'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
        }).then(function mySuccess(response) {
            console.log(response);
            $scope.vehicleModels = response.data.data.models;
        }, function (error) {
            var data = error.data;
            $scope.error = data.message;

        });
    }

    $scope.addBasicDetails = function () {

        $http({
            method: "POST",
            url: config.apiUrl + "/drivers/onboarding",
            data: $scope.form,
            headers: {
                Authorization: "Bearer " + $localStorage.user.token,
                "Content-Type": "application/json",
            },
        }).then( function mySuccess(response) {
                console.log(response);
                $scope.error = null;
                if (response.data.status == "success"){
                    $scope.form.reference = response.data.data.driver.reference;
                    $scope.isUpdatingVehicleDetails = true;
                    $scope.updateState();
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

    $scope.addVehicleDetails = function () {
        console.log($scope.form)
        //$scope.form.make = $scope.form.make.name;
        $scope.form.model = $scope.form.model.name;
        $http({
            method: "PUT",
            url: config.apiUrl + "/drivers/"+$scope.form.reference+"/onboarding/vehicle_details",
            data: $scope.form,
            headers: {
                Authorization: "Bearer " + $localStorage.user.token,
                "Content-Type": "application/json",
            },
        }).then( function mySuccess(response) {
                console.log(response);
                $scope.error = null;
                if (response.data.status == "success"){
                    $scope.form.reference = response.data.data.reference;
                    $scope.isUploading = true;
                    $scope.isUpdatingVehicleDetails = false;
                    $scope.updateState();
                }
                else{
                    var data = response.data;
                    $scope.error = data.message;
                }

            },
            function (error) {
                console.log(error);
                //the vehicle details have already been updated
                if(error.data.message == "Already updated vehicle details"){
                    $scope.isUploading = true;
                    $scope.isUpdatingVehicleDetails = false;
                    $scope.updateState();
                }
                else {
                    var data = error.data;
                    $scope.error = data.message;
                }
            });
    }

    $scope.addDocuments = function () {
        // var u = "https://gentle-hollows-68563.herokuapp.com/api/v1/admin/drivers/\"RF-f52418ee-c00a-4fa8-8c31-b56130ec7438/onboarding/complete";
        var fd = new FormData();
        fd.append('avatar', $scope.form.avatar);
        fd.append('licence', $scope.form.licence);
        fd.append('insurance', $scope.form.insurance);
        fd.append('vehiclePaper', $scope.form.vehiclePaper);
        console.log(fd);
        $http({
            method: "PUT",
            url: config.apiUrl + "/drivers/"+$scope.form.reference+"/onboarding/complete",
            // url: u,
            data: fd,
            headers: {
                Authorization: "Bearer " + $localStorage.user.token,
                "Content-Type": undefined,
            },
        }).then( function mySuccess(response) {
                console.log(response);
                $scope.error = null;
                if (response.data.status == "success"){
                    $scope.form = {};
                    $scope.isUploading = false;
                    $scope.getDrivers();
                    $scope.updateState();
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

    $scope.delete = function (item) {
        var val = confirm("Are you sure you want to Delete this Driver?");
        if(val){
            $http.delete(config.newApiUrl + "users/drivers/" + item.id,{
                headers: {
                    Authorization: "Bearer " + $localStorage.user.token,
                    "Content-Type": "application/json",
                },
            }).then( function mySuccess(response) {
                    console.log(response);
                    $scope.getDrivers()
                },
                function (error) {
                    var data = error.data;
                    $scope.error = data.message;
                });
        }
    }



    $scope.updateState = function(){
        $localStorage.form = $scope.form;
        $localStorage.isUpdating = $scope.isUpdating;
        $localStorage.isUploading = $scope.isUploading;
        $localStorage.isUpdatingVehicleDetails = $scope.isUpdatingVehicleDetails;
    }

    $scope.resetState = function(){
        $localStorage.form = $scope.form;
        $localStorage.isUpdating = false;
        $localStorage.isUploading = false;
        $localStorage.isUpdatingVehicleDetails = false;
        $scope.updateState();
    }

    $scope.restoreState = function(){
        $scope.form.reference = $localStorage.form.reference;
        $scope.isUpdating = $localStorage.isUpdating;
        $scope.isUploading = $localStorage.isUploading;
        $scope.isUpdatingVehicleDetails = $localStorage.isUpdatingVehicleDetails;
        console.log($scope)
    }

    $scope.getVehicleMake = function(){
        $http({
            method: "GET",
            url: config.newApiUrl + "makes/",
            headers: {
                Authorization: "Bearer " + $localStorage.user.token,
                "Content-Type": "application/json",
            }
        }).then(
            function mySuccess(response) {
                console.log(response);
                $scope.make = response.data.data
            },
            function (error) {
                var data = error.data;
                $scope.error = data.message;
            });
    }

    $scope.initUpdate = function (driver) {
        $http({
            method: "GET",
            url: config.apiUrl + "/drivers/" + driver.id,
            // pass in data as strings
            headers: {
                Authorization: "Bearer " + $localStorage.user.token,
                "Content-Type": "application/json",
            } // set the headers so angular passing info as form data (not request payload)
        }).then(
            function mySuccess(response) {
                $scope.updateForm = response.data.data.driver;
                $scope.updateForm.make = response.data.data.driver.vehicleDetails.make;
                $scope.updateForm.year = response.data.data.driver.vehicleDetails.year;
                $scope.updateForm.model = response.data.data.driver.vehicleDetails.model;
                $scope.updateForm.color = response.data.data.driver.vehicleDetails.color;
                $scope.updateForm.numberPlate = response.data.data.driver.vehicleDetails.numberPlate;
                $scope.updateForm.licenceNo = response.data.data.driver.vehicleDetails.licenceDetails.licenceNo;
                $scope.updateForm.issueDate = response.data.data.driver.vehicleDetails.licenceDetails.issueDate;
                $scope.updateForm.expDate = response.data.data.driver.vehicleDetails.licenceDetails.expDate;
                console.log($scope.updateForm);

                $scope.isUpdating = true;
            },
            function (error) {
                var data = error.data;
                $scope.error = data.message;
            });
    }

    $scope.sendUpdateRequest = function () {
        console.log($scope.updateForm);
        //$scope.updateForm.make = $scope.updateForm.make.name;
        $http({
            method: "PUT",
            url: config.apiUrl + "/drivers/"+$scope.updateForm.id,
            data: $scope.updateForm,
            headers: {
                Authorization: "Bearer " + $localStorage.user.token,
                "Content-Type": "application/json",
            },
        }).then( function mySuccess(response) {
                console.log(response);
                if(response.data.status == "success"){
                    $scope.isUpdating = false;
                    $scope.updateForm = {};
                    $scope.getDrivers();
                }
            },
            function (error) {
                var data = error.data;
                $scope.error = data.message;
            });

    }



    $scope.handleFileChanged = function(event) {
        var n = event.target.getAttribute("name");
        const file = event.target.files[0];
        $scope.form[n] = file;
        console.log($scope.form);
    }

    $scope.getDrivers();
    //$scope.resetState();
    $scope.restoreState();//restore Previous Adding driver state
    $scope.getVehicleMake();
});

// app.controller("DriverController", function (
//     $scope,
//     $http,
//     $stateParams,
//     config,
//     $localStorage ) {
//
//     $scope.error;
//     $scope.id = $stateParams.id
//     $http({
//         method: "GET",
//         url: config.apiUrl + "/drivers/" + $scope.id,
//         // pass in data as strings
//         headers: {
//             Authorization: "Bearer " + $localStorage.user.token,
//             "Content-Type": "application/json",
//         } // set the headers so angular passing info as form data (not request payload)
//     }).then(
//         function mySuccess(response) {
//             console.log(response);
//             $scope.driver = response.data.data.driver
//         },
//         function (error) {
//             var data = error.data;
//             $scope.error = data.message;
//         }
//     );
// });


app.controller("DriverTripsController", function (
    $scope,
    $http,
    $stateParams,
    config,
    $localStorage) {

    $scope.error;
    $scope.id = $stateParams.id;
    $http({
        method: "GET",
        url: config.apiUrl + "/drivers/" + $scope.id + "/trips",
        // pass in data as strings
        headers: {
            Authorization: "Bearer " + $localStorage.user.token,
            "Content-Type": "application/json",
        }, // set the headers so angular passing info as form data (not request payload)
    }).then(
        function mySuccess(response) {
            $scope.drivertrips = response.data.data;
            $scope.changeBg = function(status){
                switch(status){
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
                        return null

                }
            }
            $scope.length = $scope.drivertrips.length;
        },
        function (error) {
            var data = error.data;
            $scope.error = data.message;
        }
    );
});


// app.controller("DriversController", function ($scope, $http, $location, config, $localStorage) {
//     $scope.error;
//     $http({
//         method: 'GET',
//         url: config.apiUrl + "/drivers",
//         // pass in data as strings
//         headers: {
//             'Authorization': 'Bearer ' + $localStorage.user.token,
//             'Content-Type': 'application/json'
//         }  // set the headers so angular passing info as form data (not request payload)
//     }).then(function mySuccess(response) {
//         $scope.drivers = response.data.data.drivers
//         $scope.length = $scope.drivers.length;
//         $scope.showDriver = function (driver) {
//             $location.path("drivers/" + driver.id)
//         }
//
//     }, function (error) {
//         var data = error.data;
//         $scope.error = data.message;
//
//     });
// });

// app.controller("DriverController", function (
//     $scope,    $http, $stateParams, config,    $localStorage) {
//     $scope.error;
//     $scope.id = $stateParams.id
//     $http({
//         method: "GET",
//         url: config.apiUrl + "/drivers/" + $scope.id,
//         // pass in data as strings
//         headers: {
//             Authorization: "Bearer " + $localStorage.user.token,
//             "Content-Type": "application/json",
//         } // set the headers so angular passing info as form data (not request payload)
//     }).then(
//         function mySuccess(response) {
//             console.log(response);
//             $scope.driver = response.data.data.driver
//         },
//         function (error) {
//             var data = error.data;
//             $scope.error = data.message;
//         });
// });


app.controller("OnlineDriversController", function (
    $scope,
    $http,
    config,
    $localStorage
) {
    $scope.error;
    $http({
        method: "GET",
        url: config.newApiUrl + "drivers/online/",
        // pass in data as strings
        headers: {
            Authorization: "Bearer " + $localStorage.user.token,
            "Content-Type": "application/json",
        }, // set the headers so angular passing info as form data (not request payload)
    }).then(
        function mySuccess(response) {
            $scope.onlineDrivers = response.data.data;
        },
        function (error) {
            var data = error.data;
            $scope.error = data.message;
        }
    );
});


app.controller("DriverController", function (
    $scope,
    $http,
    $stateParams,
    $location,
    config,
    $localStorage
) {
    $scope.error;
    $scope.driver = {};
    $scope.id = $stateParams.id;
    $http({
        method: "GET",
        url: config.apiUrl + "/drivers/" + $scope.id,
        // pass in data as strings
        headers: {
            Authorization: "Bearer " + $localStorage.user.token,
            "Content-Type": "application/json",
        }, // set the headers so angular passing info as form data (not request payload)
    }).then(
        function mySuccess(response) {
            console.log(response);
            $scope.driver = response.data.data.driver;
        },
        function (error) {
            var data = error.data;
            $scope.error = data.message;
        });

    $scope.approve = function () {
        $http({
            method: "GET",
            url: config.apiUrl + "/drivers/" + $scope.id + "/approve",
            // pass in data as strings
            headers: {
                Authorization: "Bearer " + $localStorage.user.token,
                "Content-Type": "application/json",
            }, // set the headers so angular passing info as form data (not request payload)
        }).then(
            function mySuccess(response) {
                console.log(response);
                $scope.driver.isApproved = true;
            },
            function (error) {
                var data = error.data;
                $scope.error = data.message;
            });
    }

    $scope.delete = function () {
        var val = confirm("Are you sure you want to Delete this Driver?");
        if(val){
            $http.delete(config.newApiUrl + "users/drivers/" + $scope.id,{
                headers: {
                    Authorization: "Bearer " + $localStorage.user.token,
                    "Content-Type": "application/json",
                },
            }).then( function mySuccess(response) {
                    console.log(response);
                    $location.path("drivers/")
                },
                function (error) {
                    var data = error.data;
                    $scope.error = data.message;
                });
        }
    }
});
