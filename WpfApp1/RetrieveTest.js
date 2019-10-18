function retrieveAccountDetails() {

    //Retrieves the records for the Cities Entity

    Xrm.WebApi.retrieveMultipleRecords("geo_city","?$select=geo_name").then(
        function success(result) { 
            //Assign result to variable cityResult and convert to an array using .entities;
            cityResult = result.entities;
            alert("City Retrieval Succeed");
        },
        function(error) {
            alert("City Retrieval Failed");
        }
        );


alert('Success 0');


//Retrieves the records for the Account Entity

Xrm.WebApi.retrieveMultipleRecords("account","?$select=accountid,ni_citytemp,ni_check").then(
    function success(result) {
      if (result != null) {
        alert("Success 1");
        //set text field
        //result.entities.length
        var dataPass = {"ni_check": "Success"};
        var dataFail = {"ni_check": "Failed"};

        //alert("Success 2");
        for (var accountRecordsCount = 0; accountRecordsCount < 50; accountRecordsCount++) {

            var id = result.entities[accountRecordsCount].accountid;
            var cityTemp = result.entities[accountRecordsCount].ni_citytemp;
            //alert("Success 1");

            var checkCity = cityResult.includes(cityTemp);
            alert("Success 2");

            if (cityTemp == null) {

                Xrm.WebApi.updateRecord("account",id,dataPass).then(
                    function success(result) {
                        alert("Account updated");
                         // perform operations on record update
                        },
                        function (error) {
                        alert(error.message);
                        // handle error conditions
                        }
                        );
            } else if (cityTemp != null && checkCity) {

                Xrm.WebApi.updateRecord("account",id,dataPass).then(
                    function success(result) {
                        alert("Account updated");
                         // perform operations on record update
                        },
                        function (error) {
                        alert(error.message);
                        // handle error conditions
                        }
                        );
            } else {
                Xrm.WebApi.updateRecord("account",id,dataFail).then(
                    function success(result) {
                        console.log("Account not updated");
                         // perform operations on record update
                        },
                        function (error) {
                        alert(error.message);
                        // handle error conditions
                        }
                        );

            }


        }

        
        alert("Its Working!");
    }
},
    function(error) {
      alert(error.message);
    }
  );
}


 //Working Code as at 07.08.2019
 function retrieveAccountDetails() {

    alert('Success 0');

    //Retrieves the records for the Cities Entity
    var cityResult;

    Xrm.WebApi.retrieveMultipleRecords("geo_city","?$select=geo_name").then(
        function success(result) { 
            //Assign result to variable cityResult and convert to an array using .entities;
            cityResult = result.entities;
            alert("City Retrieval Succeed");
        },
        function(error) {
            alert("City Retrieval Failed");
        }
        );



    //Retrieves the records for the Account Entity

    Xrm.WebApi.retrieveMultipleRecords("account","?$select=accountid,ni_citytemp,_ni_city_value,ni_check").then(
        function success(result) {
            if (result != null) {
                alert("Success 1");
                //set text field
                //result.entities.length

                var checkCity = cityResult.find(function(element) {
                    return element == cityTemp;
                   });

                alert("Searching Cities");

                var dataPass = {"ni_check": "Success"};
                var dataFail = {"ni_check": "Failed"};

                //alert("Success 2");
                for (var accountRecordsCount = 0; accountRecordsCount < result.entities.length; accountRecordsCount++) {

                    var id = result.entities[accountRecordsCount].accountid;
                    var cityTemp = result.entities[accountRecordsCount].ni_citytemp;
                    //alert("Success 1");

                    //var checkCity = cityResult.includes(cityTemp);
                    

                    if (cityTemp != null && checkCity) {
                        Xrm.WebApi.updateRecord("account",id,dataPass).then(
                            function success(result) {
                                //alert("Account updated");
                                // perform operations on record update
                                },
                                function (error) {
                                alert(error.message);
                                // handle error conditions
                                }
                                );

                    } else if (cityTemp == null) {
                        Xrm.WebApi.updateRecord("account",id,dataPass).then(
                            function success(result) {
                                // perform operations on record update
                            
                                },
                                function (error) {
                                alert(error.message);
                                // handle error conditions
                                }
                                );
                    } else {
                        Xrm.WebApi.updateRecord("account",id,dataFail).then(
                            function success(result) {
                                console.log("Account not updated");
                                // perform operations on record update
                                },
                                function (error) {
                                alert(error.message);
                                // handle error conditions
                                }
                                );

                    }
                }
                
                alert("Its Working!");
            }
        },
        function(error) {
        alert(error.message);
        }
    );
}
    