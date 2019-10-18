function retrieveAccountDetails() {

 

    alert('Success 0');

 

    Xrm.WebApi.retrieveMultipleRecords("account", "?$select=accountid,name,ni_citytemp,ni_check").then(

 

        function success(result) {

 

            if (result != null) {

 

                var dataPass = { "ni_check": "Succeed" };

 

                var dataFail = { "ni_check": "Failed" };

    

                alert("Entering Loop...");

 

                for (var accountRecordsCount =0; accountRecordsCount < 10; accountRecordsCount++) {

 

                    var id = result.entities[accountRecordsCount].accountid;

                    var name = result.entities[accountRecordsCount].name;

                    var cityTemp = result.entities[accountRecordsCount].ni_citytemp;
                    var citytemp = "\'" + cityTemp + "\'";

                    //alert(id+cityTemp);  

                    if (cityTemp != null) {

                        Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid&$filter=geo_name eq " + citytemp).then(

                            function success(citiesResult) {

                                if (citiesResult != null) {
                                    alert("success2");
                                    var cityIde = citiesResult.entities[0].geo_cityid;
                                

                                   alert("suc" + name);


                                    //var dataPasses = {"ni_City@odata.bind":"/geo_cities('+cityIde+')","ni_check":"Succeed"};
                                    
                                    alert('success3');
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