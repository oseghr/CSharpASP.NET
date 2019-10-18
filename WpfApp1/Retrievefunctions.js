function retrieveAccountDetails() {
    alert('Success 0');
    Xrm.WebApi.retrieveMultipleRecords("account", "?$select=accountid,name,ni_citytemp,ni_check").then(
        function success(result) {
            alert("Loading account records...");
            if (result != null) {
                var dataPass = { "ni_check": "Pass" };
                var dataFail = { "ni_check": "Fail" };
                alert("Entering Loop...");
                for (var accountRecordsCount =0; accountRecordsCount < 50; accountRecordsCount++) {
                    var id = result.entities[accountRecordsCount].accountid;
                    var name = result.entities[accountRecordsCount].name;
                    var cityTemp = result.entities[accountRecordsCount].ni_citytemp;
                    var citytemp = " \'"+ cityTemp + "\'";
                    //alert(id+ " | " + cityTemp);
                    if (cityTemp != null) {
                        retrieveUpdate(citytemp,id,name,dataFail);
                    } else {
                        Xrm.WebApi.updateRecord("account", id, dataPass).then(
                            function success(result) {//alert("Null Account updated");
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
function retrieveUpdate(citytemp,id,name,dataFail) {
    var citytempA = citytemp;
    var ide = id;
    var nameA = name;
    var dataFailA = dataFail;
    Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid&$filter=geo_name eq " + citytempA).then(
        function success(result) {
            if (result.entities[0]) {//   alert(result.entities[0].geo_cityid + result.entities[0].geo_name);
                var cityIde = result.entities[0].geo_cityid;
                console.log("Retrieving Cities" + " | " + cityIde);
                alert("Retrieving Cities" + " | " + cityIde+" | " + nameA);
                var dataPasses = {"ni_City@odata.bind":"/geo_cities("+cityIde+")","ni_check":"Pass"}; 
               // console.log('Success 3: assigning dataPasses' + " | " + dataPasses);
                //alert('Success 3: assigning dataPasses' + " | " + dataPasses);
               // var ide = result.entities[accountRecordsCount].accountid;
                Xrm.WebApi.updateRecord("account", ide, dataPasses).then(
                    function success(result) {
                        alert("Account retrieve update success!");
                    },
                    function(error) {alert(error.message);}
                );
            } else {
                Xrm.WebApi.updateRecord("account", id, dataFailA).then(
                    function success(result) {alert("Account retrieve update fail"); 
                    },
                    function(error) {alert(error.message);}
                    );
                }
                
        },
        function(error) {
            Xrm.WebApi.updateRecord("account", id, dataFailA).then(
                function success(result) {alert("City retrieve check fail");
                    },
                    function(error) {alert(error.message);}
            ); 
        }
    );
}