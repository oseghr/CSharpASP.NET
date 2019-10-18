function retrieveAccountDetails() {

 

    alert('Success 0');

 

    Xrm.WebApi.retrieveMultipleRecords("account", "?$select=accountid,ni_citytemp,ni_check").then(

 

        function success(result) {

             alert("Loading account records...");

            if (result != null) {

 

                var dataPass = { "ni_check": "Pass 1" };

 

                var dataFail = { "ni_check": "Fail 1" };

    

                alert("Entering Loop...");

 

                for (var accountRecordsCount =0; accountRecordsCount < 10; accountRecordsCount++) {

 

                    var id = result.entities[accountRecordsCount].accountid;

 

                    var cityTemp = result.entities[accountRecordsCount].ni_citytemp;
var citytemp = "\'" + cityTemp + "\'";

                    //alert(id+" | " +cityTemp);  

                    if (cityTemp != null) {

                        Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid&$filter=geo_name eq  "+citytemp).then(

                            function success(result) {

                                if (result != null) {
                                 //   alert(result.entities[0].geo_cityid + result.entities[0].geo_name);
                                    var cityIde = result.entities[0].geo_cityid;

                                   alert("city retrieve success" + cityIde);

                                    var dataPasses = new Object();
                                    dataPasses["ni_City@odata.bind"] ="/geo_cities("+cityIde+")";
                                    dataPasses["ni_check"] = "Pass2";
                                    
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


        },

 

        function(error) {

            alert(error.message);

            // handle error conditions

        }

    );

}