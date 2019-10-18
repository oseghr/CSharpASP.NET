function retrieveAccountDetails() {

 

    alert('Success 0');

 

    Xrm.WebApi.retrieveMultipleRecords("account", "?$select=accountid,ni_citytemp,ni_check").then(

 

        function success(result) {

 

            if (result != null) {

 

                var dataPass = { "ni_check": "Succeed" };

 

                var dataFail = { "ni_check": "Failed" };

    

                alert("Entering Loop...");

 

                for (var accountRecordsCount =0; accountRecordsCount < 10; accountRecordsCount++) {

 

                    var id = result.entities[accountRecordsCount].accountid;

 

                    var cityTemp = result.entities[accountRecordsCount].ni_citytemp;

                    alert(id+cityTemp);  

                    if (cityTemp != null) {

                        Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid&$filter=geo_name eq '+cityTemp+'").then(

                            function success(result) {

                                if (result != null) {
                                 //   alert(result.entities[0].geo_cityid + result.entities[0].geo_name);
try {
                                    var cityIde = result.geo_cityid;
                                }
catch(error) {
alert(error);
}

                                   alert("suc");


                                    var dataPasses = {"ni_City@odata.bind":"/geo_city('+cityIde+')","ni_check":"Succeed"};
                                    
                                    alert('success3');
                                    Xrm.WebApi.updateRecord("account", id, dataPasses).then(

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

 

                                            alert("Account updated fail");

 

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