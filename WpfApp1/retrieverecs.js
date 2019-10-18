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


                var dataPass = {"ni_check": "Pass"};
                var dataFail = {"ni_check": "Failed"};

                alert("Searching Cities");

                for (var accountRecordsCount = 0; accountRecordsCount < 50/*result.entities.length*/; accountRecordsCount++) {

                    var id = result.entities[accountRecordsCount].accountid;
                    var cityTemp = result.entities[accountRecordsCount].ni_citytemp;
                    var cityPerm = result.entities[accountRecordsCount]._ni_city_value;


                    //alert("Entering the Loop!");


                    var checkCity = cityResult.includes(cityTemp);
                    
                    //alert("Finding City!");

                    if (cityTemp != null && checkCity != false) {
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




// setting lookup field values
// function setCallFrom() 
// {
//  var lookup = new Array();
//  lookup = Xrm.Page.getAttribute("regardingobjectid").getValue();
//  if (lookup != null) {
//  var name = lookup[0].name;
//  var id = lookup[0].id;
//  var entityType = lookup[0].entityType;
//  if (entityType == "contact") {

// var value = new Array();
//  value[0] = new Object();
//  value[0].id = id;
//  value[0].name = name;
//  value[0].entityType = "contact";

// Xrm.Page.getAttribute("from").setValue(value);
//  }

// }
// }




            // Retrieve records from the accounts and convert to csv

            // Xrm.WebApi.retrieveMultipleRecords("account","?$select=accountid,ni_city,ni_citytemp,ni_check").then(
            //     function success(result) { 
            //         //Assign result to variable cityRecordsResult and convert to an array using .entities;
            //         cityRecordsResult = result.entities;
            //         alert("Update Accounts Retrieval Succeed!");
            //     },
            //     function(error) {
            //         alert("Update Account Retrieval Failed");
            //     }
            //     );

            // alert("Converting to CSV");
            
            // let objArray = cityRecordsResult;

            // function DownloadJSON2CSV(objArray)  {

            //     var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

            //     var str = '';

            //     for (var i = 0; i < array.length; i++) {
            //         var line = '';

            //         for (var index in array[i]) {
            //             line += array[i][index] + ',';
            //         }
            //         // Here is an example where you would wrap the values in double quotes
            //         // for (var index in array[i]) {
            //         //    line += '"' + array[i][index] + '",';
            //         // }

            //         line.slice(0,line.Length-1); 
            //         str += line + '\r\n';
            //     }
            //     window.open("data:text/csv;charset=utf-8," + escape(str));
            // }

            // DownloadJSON2CSV(objArray);
            

            


            




     
        