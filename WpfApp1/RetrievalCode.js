//retrieve data based on primary entity id
function retrieveAccountDetails() {
    //read lookup value
    if (Xrm.Page.getAttribute("parentcustomerid").getValue() != null && Xrm.Page.getAttribute("parentcustomerid").getValue()[0].id != null) {
      var accountid = Xrm.Page.getAttribute("parentcustomerid").getValue()[0].id;
   
      //pass entity, fields, we can use expand to get related entity fields
      Xrm.WebApi.retrieveRecord("account", accountid, "?$select=telephone1,new_verificationrequired,new_activationdate,address1_shippingmethodcode&$expand=parentaccountid($select=accountid,name)").then(
        function success(result) {
          if (result != null) {
            //set text field
            if (result.telephone1 != null)
              Xrm.Page.getAttribute("telephone1").setValue(result.telephone1);
            //set lookup field
            if (result.parentaccountid != null) {
              var object = new Array();
              object[0] = new Object();
              object[0].id = result.parentaccountid.id;
              object[0].name = result.parentaccountid.name;
              object[0].entityType = "account";
              Xrm.Page.getAttribute("new_parentaccount").setValue(object);
            }
            //set two optionset
            if (result.new_verificationrequired != null)
              Xrm.Page.getAttribute("new_verificationrequired").setValue(result.new_verificationrequired);
            //set date field
            if (result.new_activationdate != null)
              Xrm.Page.getAttribute("new_activationdate").setValue(new Date(result["new_activationdate@OData.Community.Display.V1.FormattedValue"]));
            //set optionset field
            if (result.address1_shippingmethodcode != null)
              Xrm.Page.getAttribute("address1_shippingmethodcode").setValue(result.address1_shippingmethodcode);
          }
        },
        function(error) {
          alert(error.message);
   
        }
      );
    }
  }



  




  retrieveMultipleRecords = function (type, options, successCallback, errorCallback, onComplete, async)


  var accountArray = new Array();
 
   XrmServiceToolkit.Rest.RetrieveMultiple(
                "AccountSet",
                "",// if you leave it empty, it retrieves all fields
                function (results) {
                    if (results.length >= 1)
                        for (var i = 0; i < results.length; i++) {
                            accountArray.push(results[i]);
                        }
                },
                function (error) {
                    alert(error.message);
                },
                function onComplete() {
                    //alert(" records should have been retrieved.");
                },
                false
            );
 
alert(accountArray.length); //this should show the number of account records in CRM
















var req = new XMLHttpRequest();
req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/contacts()?$expand=account_primary_contact($select=accountid,address1_city,address1_country)", true);
req.setRequestHeader("OData-MaxVersion", "4.0");
req.setRequestHeader("OData-Version", "4.0");
req.setRequestHeader("Accept", "application/json");
req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
req.onreadystatechange = function() {
    if (this.readyState === 4) {
        req.onreadystatechange = null;
        if (this.status === 200) {
            var result = JSON.parse(this.response);
            var contactid = result["contactid"];
            for (var a = 0; a < result.account_primary_contact.length; a++) {
                var account_primary_contact_accountid = result.account_primary_contact[a]["accountid"];
                var account_primary_contact_address1_city = result.account_primary_contact[a]["address1_city"];
                var account_primary_contact_address1_country = result.account_primary_contact[a]["address1_country"];
            }
        } else {
            Xrm.Utility.alertDialog(this.statusText);
        }
    }   
};
req.send();







