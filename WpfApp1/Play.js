function retrieveAccountDetails() {
    alert('Success 0');
    Xrm.WebApi.retrieveMultipleRecords("account", "?$select=accountid,name,ni_citytemp,ni_check").then(
        function success(result) {
            alert("Loading account records...");
            if (result != null) {
                var dataPass = { "ni_check": "Pass 2" };
                var dataFail = { "ni_check": "Fail" };
                alert("Entering Loop...");
                for (var accountRecordsCount = 0; accountRecordsCount < 10; accountRecordsCount++) {
                    var id = result.entities[accountRecordsCount].accountid;
                    var accName = result.entities[accountRecordsCount].name;
                    var cityTemp = result.entities[accountRecordsCount].ni_citytemp;
                    alert("Account Selected: " + " | " + accName + " | " + id + " | " + cityTemp);  
                    if (cityTemp != null) {
                        Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid&$filter=geo_name eq '+cityTemp+'").then(
                            function success(result) {
                                alert("Retrieve City: " + " | " + result.entities[0].geo_cityid + " | " +  result.entities[0].geo_name);
                                if (result != null) {
                                    try {var cityIde = result.geo_cityid;}
                                    catch(error) {alert(error);}
                                    alert("success 1");
                                    dataPass["ni_City@odata.bind"] = "/geo_city('+cityIde+')";                                
                                    alert('success 2');
                                    Xrm.WebApi.updateRecord("account", id, dataPass).then(
                                        function success(result) {alert("Account retrieve update success!");},
                                        function(error) {alert(error.message);}
                                        );} 
                                else {
                                    Xrm.WebApi.updateRecord("account", id, dataFail).then(
                                        function success(result) {alert("Account retrieve update fail");},
                                        function(error) {alert(error.message);}
                                    );}
                            },
                            function(error) {
                                Xrm.WebApi.updateRecord("account", id, dataFail).then(
                                    function success(result) {alert("account retrieve check fail");},
                                    function(error) {alert(error.message);});
                                }
                        );
                    } 
                    else {
                        Xrm.WebApi.updateRecord("account", id, dataPass).then(
                            function success(result) {alert("null account updated");},
                            function(error) {alert(error.message);});
                    }
                }
            } 
        },
        function(error) {alert(error.message);}
    );
}


