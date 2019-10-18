function retrieveAccountDetails() {

    alert('Success 0');
 
    Xrm.WebApi.retrieveMultipleRecords("account", "?$select=accountid,ni_citytemp,ni_check").then(
 
        function success(result) {
 
            if (result != null) {
 
                var dataPass = { "ni_check": "Succeed" };
 
                var dataFail = { "ni_check": "Failed" };
 
                alert("Entering Loop...");
 
                for (var accountRecordsCount = 0; accountRecordsCount < 50; accountRecordsCount++) {
 
                    var id = result.entities[accountRecordsCount].accountid;
 
                    var cityTemp = result.entities[accountRecordsCount].ni_citytemp;
 
                    if (cityTemp != null) {
                        Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid").then(
                            function success(citiesResult) {

                                if (citiesResult != null) {

                                    cityResult = citiesResult.entities[accountRecordsCount];

                                    var lookup = new Array();
                                    lookup[accountRecordsCount] = new object();
                                    lookup[accountRecordsCount].id = cityResult._ni-city_value;
                                    lookup[accountRecordsCount].name = cityResult["geo_name"];
                                    lookup[accountRecordsCount].entityType = "geo_city";

                                    dataPass["ni_CityTemp"] = lookup;

                                    Xrm.WebApi.updateRecord("account", id, dataPass).then(
                                        function success(result) {
                                            alert("Account update success");
 
                                            // perform operations on record update
 
                                        },
 
                                        function(error) {
 
                                            alert(error.message);
 
                                            // handle error conditions
 
                                        }
 
                                    );
                                } else {
                                    Xrm.WebApi.updateRecord("account", id, dataFail).then(
 
                                        function success(result) {
 
                                            //alert("Account updated fail");
 
                                            // perform operations on record update
 
                                        },
 
                                        function(error) {
 
                                            alert(error.message);
 
                                            // handle error conditions
 
                                        }
 
                                    );
                                }
 
                            },
 
                            function(error) {
                                 Xrm.WebApi.updateRecord("account", id, dataFail).then(
 
                                        function success(result) {
 
                                            alert("Account inputting DataFail");
 
                                            // perform operations on record update
 
                                        },
 
                                        function(error) {
 
                                            alert(error.message);
 
                                            // handle error conditions
 
                                        }
 
                                    );
                                //alert("City Retrieval Failed");
 
                            }
 
                        );
                    } else {
                        Xrm.WebApi.updateRecord("account", id, dataPass).then(
 
                            function success(result) {
 
                               // alert("Account updated");
 
                                // perform operations on record update
 
                            },
 
                            function(error) {
 
                                alert(error.message);
 
                                // handle error conditions
 
                            }
 
                        );
                    }
 
                }
            }
            alert("Loading account records...");
        },
 
        function(error) {
            alert(error.message);
            // handle error conditions
        }
    );
}





//retrieval code
// Xrm.WebApi.retrieveMultipleRecords("account", "?$select=accountid,name,ni_citytemp,_ni_city_value, ni_check").then(
//     function success(result) {
//         for (var i = 0; i < 10; i++) {
//             alert(result.entities[i].name + " | " + result.entities[i]._ni_city_value  + " | " + result.entities[i].ni_citytemp);
//             //break; // We will grab the first one
//         }
//     },
//         function(error) {  
//             alert("Error: " + error.message);  
//         }  
//     );