var retrieveMultipleRecords = function (type, options, successCallback, errorCallback, onComplete, async) {
    ///<summary>
    /// Sends synchronous/asynchronous request to retrieve records.
    ///</summary>
    ///<param name="type" type="String">
    /// The Schema Name of the Entity type record to retrieve.
    /// For an Account record, use "Account"
    ///</param>
    stringParameterCheck(type, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the type parameter is a string.");
    ///<param name="options" type="String">
    /// A String representing the OData System Query Options to control the data returned
    ///</param>
    if (options != null)
        stringParameterCheck(options, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the options parameter is a string.");
    ///<param name="successCallback" type="Function">
    /// The function that will be passed through and be called for each page of records returned.
    /// Each page is 50 records. If you expect that more than one page of records will be returned,
    /// this function should loop through the results and push the records into an array outside of the function.
    /// Use the OnComplete event handler to know when all the records have been processed.
    /// </param>
    callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the successCallback parameter is a function.");
    ///<param name="errorCallback" type="Function">
    /// The function that will be passed through and be called by a failed response.
    /// This function must accept an Error object as a parameter.
    /// </param>
    callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the errorCallback parameter is a function.");
    ///<param name="OnComplete" type="Function">
    /// The function that will be called when all the requested records have been returned.
    /// No parameters are passed to this function.
    /// </param>
    callbackParameterCheck(onComplete, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the OnComplete parameter is a function.");
    ///<param name="async" type="Boolean">
    /// A Boolean representing if the method should run asynchronously or synchronously
    /// true means asynchronously. false means synchronously
    /// </param>
    booleanParameterCheck(async, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the async parameter is a boolean.");












var gridControl = document.getElementById('subgrid_id').control;

var ids = gridControl.get_allRecordIds();
for (i = 0; i < ids.length; i++) {
    var cellValue = gridControl.getCellValue('column_name', ids[i]);
    // DO WHATEVER YOU WANT WITH THE CELL VALUE HERE!..
}













function QueryCRM() {

    var Id = Xrm.Page.data.entity.getId();
    var url = Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/LeadSet(guid'" + Id + "')";
   
    var req = new XMLHttpRequest();
   
    req.open("GET", url, false);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.send();
   
   
    if (req.readyState == 4 /* complete */) {
    //Success 
    if (req.status == 200) {
    alert(req.responseText);
    }
    //Failure
    else {
    alert("Error: " + req.responseText);
    }
    }
   
   }








   function retrieveAccountDetails() {
      Xrm.WebApi.retrieveMultipleRecords("account","?$select=accountid,check,").then(
        function success(result) {
          if (result != null) {
            //set text field
            //result.entities.length
            var data = {"check": "Yes"}
            var jsonData = JSON.stringify(data);
            for (var accountRecordsCount = 0; accountRecordsCount < 10; accountRecordsCount++) {
                var id = result.entities[accountRecordsCount].accountid;
                Xrm.WebApi.updateRecord("account",id,jsonData);
                console.log("Success");
            }
        }
    },
        function(error) {
          alert(error.message);
        }
      );
    }

        //Retrieves the records for the Province Entity

        Xrm.WebApi.retrieveMultipleRecords("geo_province","?$select=geo_name").then(
          function success(result) { 
              //Assign result to variable provinceResult and convert to an array using .entities;
              provinceResult = result.entities;
              alert("City Retrieval Succeed");
          },
          function(error) {
              alert("City Retrieval Failed");
          }
          );

      //Retrieves the records for the Country Entity

      Xrm.WebApi.retrieveMultipleRecords("geo_country","?$select=geo_name").then(
          function success(result) { 
              //Assign result to variable pcountryResult and convert to an array using .entities;
              countryResult = result.entities;
              alert("City Retrieval Succeed");
          },
          function(error) {
              alert("City Retrieval Failed");
          }
          );





    // function to convert array to csv
    function DownloadJSON2CSV(objArray)
    {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';

            for (var index in array[i]) {
                line += array[i][index] + ',';
            }
            // Here is an example where you would wrap the values in double quotes
            // for (var index in array[i]) {
            //    line += '"' + array[i][index] + '",';
            // }

            line.slice(0,line.Length-1); 
            str += line + '\r\n';
        }
        window.open( "data:text/csv;charset=utf-8," + escape(str));
    }
 
 let objArray = [{name: "Tomi", age: 29},{name: "John", age: 22},{name: "Ose", age: 35}];
 DownloadJSON2CSV(objArray);