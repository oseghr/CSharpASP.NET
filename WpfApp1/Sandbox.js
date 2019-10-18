function retrieveAccountDetails() {
    alert('Success 0');
    Xrm.WebApi.retrieveMultipleRecords("account", "?$select=accountid,ni_citytemp,ni_check").then(
        function success(result) {
            alert("Loading account records...");
            if (result != null) {
                var dataPass = { "ni_check": "Pass 2" };
                var dataFail = { "ni_check": "Fail 2" };
                alert("Entering Loop...");
                for (var accountRecordsCount =0; accountRecordsCount < 10; accountRecordsCount++) {
                    var id = result.entities[accountRecordsCount].accountid;
                    var cityTemp = result.entities[accountRecordsCount].ni_citytemp;
                    var citytemp = " \'"+ cityTemp + "\'";
                    alert(id+ " | " + cityTemp);
                    if (cityTemp != null) {
                        Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid&$filter=geo_name eq " + citytemp).then(
                            function success(result) {
                                if (result != null) {//   alert(result.entities[0].geo_cityid + result.entities[0].geo_name);
                                    var cityIde = result.entities[0].geo_cityid;
                                    console.log("Retrieving Cities" + " | " + cityIde);
                                    alert("Retrieving Cities" + " | " + cityIde);
                                    var dataPasses = {"ni_City@odata.bind":"/geo_cities("+cityIde+")","ni_check":"Over Pass 2"}; 
                                   // console.log('Success 3: assigning dataPasses' + " | " + dataPasses);                               
                                    //alert('Success 3: assigning dataPasses' + " | " + dataPasses);
                                    var ide = result.entities[accountRecordsCount].accountid;
                                    Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                                        function success(result) {
                                            alert("Account retrieve update success!");
                                        },
                                        function(error) {alert(error.message);}
                                    );
                                } else {
                                    Xrm.WebApi.updateRecord("account", id, dataFail).then(
                                        function success(result) {alert("Account retrieve update fail"); 
                                        },
                                        function(error) {alert(error.message);}
                                        );
                                    }
                                    
                            },
                            function(error) {
                                Xrm.WebApi.updateRecord("account", id, dataFail).then(
                                    function success(result) {alert("City retrieve check fail");
                                        },
                                        function(error) {alert(error.message);}
                                ); 
                            }
                        );
                    } else {
                        Xrm.WebApi.updateRecord("account", id, dataPass).then(
                            function success(result) {alert("Null Account updated");
                            },
                            function(error) {alert(error.message);    // handle error conditions
                            }
                        );
                    }
                }
            }   
        },
        function(error) {alert(error.message); // handle error conditions
        }
    );
}